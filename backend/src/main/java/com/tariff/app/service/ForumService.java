package com.tariff.app.service;

import com.tariff.app.dto.CreatePostRequest;
import com.tariff.app.dto.ForumCategoryDto;
import com.tariff.app.dto.ForumPostResponse;
import com.tariff.app.dto.SimpleUserDto;
import com.tariff.app.dto.CreateCommentRequest;
import com.tariff.app.dto.ForumCommentResponse;
import com.tariff.app.entity.ForumCategory;
import com.tariff.app.entity.ForumPost;
import com.tariff.app.entity.User;
import com.tariff.app.entity.ForumComment;
import com.tariff.app.entity.ForumVote;
import com.tariff.app.repository.ForumCategoryRepository;
import com.tariff.app.repository.ForumPostRepository;
import com.tariff.app.repository.UserRepository;
import com.tariff.app.repository.ForumCommentRepository;
import com.tariff.app.repository.ForumVoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class ForumService {

	@Autowired
	private ForumPostRepository postRepository;

	@Autowired
	private ForumCategoryRepository categoryRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ForumCommentRepository commentRepository;

	@Autowired
	private ForumVoteRepository voteRepository;

	public List<ForumCategoryDto> getCategories() {
		return categoryRepository.findAllActiveOrdered().stream().map(this::toCategoryDto).collect(Collectors.toList());
	}

	public Page<ForumPostResponse> listPosts(Pageable pageable, UUID currentUserId) {
		return postRepository.findAllActiveOrdered(pageable).map(p -> toPostResponse(p));
	}

	public Page<ForumPostResponse> listPostsByCategory(UUID categoryId, Pageable pageable, UUID currentUserId) {
		return postRepository.findByCategoryIdOrdered(categoryId, pageable).map(this::toPostResponse);
	}

	public Page<ForumPostResponse> searchPosts(String query, Pageable pageable, UUID currentUserId) {
		return postRepository.searchPosts(query, pageable).map(this::toPostResponse);
	}

	public ForumPostResponse getPost(UUID id, UUID currentUserId) {
		ForumPost post = postRepository.findByIdAndIsDeletedFalse(id).orElseThrow(() -> new RuntimeException("Post not found"));
		post.setViewCount(post.getViewCount() + 1);
		postRepository.save(post);
		return toPostResponse(post);
	}

	public ForumPostResponse createPost(CreatePostRequest request, UUID authorId) {
		User author = userRepository.findById(authorId).orElseThrow(() -> new RuntimeException("User not found"));
		ForumCategory category = categoryRepository.findById(request.getCategoryId()).orElseThrow(() -> new RuntimeException("Category not found"));

		ForumPost post = new ForumPost();
		post.setTitle(request.getTitle());
		post.setContent(request.getContent());
		post.setExcerpt(generateExcerpt(request.getContent()));
		post.setAuthor(author);
		post.setCategory(category);
		post.setCreatedAt(OffsetDateTime.now());
		post.setUpdatedAt(OffsetDateTime.now());
		post.setLastActivityAt(OffsetDateTime.now());

		ForumPost saved = postRepository.save(post);
		return toPostResponse(saved);
	}

	public ForumCommentResponse addComment(UUID postId, CreateCommentRequest request, UUID authorId) {
		ForumPost post = postRepository.findByIdAndIsDeletedFalse(postId).orElseThrow(() -> new RuntimeException("Post not found"));
		User author = userRepository.findById(authorId).orElseThrow(() -> new RuntimeException("User not found"));

		ForumComment comment = new ForumComment();
		comment.setPost(post);
		comment.setAuthor(author);
		comment.setContent(request.getContent());
		if (request.getParentCommentId() != null) {
			ForumComment parent = commentRepository.findById(request.getParentCommentId()).orElseThrow(() -> new RuntimeException("Parent comment not found"));
			comment.setParentComment(parent);
		}
		ForumComment saved = commentRepository.save(comment);
		post.setCommentCount(post.getCommentCount() + 1);
		post.setLastActivityAt(OffsetDateTime.now());
		postRepository.save(post);

		return toCommentResponse(saved);
	}

	public Page<ForumCommentResponse> listComments(UUID postId, Pageable pageable) {
		ForumPost post = postRepository.findByIdAndIsDeletedFalse(postId).orElseThrow(() -> new RuntimeException("Post not found"));
		return commentRepository.findByPostOrdered(post, pageable).map(this::toCommentResponse);
	}

	public void votePost(UUID postId, UUID userId, boolean up) {
		ForumPost post = postRepository.findByIdAndIsDeletedFalse(postId).orElseThrow(() -> new RuntimeException("Post not found"));
		User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		voteRepository.findByPostAndUser(post, user).ifPresentOrElse(existing -> {
			if (existing.getIsUpvote() == up) return; // no-op
			existing.setIsUpvote(up);
			voteRepository.save(existing);
		}, () -> {
			ForumVote v = new ForumVote();
			v.setPost(post);
			v.setUser(user);
			v.setIsUpvote(up);
			voteRepository.save(v);
		});
		int count = (int) voteRepository.countByPostAndIsUpvoteTrue(post);
		post.setVoteCount(count);
		post.setLastActivityAt(OffsetDateTime.now());
		postRepository.save(post);
	}

	public void unvotePost(UUID postId, UUID userId) {
		ForumPost post = postRepository.findByIdAndIsDeletedFalse(postId).orElseThrow(() -> new RuntimeException("Post not found"));
		User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		voteRepository.findByPostAndUser(post, user).ifPresent(v -> {
			voteRepository.delete(v);
			int count = (int) voteRepository.countByPostAndIsUpvoteTrue(post);
			post.setVoteCount(count);
			postRepository.save(post);
		});
	}

	public void voteComment(UUID commentId, UUID userId, boolean up) {
		ForumComment comment = commentRepository.findById(commentId).orElseThrow(() -> new RuntimeException("Comment not found"));
		User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		voteRepository.findByCommentAndUser(comment, user).ifPresentOrElse(existing -> {
			if (existing.getIsUpvote() == up) return;
			existing.setIsUpvote(up);
			voteRepository.save(existing);
		}, () -> {
			ForumVote v = new ForumVote();
			v.setComment(comment);
			v.setUser(user);
			v.setIsUpvote(up);
			voteRepository.save(v);
		});
		int count = (int) voteRepository.countByCommentAndIsUpvoteTrue(comment);
		comment.setVoteCount(count);
		commentRepository.save(comment);
	}

	public void unvoteComment(UUID commentId, UUID userId) {
		ForumComment comment = commentRepository.findById(commentId).orElseThrow(() -> new RuntimeException("Comment not found"));
		User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		voteRepository.findByCommentAndUser(comment, user).ifPresent(v -> {
			voteRepository.delete(v);
			int count = (int) voteRepository.countByCommentAndIsUpvoteTrue(comment);
			comment.setVoteCount(count);
			commentRepository.save(comment);
		});
	}

	private ForumCommentResponse toCommentResponse(ForumComment c) {
		ForumCommentResponse dto = new ForumCommentResponse();
		dto.setId(c.getId());
		dto.setContent(c.getContent());
		SimpleUserDto author = new SimpleUserDto();
		author.setId(c.getAuthor().getId());
		author.setUsername(c.getAuthor().getUsername());
		dto.setAuthor(author);
		dto.setParentCommentId(c.getParentComment() != null ? c.getParentComment().getId() : null);
		dto.setCreatedAt(c.getCreatedAt());
		dto.setUpdatedAt(c.getUpdatedAt());
		dto.setVoteCount(c.getVoteCount());
		return dto;
	}

	private String generateExcerpt(String content) {
		if (content == null) return "";
		return content.length() <= 200 ? content : content.substring(0, 200) + "...";
	}

	private ForumCategoryDto toCategoryDto(ForumCategory c) {
		ForumCategoryDto dto = new ForumCategoryDto();
		dto.setId(c.getId());
		dto.setName(c.getName());
		dto.setDescription(c.getDescription());
		dto.setColor(c.getColor());
		dto.setIcon(c.getIcon());
		return dto;
	}

	private ForumPostResponse toPostResponse(ForumPost p) {
		ForumPostResponse dto = new ForumPostResponse();
		dto.setId(p.getId());
		dto.setTitle(p.getTitle());
		dto.setContent(p.getContent());
		dto.setExcerpt(p.getExcerpt());
		dto.setCreatedAt(p.getCreatedAt());
		dto.setUpdatedAt(p.getUpdatedAt());
		dto.setLastActivityAt(p.getLastActivityAt());
		dto.setViewCount(p.getViewCount());
		dto.setCommentCount(p.getCommentCount());
		dto.setVoteCount(p.getVoteCount());
		dto.setIsPinned(p.getIsPinned());
		dto.setIsLocked(p.getIsLocked());

		SimpleUserDto author = new SimpleUserDto();
		author.setId(p.getAuthor().getId());
		author.setUsername(p.getAuthor().getUsername());
		dto.setAuthor(author);

		dto.setCategory(toCategoryDto(p.getCategory()));
		return dto;
	}
}


