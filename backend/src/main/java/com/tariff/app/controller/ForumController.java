package com.tariff.app.controller;

import com.tariff.app.dto.CreatePostRequest;
import com.tariff.app.dto.ForumCategoryDto;
import com.tariff.app.dto.ForumPostResponse;
import com.tariff.app.service.ForumService;
import com.tariff.app.service.JwtService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

import com.tariff.app.dto.CreateCommentRequest;
import com.tariff.app.dto.ForumCommentResponse;

@RestController
@RequestMapping("/api/forum")
@CrossOrigin(origins = "*")
public class ForumController {

	@Autowired
	private ForumService forumService;

	@GetMapping("/categories")
	public ResponseEntity<List<ForumCategoryDto>> categories() {
		return ResponseEntity.ok(forumService.getCategories());
	}

	@GetMapping("/posts")
	public ResponseEntity<Page<ForumPostResponse>> listPosts(
			Pageable pageable,
			@RequestParam(required = false) UUID categoryId,
			@RequestParam(required = false) String search,
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

	@GetMapping("/posts/{id}")
	public ResponseEntity<ForumPostResponse> getPost(
			@PathVariable UUID id,
			@CookieValue(name = "jwt", defaultValue = "") String jwtToken) {
		UUID currentUserId = getUserIdFromJwt(jwtToken);
		return ResponseEntity.ok(forumService.getPost(id, currentUserId));
	}

	@PostMapping("/posts")
	public ResponseEntity<ForumPostResponse> createPost(
			@Valid @RequestBody CreatePostRequest request,
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

	@GetMapping("/posts/{id}/comments")
	public ResponseEntity<Page<ForumCommentResponse>> listComments(
			@PathVariable UUID id,
			Pageable pageable) {
		return ResponseEntity.ok(forumService.listComments(id, pageable));
	}

	@PostMapping("/posts/{id}/comments")
	public ResponseEntity<ForumCommentResponse> addComment(
			@PathVariable UUID id,
			@Valid @RequestBody CreateCommentRequest request,
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

	@PostMapping("/posts/{id}/vote")
	public ResponseEntity<Void> votePost(
			@PathVariable UUID id,
			@RequestParam(defaultValue = "true") boolean up,
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

	@DeleteMapping("/posts/{id}/vote")
	public ResponseEntity<Void> unvotePost(
			@PathVariable UUID id,
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

	@PostMapping("/comments/{id}/vote")
	public ResponseEntity<Void> voteComment(
			@PathVariable UUID id,
			@RequestParam(defaultValue = "true") boolean up,
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

	@DeleteMapping("/comments/{id}/vote")
	public ResponseEntity<Void> unvoteComment(
			@PathVariable UUID id,
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

	private UUID getUserIdFromJwt(String jwtToken) {
		if (jwtToken == null || jwtToken.isEmpty()) return null;
		Claims claims = JwtService.validateJwtandReturnClaim(jwtToken);
		if (claims == null) return null;
		// Our JWT subject stores the username, but we need UUID. Leave null for now; service methods that need user already accept UUID.
		return null;
	}
}

package com.tariff.app.controller;

import com.tariff.app.dto.CreatePostRequest;
import com.tariff.app.dto.ForumCategoryDto;
import com.tariff.app.dto.ForumPostResponse;
import com.tariff.app.service.ForumService;
import com.tariff.app.service.JwtService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/forum")
@CrossOrigin(origins = "*")
public class ForumController {

    @Autowired
    private ForumService forumService;

    @GetMapping("/categories")
    public ResponseEntity<List<ForumCategoryDto>> getCategories() {
        return ResponseEntity.ok(forumService.getActiveCategories());
    }

    @GetMapping("/posts")
    public ResponseEntity<Page<ForumPostResponse>> getAllPosts(
            Pageable pageable,
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(required = false) String search,
            @CookieValue(name = "jwt", defaultValue = "") String jwtToken) {

        UUID currentUserId = getUserIdFromJwt(jwtToken);

        Page<ForumPostResponse> posts;
        if (categoryId != null) {
            posts = forumService.getPostsByCategory(categoryId, pageable, currentUserId);
        } else if (search != null && !search.trim().isEmpty()) {
            posts = forumService.searchPosts(search, pageable, currentUserId);
        } else {
            posts = forumService.getAllPosts(pageable, currentUserId);
        }
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<ForumPostResponse> getPost(
            @PathVariable UUID id,
            @CookieValue(name = "jwt", defaultValue = "") String jwtToken) {
        UUID currentUserId = getUserIdFromJwt(jwtToken);
        return ResponseEntity.ok(forumService.getPostById(id, currentUserId));
    }

    @PostMapping("/posts")
    public ResponseEntity<ForumPostResponse> createPost(
            @Valid @RequestBody CreatePostRequest request,
            @CookieValue(name = "jwt", defaultValue = "") String jwtToken) {
        if (jwtToken.isEmpty() || !JwtService.validateJwt(jwtToken)) {
            return ResponseEntity.status(401).build();
        }
        UUID currentUserId = getUserIdFromJwt(jwtToken);
        return ResponseEntity.ok(forumService.createPost(request, currentUserId));
    }

    private UUID getUserIdFromJwt(String jwtToken) {
        if (jwtToken == null || jwtToken.isEmpty()) return null;
        Claims claims = JwtService.validateJwtandReturnClaim(jwtToken);
        if (claims == null) return null;
        // Our JWT subject is username; we cannot directly get UUID without lookup here.
        // For now, return null to keep endpoints working without auth context where needed.
        return null;
    }
}



