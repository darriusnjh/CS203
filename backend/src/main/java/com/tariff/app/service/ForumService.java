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
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.ArrayList;
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
		// Return hardcoded categories for now
		List<ForumCategoryDto> categories = new ArrayList<>();
		
		ForumCategoryDto cat1 = new ForumCategoryDto();
		cat1.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440001"));
		cat1.setName("General Discussion");
		cat1.setDescription("General questions and discussions about tariffs and trade");
		cat1.setColor("#3B82F6");
		cat1.setIcon("message-circle");
		categories.add(cat1);
		
		ForumCategoryDto cat2 = new ForumCategoryDto();
		cat2.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440002"));
		cat2.setName("Tariff Calculations");
		cat2.setDescription("Help with tariff calculations and HTS codes");
		cat2.setColor("#10B981");
		cat2.setIcon("calculator");
		categories.add(cat2);
		
		ForumCategoryDto cat3 = new ForumCategoryDto();
		cat3.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440003"));
		cat3.setName("Policy Updates");
		cat3.setDescription("Discussion about new trade policies and regulations");
		cat3.setColor("#F59E0B");
		cat3.setIcon("file-text");
		categories.add(cat3);
		
		ForumCategoryDto cat4 = new ForumCategoryDto();
		cat4.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440004"));
		cat4.setName("Industry Specific");
		cat4.setDescription("Industry-specific tariff discussions");
		cat4.setColor("#8B5CF6");
		cat4.setIcon("briefcase");
		categories.add(cat4);
		
		return categories;
	}

	public Page<ForumPostResponse> listPosts(Pageable pageable, UUID currentUserId) {
		// Return hardcoded posts for now
		List<ForumPostResponse> posts = new ArrayList<>();
		
		ForumPostResponse post1 = new ForumPostResponse();
		post1.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440020"));
		post1.setTitle("How to calculate tariffs for electronics from China?");
		post1.setContent("I'm importing electronic components from China and need help understanding the tariff calculation process. What are the key factors I should consider when calculating tariffs for electronics?");
		post1.setExcerpt("I'm importing electronic components from China and need help understanding the tariff calculation process. What are the key factors I should consider when calculating tariffs for electronics?");
		post1.setViewCount(45);
		post1.setCommentCount(8);
		post1.setVoteCount(12);
		post1.setIsPinned(false);
		post1.setIsLocked(false);
		post1.setCreatedAt(OffsetDateTime.now().minusHours(2));
		post1.setUpdatedAt(OffsetDateTime.now().minusHours(2));
		post1.setLastActivityAt(OffsetDateTime.now().minusHours(1));
		
		SimpleUserDto author1 = new SimpleUserDto();
		author1.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440010"));
		author1.setUsername("demo_user");
		post1.setAuthor(author1);
		
		ForumCategoryDto category1 = new ForumCategoryDto();
		category1.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440002"));
		category1.setName("Tariff Calculations");
		category1.setDescription("Help with tariff calculations and HTS codes");
		category1.setColor("#10B981");
		category1.setIcon("calculator");
		post1.setCategory(category1);
		
		posts.add(post1);
		
		// Add more posts for better forum population
		ForumPostResponse post2 = new ForumPostResponse();
		post2.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440021"));
		post2.setTitle("Welcome to the General Discussion Forum!");
		post2.setContent("This is a place for general discussions about tariffs, trade, and international business. Feel free to share your experiences and ask questions.");
		post2.setExcerpt("This is a place for general discussions about tariffs, trade, and international business. Feel free to share your experiences and ask questions.");
		post2.setViewCount(23);
		post2.setCommentCount(5);
		post2.setVoteCount(7);
		post2.setIsPinned(true);
		post2.setIsLocked(false);
		post2.setCreatedAt(OffsetDateTime.now().minusDays(1));
		post2.setUpdatedAt(OffsetDateTime.now().minusDays(1));
		post2.setLastActivityAt(OffsetDateTime.now().minusHours(3));
		
		SimpleUserDto author2 = new SimpleUserDto();
		author2.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440011"));
		author2.setUsername("admin");
		post2.setAuthor(author2);
		
		ForumCategoryDto category2 = new ForumCategoryDto();
		category2.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440001"));
		category2.setName("General Discussion");
		category2.setDescription("General questions and discussions about tariffs and trade");
		category2.setColor("#3B82F6");
		category2.setIcon("message-circle");
		post2.setCategory(category2);
		
		posts.add(post2);
		
		// Add a Policy Updates post
		ForumPostResponse post3 = new ForumPostResponse();
		post3.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440022"));
		post3.setTitle("New Trade Agreement Updates for 2025");
		post3.setContent("The latest trade agreements have been updated for 2025. Here are the key changes that will affect import/export businesses. Make sure to review the new tariff schedules and compliance requirements.");
		post3.setExcerpt("The latest trade agreements have been updated for 2025. Here are the key changes that will affect import/export businesses.");
		post3.setViewCount(67);
		post3.setCommentCount(12);
		post3.setVoteCount(18);
		post3.setIsPinned(false);
		post3.setIsLocked(false);
		post3.setCreatedAt(OffsetDateTime.now().minusHours(6));
		post3.setUpdatedAt(OffsetDateTime.now().minusHours(6));
		post3.setLastActivityAt(OffsetDateTime.now().minusHours(2));
		
		SimpleUserDto author3 = new SimpleUserDto();
		author3.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440012"));
		author3.setUsername("trade_expert");
		post3.setAuthor(author3);
		
		ForumCategoryDto category3 = new ForumCategoryDto();
		category3.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440003"));
		category3.setName("Policy Updates");
		category3.setDescription("Discussion about new trade policies and regulations");
		category3.setColor("#F59E0B");
		category3.setIcon("file-text");
		post3.setCategory(category3);
		
		posts.add(post3);
		
		// Return a simple Page implementation
		return new PageImpl<>(posts, pageable, posts.size());
	}

	public Page<ForumPostResponse> listPostsByCategory(UUID categoryId, Pageable pageable, UUID currentUserId) {
		// Return hardcoded posts for now - same as listPosts but filtered by category
		List<ForumPostResponse> posts = new ArrayList<>();
		
		ForumPostResponse post1 = new ForumPostResponse();
		post1.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440020"));
		post1.setTitle("How to calculate tariffs for electronics from China?");
		post1.setContent("I'm importing electronic components from China and need help understanding the tariff calculation process. What are the key factors I should consider when calculating tariffs for electronics?");
		post1.setExcerpt("I'm importing electronic components from China and need help understanding the tariff calculation process. What are the key factors I should consider when calculating tariffs for electronics?");
		post1.setViewCount(45);
		post1.setCommentCount(8);
		post1.setVoteCount(12);
		post1.setIsPinned(false);
		post1.setIsLocked(false);
		post1.setCreatedAt(OffsetDateTime.now().minusHours(2));
		post1.setUpdatedAt(OffsetDateTime.now().minusHours(2));
		post1.setLastActivityAt(OffsetDateTime.now().minusHours(1));
		
		SimpleUserDto author1 = new SimpleUserDto();
		author1.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440010"));
		author1.setUsername("demo_user");
		post1.setAuthor(author1);
		
		ForumCategoryDto category1 = new ForumCategoryDto();
		category1.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440002"));
		category1.setName("Tariff Calculations");
		category1.setDescription("Help with tariff calculations and HTS codes");
		category1.setColor("#10B981");
		category1.setIcon("calculator");
		post1.setCategory(category1);
		
		// Only add posts that match the requested category
		if (categoryId.equals(UUID.fromString("550e8400-e29b-41d4-a716-446655440002"))) {
			posts.add(post1);
		}
		
		// Add more posts for other categories
		if (categoryId.equals(UUID.fromString("550e8400-e29b-41d4-a716-446655440001"))) {
			ForumPostResponse post2 = new ForumPostResponse();
			post2.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440021"));
			post2.setTitle("Welcome to the General Discussion Forum!");
			post2.setContent("This is a place for general discussions about tariffs, trade, and international business. Feel free to share your experiences and ask questions.");
			post2.setExcerpt("This is a place for general discussions about tariffs, trade, and international business. Feel free to share your experiences and ask questions.");
			post2.setViewCount(23);
			post2.setCommentCount(5);
			post2.setVoteCount(7);
			post2.setIsPinned(true);
			post2.setIsLocked(false);
			post2.setCreatedAt(OffsetDateTime.now().minusDays(1));
			post2.setUpdatedAt(OffsetDateTime.now().minusDays(1));
			post2.setLastActivityAt(OffsetDateTime.now().minusHours(3));
			
			SimpleUserDto author2 = new SimpleUserDto();
			author2.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440011"));
			author2.setUsername("admin");
			post2.setAuthor(author2);
			
			ForumCategoryDto category2 = new ForumCategoryDto();
			category2.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440001"));
			category2.setName("General Discussion");
			category2.setDescription("General questions and discussions about tariffs and trade");
			category2.setColor("#3B82F6");
			category2.setIcon("message-circle");
			post2.setCategory(category2);
			
			posts.add(post2);
		}
		
		return new PageImpl<>(posts, pageable, posts.size());
	}

	public Page<ForumPostResponse> searchPosts(String query, Pageable pageable, UUID currentUserId) {
		// Return hardcoded posts for now - same as listPosts
		List<ForumPostResponse> posts = new ArrayList<>();
		
		ForumPostResponse post1 = new ForumPostResponse();
		post1.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440020"));
		post1.setTitle("How to calculate tariffs for electronics from China?");
		post1.setContent("I'm importing electronic components from China and need help understanding the tariff calculation process. What are the key factors I should consider when calculating tariffs for electronics?");
		post1.setExcerpt("I'm importing electronic components from China and need help understanding the tariff calculation process. What are the key factors I should consider when calculating tariffs for electronics?");
		post1.setViewCount(45);
		post1.setCommentCount(8);
		post1.setVoteCount(12);
		post1.setIsPinned(false);
		post1.setIsLocked(false);
		post1.setCreatedAt(OffsetDateTime.now().minusHours(2));
		post1.setUpdatedAt(OffsetDateTime.now().minusHours(2));
		post1.setLastActivityAt(OffsetDateTime.now().minusHours(1));
		
		SimpleUserDto author1 = new SimpleUserDto();
		author1.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440010"));
		author1.setUsername("demo_user");
		post1.setAuthor(author1);
		
		ForumCategoryDto category1 = new ForumCategoryDto();
		category1.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440002"));
		category1.setName("Tariff Calculations");
		category1.setDescription("Help with tariff calculations and HTS codes");
		category1.setColor("#10B981");
		category1.setIcon("calculator");
		post1.setCategory(category1);
		
		posts.add(post1);
		
		return new PageImpl<>(posts, pageable, posts.size());
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
		// Return hardcoded comments for now
		List<ForumCommentResponse> comments = new ArrayList<>();
		
		// Create sample comments for the first post
		if (postId.toString().equals("550e8400-e29b-41d4-a716-446655440020")) {
			ForumCommentResponse comment1 = new ForumCommentResponse();
			comment1.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440030"));
			comment1.setContent("Great question! For electronics from China, you'll need to consider the HS code classification first. Most electronic components fall under Chapter 85.");
			comment1.setCreatedAt(OffsetDateTime.now().minusHours(2));
			comment1.setUpdatedAt(OffsetDateTime.now().minusHours(2));
			
			SimpleUserDto author1 = new SimpleUserDto();
			author1.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440001"));
			author1.setUsername("TradeExpert");
			comment1.setAuthor(author1);
			comments.add(comment1);
			
			ForumCommentResponse comment2 = new ForumCommentResponse();
			comment2.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440031"));
			comment2.setContent("Don't forget to check if your country has any trade agreements with China that might reduce or eliminate tariffs!");
			comment2.setCreatedAt(OffsetDateTime.now().minusHours(1));
			comment2.setUpdatedAt(OffsetDateTime.now().minusHours(1));
			
			SimpleUserDto author2 = new SimpleUserDto();
			author2.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440002"));
			author2.setUsername("ImportGuru");
			comment2.setAuthor(author2);
			comments.add(comment2);
		}
		
		// Create sample comments for the second post
		if (postId.toString().equals("550e8400-e29b-41d4-a716-446655440021")) {
			ForumCommentResponse comment1 = new ForumCommentResponse();
			comment1.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440032"));
			comment1.setContent("Welcome everyone! This is a great place to share experiences and learn from each other.");
			comment1.setCreatedAt(OffsetDateTime.now().minusHours(3));
			comment1.setUpdatedAt(OffsetDateTime.now().minusHours(3));
			
			SimpleUserDto author1 = new SimpleUserDto();
			author1.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440001"));
			author1.setUsername("TradeExpert");
			comment1.setAuthor(author1);
			comments.add(comment1);
		}
		
		// Create sample comments for the third post
		if (postId.toString().equals("550e8400-e29b-41d4-a716-446655440022")) {
			ForumCommentResponse comment1 = new ForumCommentResponse();
			comment1.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440033"));
			comment1.setContent("I've been importing textiles for 5 years. The key is understanding the different categories and their specific rates.");
			comment1.setCreatedAt(OffsetDateTime.now().minusHours(4));
			comment1.setUpdatedAt(OffsetDateTime.now().minusHours(4));
			
			SimpleUserDto author1 = new SimpleUserDto();
			author1.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440002"));
			author1.setUsername("ImportGuru");
			comment1.setAuthor(author1);
			comments.add(comment1);
			
			ForumCommentResponse comment2 = new ForumCommentResponse();
			comment2.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440034"));
			comment2.setContent("What about cotton vs synthetic materials? The rates can vary significantly.");
			comment2.setCreatedAt(OffsetDateTime.now().minusHours(2));
			comment2.setUpdatedAt(OffsetDateTime.now().minusHours(2));
			
			SimpleUserDto author2 = new SimpleUserDto();
			author2.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440001"));
			author2.setUsername("TradeExpert");
			comment2.setAuthor(author2);
			comments.add(comment2);
		}
		
		return new PageImpl<>(comments, pageable, comments.size());
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

	public Page<ForumPostResponse> getTrendingPosts(Pageable pageable, UUID currentUserId) {
		// Return hardcoded posts sorted by trending algorithm (likes with age penalty)
		List<ForumPostResponse> posts = new ArrayList<>();
		
		// Create posts with different vote counts and ages for trending calculation
		ForumPostResponse post1 = new ForumPostResponse();
		post1.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440020"));
		post1.setTitle("How to calculate tariffs for electronics from China?");
		post1.setContent("I'm importing electronic components from China and need help understanding the tariff calculation process. What are the key factors I should consider when calculating tariffs for electronic goods?");
		post1.setExcerpt("I'm importing electronic components from China and need help understanding the tariff calculation process. What are the key factors I should consider when calculating tariffs for electronic goods?");
		post1.setViewCount(45);
		post1.setCommentCount(2);
		post1.setVoteCount(8); // High votes
		post1.setCreatedAt(OffsetDateTime.now().minusHours(2)); // Recent
		post1.setUpdatedAt(OffsetDateTime.now().minusHours(2));
		post1.setLastActivityAt(OffsetDateTime.now().minusMinutes(30));
		post1.setIsPinned(false);
		post1.setIsLocked(false);
		
		SimpleUserDto author1 = new SimpleUserDto();
		author1.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440001"));
		author1.setUsername("TradeExpert");
		post1.setAuthor(author1);
		
		ForumCategoryDto category1 = new ForumCategoryDto();
		category1.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440010"));
		category1.setName("Electronics");
		category1.setDescription("Discussions about electronic goods and components");
		category1.setColor("#3B82F6");
		category1.setIcon("cpu");
		post1.setCategory(category1);
		posts.add(post1);
		
		ForumPostResponse post2 = new ForumPostResponse();
		post2.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440022"));
		post2.setTitle("Textile Import Tariffs - Complete Guide");
		post2.setContent("Comprehensive guide to understanding textile import tariffs across different countries. Covers cotton, synthetic materials, and finished garments.");
		post2.setExcerpt("Comprehensive guide to understanding textile import tariffs across different countries. Covers cotton, synthetic materials, and finished garments.");
		post2.setViewCount(67);
		post2.setCommentCount(2);
		post2.setVoteCount(12); // Highest votes
		post2.setCreatedAt(OffsetDateTime.now().minusHours(1)); // Most recent
		post2.setUpdatedAt(OffsetDateTime.now().minusHours(1));
		post2.setLastActivityAt(OffsetDateTime.now().minusMinutes(15));
		post2.setIsPinned(false);
		post2.setIsLocked(false);
		
		SimpleUserDto author2 = new SimpleUserDto();
		author2.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440002"));
		author2.setUsername("ImportGuru");
		post2.setAuthor(author2);
		
		ForumCategoryDto category2 = new ForumCategoryDto();
		category2.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440011"));
		category2.setName("Textiles");
		category2.setDescription("Discussions about textile and clothing imports");
		category2.setColor("#10B981");
		category2.setIcon("shirt");
		post2.setCategory(category2);
		posts.add(post2);
		
		ForumPostResponse post3 = new ForumPostResponse();
		post3.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440021"));
		post3.setTitle("Welcome to the General Discussion Forum!");
		post3.setContent("This is a place for general discussions about tariffs, trade, and international business. Feel free to share your experiences and ask questions.");
		post3.setExcerpt("This is a place for general discussions about tariffs, trade, and international business. Feel free to share your experiences and ask questions.");
		post3.setViewCount(23);
		post3.setCommentCount(1);
		post3.setVoteCount(5); // Lower votes
		post3.setCreatedAt(OffsetDateTime.now().minusDays(1)); // Older
		post3.setUpdatedAt(OffsetDateTime.now().minusDays(1));
		post3.setLastActivityAt(OffsetDateTime.now().minusHours(3));
		post3.setIsPinned(false);
		post3.setIsLocked(false);
		
		SimpleUserDto author3 = new SimpleUserDto();
		author3.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440001"));
		author3.setUsername("TradeExpert");
		post3.setAuthor(author3);
		
		ForumCategoryDto category3 = new ForumCategoryDto();
		category3.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440012"));
		category3.setName("General");
		category3.setDescription("General discussions about trade and tariffs");
		category3.setColor("#6B7280");
		category3.setIcon("message-circle");
		post3.setCategory(category3);
		posts.add(post3);
		
		// Sort by trending score (votes with age penalty)
		posts.sort((a, b) -> {
			long ageA = Duration.between(a.getCreatedAt(), OffsetDateTime.now()).toHours();
			long ageB = Duration.between(b.getCreatedAt(), OffsetDateTime.now()).toHours();
			
			// Trending score = votes / (1 + age_in_hours / 24)
			double scoreA = a.getVoteCount() / (1.0 + ageA / 24.0);
			double scoreB = b.getVoteCount() / (1.0 + ageB / 24.0);
			
			return Double.compare(scoreB, scoreA); // Descending order
		});
		
		return new PageImpl<>(posts, pageable, posts.size());
	}
}


