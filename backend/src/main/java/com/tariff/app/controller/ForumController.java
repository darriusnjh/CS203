package com.tariff.app.controller;

import com.tariff.app.dto.CreatePostRequest;
import com.tariff.app.dto.ForumCategoryDto;
import com.tariff.app.dto.ForumPostResponse;
import com.tariff.app.service.ForumService;
import com.tariff.app.service.JwtService;
import io.jsonwebtoken.Claims;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;

import com.tariff.app.dto.CreateCommentRequest;
import com.tariff.app.dto.ForumCommentResponse;

@RestController
@RequestMapping("/api/forum")
@CrossOrigin(origins = "*")
@Tag(name = "Forum", description = "APIs for forum posts, comments, and community features")
public class ForumController {

	@Autowired
	private ForumService forumService;

	@Operation(summary = "Test Forum API", description = "Check if the Forum API is working")
	@ApiResponse(responseCode = "200", description = "Forum API is working")
	@GetMapping("/test")
	public ResponseEntity<String> test() {
		return ResponseEntity.ok("Forum API is working!");
	}

	@Operation(summary = "Get Forum Categories", description = "Retrieve all available forum categories")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Categories retrieved successfully",
					content = @Content(mediaType = "application/json", schema = @Schema(implementation = ForumCategoryDto.class)))
	})
	@GetMapping("/categories")
	public ResponseEntity<List<ForumCategoryDto>> categories() {
		return ResponseEntity.ok(forumService.getCategories());
	}

	@Operation(summary = "List Forum Posts", description = "Get paginated list of forum posts with optional filtering by category or search")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Posts retrieved successfully",
					content = @Content(mediaType = "application/json", schema = @Schema(implementation = ForumPostResponse.class)))
	})
	@GetMapping("/posts")
	public ResponseEntity<Page<ForumPostResponse>> listPosts(
			@Parameter(description = "Pagination parameters")
			Pageable pageable,
			@Parameter(description = "Filter by category ID", example = "123e4567-e89b-12d3-a456-426614174000")
			@RequestParam(required = false) UUID categoryId,
			@Parameter(description = "Search query for posts", example = "tariff calculation")
			@RequestParam(required = false) String search,
			@Parameter(description = "JWT token for authentication", hidden = true)
			@CookieValue(name = "jwt", defaultValue = "") String jwtToken) {

		UUID currentUserId = getUserIdFromJwt(jwtToken);
		Page<ForumPostResponse> posts;
		if (categoryId != null) {
			posts = forumService.listPostsByCategory(categoryId, pageable, currentUserId);
		} else if (search != null && !search.trim().isEmpty()) {
			posts = forumService.searchPosts(search, pageable, currentUserId);
		} else {
			posts = forumService.listPosts(pageable, currentUserId);
		}
		return ResponseEntity.ok(posts);
	}

	@Operation(summary = "Get Forum Post", description = "Retrieve a specific forum post by ID")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Post retrieved successfully",
					content = @Content(mediaType = "application/json", schema = @Schema(implementation = ForumPostResponse.class))),
			@ApiResponse(responseCode = "404", description = "Post not found")
	})
	@GetMapping("/posts/{id}")
	public ResponseEntity<ForumPostResponse> getPost(
			@Parameter(description = "Post ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000")
			@PathVariable UUID id,
			@Parameter(description = "JWT token for authentication", hidden = true)
			@CookieValue(name = "jwt", defaultValue = "") String jwtToken) {
		UUID currentUserId = getUserIdFromJwt(jwtToken);
		return ResponseEntity.ok(forumService.getPost(id, currentUserId));
	}

	@Operation(summary = "Create Forum Post", description = "Create a new forum post (requires authentication)")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Post created successfully",
					content = @Content(mediaType = "application/json", schema = @Schema(implementation = ForumPostResponse.class))),
			@ApiResponse(responseCode = "401", description = "Unauthorized")
	})
	@PostMapping("/posts")
	public ResponseEntity<ForumPostResponse> createPost(
			@Parameter(description = "Post creation data")
			@Valid @RequestBody CreatePostRequest request,
			@Parameter(description = "JWT token for authentication", hidden = true)
			@CookieValue(name = "jwt", defaultValue = "") String jwtToken) {
		if (jwtToken.isEmpty() || !JwtService.validateJwt(jwtToken)) {
			return ResponseEntity.status(401).build();
		}
		UUID currentUserId = getUserIdFromJwt(jwtToken);
		if (currentUserId == null) {
			return ResponseEntity.status(401).build();
		}
		return ResponseEntity.ok(forumService.createPost(request, currentUserId));
	}

	@Operation(summary = "List Post Comments", description = "Get paginated list of comments for a specific post")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Comments retrieved successfully",
					content = @Content(mediaType = "application/json", schema = @Schema(implementation = ForumCommentResponse.class)))
	})
	@GetMapping("/posts/{id}/comments")
	public ResponseEntity<Page<ForumCommentResponse>> listComments(
			@Parameter(description = "Post ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000")
			@PathVariable UUID id,
			@Parameter(description = "Pagination parameters")
			Pageable pageable) {
		return ResponseEntity.ok(forumService.listComments(id, pageable));
	}

	@Operation(summary = "Add Comment to Post", description = "Add a comment to a forum post (requires authentication)")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Comment added successfully",
					content = @Content(mediaType = "application/json", schema = @Schema(implementation = ForumCommentResponse.class))),
			@ApiResponse(responseCode = "401", description = "Unauthorized")
	})
	@PostMapping("/posts/{id}/comments")
	public ResponseEntity<ForumCommentResponse> addComment(
			@Parameter(description = "Post ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000")
			@PathVariable UUID id,
			@Parameter(description = "Comment data")
			@Valid @RequestBody CreateCommentRequest request,
			@Parameter(description = "JWT token for authentication", hidden = true)
			@CookieValue(name = "jwt", defaultValue = "") String jwtToken) {
		if (jwtToken.isEmpty() || !JwtService.validateJwt(jwtToken)) {
			return ResponseEntity.status(401).build();
		}
		UUID currentUserId = getUserIdFromJwt(jwtToken);
		if (currentUserId == null) {
			return ResponseEntity.status(401).build();
		}
		return ResponseEntity.ok(forumService.addComment(id, request, currentUserId));
	}

	@Operation(summary = "Vote on Post", description = "Vote up or down on a forum post (requires authentication)")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Vote recorded successfully"),
			@ApiResponse(responseCode = "401", description = "Unauthorized")
	})
	@PostMapping("/posts/{id}/vote")
	public ResponseEntity<Void> votePost(
			@Parameter(description = "Post ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000")
			@PathVariable UUID id,
			@Parameter(description = "Vote direction (true for up, false for down)", example = "true")
			@RequestParam(defaultValue = "true") boolean up,
			@Parameter(description = "JWT token for authentication", hidden = true)
			@CookieValue(name = "jwt", defaultValue = "") String jwtToken) {
		if (jwtToken.isEmpty() || !JwtService.validateJwt(jwtToken)) {
			return ResponseEntity.status(401).build();
		}
		UUID currentUserId = getUserIdFromJwt(jwtToken);
		if (currentUserId == null) {
			return ResponseEntity.status(401).build();
		}
		forumService.votePost(id, currentUserId, up);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "Remove Vote from Post", description = "Remove your vote from a forum post (requires authentication)")
	@ApiResponse(responseCode = "200", description = "Vote removed successfully")
	@DeleteMapping("/posts/{id}/vote")
	public ResponseEntity<Void> unvotePost(
			@Parameter(description = "Post ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000")
			@PathVariable UUID id,
			@Parameter(description = "JWT token for authentication", hidden = true)
			@CookieValue(name = "jwt", defaultValue = "") String jwtToken) {
		if (jwtToken.isEmpty() || !JwtService.validateJwt(jwtToken)) {
			return ResponseEntity.status(401).build();
		}
		UUID currentUserId = getUserIdFromJwt(jwtToken);
		if (currentUserId == null) {
			return ResponseEntity.status(401).build();
		}
		forumService.unvotePost(id, currentUserId);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "Vote on Comment", description = "Vote up or down on a forum comment (requires authentication)")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Vote recorded successfully"),
			@ApiResponse(responseCode = "401", description = "Unauthorized")
	})
	@PostMapping("/comments/{id}/vote")
	public ResponseEntity<Void> voteComment(
			@Parameter(description = "Comment ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000")
			@PathVariable UUID id,
			@Parameter(description = "Vote direction (true for up, false for down)", example = "true")
			@RequestParam(defaultValue = "true") boolean up,
			@Parameter(description = "JWT token for authentication", hidden = true)
			@CookieValue(name = "jwt", defaultValue = "") String jwtToken) {
		if (jwtToken.isEmpty() || !JwtService.validateJwt(jwtToken)) {
			return ResponseEntity.status(401).build();
		}
		UUID currentUserId = getUserIdFromJwt(jwtToken);
		if (currentUserId == null) {
			return ResponseEntity.status(401).build();
		}
		forumService.voteComment(id, currentUserId, up);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "Remove Vote from Comment", description = "Remove your vote from a forum comment (requires authentication)")
	@ApiResponse(responseCode = "200", description = "Vote removed successfully")
	@DeleteMapping("/comments/{id}/vote")
	public ResponseEntity<Void> unvoteComment(
			@Parameter(description = "Comment ID", required = true, example = "123e4567-e89b-12d3-a456-426614174000")
			@PathVariable UUID id,
			@Parameter(description = "JWT token for authentication", hidden = true)
			@CookieValue(name = "jwt", defaultValue = "") String jwtToken) {
		if (jwtToken.isEmpty() || !JwtService.validateJwt(jwtToken)) {
			return ResponseEntity.status(401).build();
		}
		UUID currentUserId = getUserIdFromJwt(jwtToken);
		if (currentUserId == null) {
			return ResponseEntity.status(401).build();
		}
		forumService.unvoteComment(id, currentUserId);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "Get Trending Posts", description = "Get trending forum posts based on votes and activity")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Trending posts retrieved successfully",
					content = @Content(mediaType = "application/json", schema = @Schema(implementation = ForumPostResponse.class)))
	})
	@GetMapping("/trending")
	public ResponseEntity<Page<ForumPostResponse>> getTrendingPosts(
			@Parameter(description = "Page number (0-based)", example = "0")
			@RequestParam(defaultValue = "0") int page,
			@Parameter(description = "Number of posts per page", example = "10")
			@RequestParam(defaultValue = "10") int size,
			@Parameter(description = "Authorization header", hidden = true)
			@RequestHeader(value = "Authorization", required = false) String authHeader) {
		UUID currentUserId = getUserIdFromJwt(authHeader);
		Pageable pageable = PageRequest.of(page, size);
		Page<ForumPostResponse> posts = forumService.getTrendingPosts(pageable, currentUserId);
		return ResponseEntity.ok(posts);
	}

	private UUID getUserIdFromJwt(String jwtToken) {
		if (jwtToken == null || jwtToken.isEmpty()) return null;
		Claims claims = JwtService.validateJwtandReturnClaim(jwtToken);
		if (claims == null) return null;
		// Our JWT subject stores the username, but we need UUID. Leave null for now; service methods that need user already accept UUID.
		return null;
	}
}
