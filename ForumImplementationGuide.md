# Forum Feature Implementation Guide

## Overview
This guide provides a complete step-by-step implementation of a persistent forum feature for the Tariff Calculator application, allowing users to post discussion questions about tariffs and trade.

## Table of Contents
1. [Database Setup](#database-setup)
2. [Backend Implementation](#backend-implementation)
3. [Frontend Implementation](#frontend-implementation)
4. [Testing Strategy](#testing-strategy)
5. [Deployment Considerations](#deployment-considerations)

---

## Database Setup

### 1. Create Forum Tables

Execute these SQL scripts in your PostgreSQL database:

```sql
-- Forum Categories Table
CREATE TABLE forum_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(7) DEFAULT '#3B82F6',
    icon VARCHAR(50),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Forum Posts Table
CREATE TABLE forum_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES forum_categories(id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_activity_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    view_count INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_locked BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    tags TEXT[],
    metadata JSONB
);

-- Forum Replies Table
CREATE TABLE forum_replies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    post_id UUID NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    parent_reply_id UUID REFERENCES forum_replies(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    like_count INTEGER DEFAULT 0,
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMPTZ,
    reply_depth INTEGER DEFAULT 0,
    metadata JSONB
);

-- Post Likes Table
CREATE TABLE post_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
    reply_id UUID REFERENCES forum_replies(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT check_like_target CHECK (
        (post_id IS NOT NULL AND reply_id IS NULL) OR 
        (post_id IS NULL AND reply_id IS NOT NULL)
    )
);

-- Forum Subscriptions Table
CREATE TABLE forum_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
    category_id UUID REFERENCES forum_categories(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT check_subscription_target CHECK (
        (post_id IS NOT NULL AND category_id IS NULL) OR 
        (post_id IS NULL AND category_id IS NOT NULL)
    ),
    UNIQUE(user_id, post_id),
    UNIQUE(user_id, category_id)
);
```

### 2. Create Indexes

```sql
-- Performance Indexes
CREATE INDEX idx_forum_posts_category_id ON forum_posts(category_id);
CREATE INDEX idx_forum_posts_author_id ON forum_posts(author_id);
CREATE INDEX idx_forum_posts_created_at ON forum_posts(created_at DESC);
CREATE INDEX idx_forum_posts_last_activity ON forum_posts(last_activity_at DESC);
CREATE INDEX idx_forum_posts_pinned ON forum_posts(is_pinned, created_at DESC);
CREATE INDEX idx_forum_posts_deleted ON forum_posts(is_deleted);
CREATE INDEX idx_forum_posts_tags ON forum_posts USING GIN(tags);

CREATE INDEX idx_forum_replies_post_id ON forum_replies(post_id);
CREATE INDEX idx_forum_replies_author_id ON forum_replies(author_id);
CREATE INDEX idx_forum_replies_parent_id ON forum_replies(parent_reply_id);
CREATE INDEX idx_forum_replies_created_at ON forum_replies(created_at DESC);

CREATE INDEX idx_post_likes_post_id ON post_likes(post_id);
CREATE INDEX idx_post_likes_reply_id ON post_likes(reply_id);
CREATE INDEX idx_post_likes_user_id ON post_likes(user_id);
```

### 3. Insert Default Categories

```sql
INSERT INTO forum_categories (name, description, color, icon, sort_order) VALUES
('General Discussion', 'General questions and discussions about tariffs and trade', '#3B82F6', 'message-square', 1),
('Tariff Calculations', 'Help with tariff calculations and HTS codes', '#10B981', 'calculator', 2),
('Policy Updates', 'Discussion about new trade policies and regulations', '#F59E0B', 'file-text', 3),
('Industry Specific', 'Industry-specific tariff discussions', '#8B5CF6', 'briefcase', 4),
('Technical Support', 'Technical issues and platform support', '#EF4444', 'help-circle', 5),
('Announcements', 'Important updates and announcements', '#6B7280', 'megaphone', 0);
```

---

## Backend Implementation

### Phase 1: Entity Classes

Create these entity classes in `src/main/java/com/tariff/app/entity/`:

#### ForumCategory.java
```java
package com.tariff.app.entity;

import javax.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "forum_categories")
public class ForumCategory {
    @Id
    @GeneratedValue
    @Column(name = "id", columnDefinition = "UUID")
    private UUID id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "color")
    private String color;

    @Column(name = "icon")
    private String icon;

    @Column(name = "sort_order")
    private Integer sortOrder;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "TIMESTAMPTZ")
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMPTZ")
    private OffsetDateTime updatedAt;

    // Constructors, getters, setters...
}
```

#### ForumPost.java
```java
package com.tariff.app.entity;

import javax.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "forum_posts")
public class ForumPost {
    @Id
    @GeneratedValue
    @Column(name = "id", columnDefinition = "UUID")
    private UUID id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "excerpt", columnDefinition = "TEXT")
    private String excerpt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private ForumCategory category;

    @Column(name = "created_at", nullable = false, updatable = false, columnDefinition = "TIMESTAMPTZ")
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", nullable = false, columnDefinition = "TIMESTAMPTZ")
    private OffsetDateTime updatedAt;

    @Column(name = "last_activity_at", nullable = false, columnDefinition = "TIMESTAMPTZ")
    private OffsetDateTime lastActivityAt;

    @Column(name = "view_count")
    private Integer viewCount;

    @Column(name = "reply_count")
    private Integer replyCount;

    @Column(name = "like_count")
    private Integer likeCount;

    @Column(name = "is_pinned")
    private Boolean isPinned;

    @Column(name = "is_locked")
    private Boolean isLocked;

    @Column(name = "is_deleted")
    private Boolean isDeleted;

    @Column(name = "deleted_at", columnDefinition = "TIMESTAMPTZ")
    private OffsetDateTime deletedAt;

    @Column(name = "tags", columnDefinition = "TEXT[]")
    private String[] tags;

    @Column(name = "metadata", columnDefinition = "JSONB")
    private String metadata;

    // Constructors, getters, setters...
}
```

### Phase 2: Repository Interfaces

Create these in `src/main/java/com/tariff/app/repository/`:

#### ForumCategoryRepository.java
```java
package com.tariff.app.repository;

import com.tariff.app.entity.ForumCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ForumCategoryRepository extends JpaRepository<ForumCategory, UUID> {
    
    @Query("SELECT fc FROM ForumCategory fc WHERE fc.isActive = true ORDER BY fc.sortOrder ASC")
    List<ForumCategory> findAllActiveOrdered();
    
    Optional<ForumCategory> findByName(String name);
    
    @Query("SELECT fc FROM ForumCategory fc WHERE fc.isActive = true AND fc.id = :id")
    Optional<ForumCategory> findActiveById(UUID id);
}
```

#### ForumPostRepository.java
```java
package com.tariff.app.repository;

import com.tariff.app.entity.ForumPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ForumPostRepository extends JpaRepository<ForumPost, UUID> {
    
    @Query("SELECT fp FROM ForumPost fp WHERE fp.isDeleted = false ORDER BY fp.isPinned DESC, fp.lastActivityAt DESC")
    Page<ForumPost> findAllActiveOrdered(Pageable pageable);
    
    @Query("SELECT fp FROM ForumPost fp WHERE fp.category.id = :categoryId AND fp.isDeleted = false ORDER BY fp.isPinned DESC, fp.lastActivityAt DESC")
    Page<ForumPost> findByCategoryIdOrdered(@Param("categoryId") UUID categoryId, Pageable pageable);
    
    @Query("SELECT fp FROM ForumPost fp WHERE fp.author.id = :authorId AND fp.isDeleted = false ORDER BY fp.createdAt DESC")
    Page<ForumPost> findByAuthorIdOrdered(@Param("authorId") UUID authorId, Pageable pageable);
    
    @Query("SELECT fp FROM ForumPost fp WHERE fp.isDeleted = false AND (LOWER(fp.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(fp.content) LIKE LOWER(CONCAT('%', :query, '%'))) ORDER BY fp.lastActivityAt DESC")
    Page<ForumPost> searchPosts(@Param("query") String query, Pageable pageable);
    
    @Query("SELECT fp FROM ForumPost fp WHERE fp.isDeleted = false AND fp.isPinned = true ORDER BY fp.createdAt DESC")
    List<ForumPost> findPinnedPosts();
    
    Optional<ForumPost> findByIdAndIsDeletedFalse(UUID id);
}
```

### Phase 3: DTOs

Create these in `src/main/java/com/tariff/app/dto/`:

#### ForumCategoryDto.java
```java
package com.tariff.app.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

public class ForumCategoryDto {
    private UUID id;
    private String name;
    private String description;
    private String color;
    private String icon;
    private Integer sortOrder;
    private Boolean isActive;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
    
    // Constructors, getters, setters...
}
```

#### CreatePostRequest.java
```java
package com.tariff.app.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.UUID;

public class CreatePostRequest {
    @NotBlank(message = "Title is required")
    @Size(min = 5, max = 200, message = "Title must be between 5 and 200 characters")
    private String title;
    
    @NotBlank(message = "Content is required")
    @Size(min = 10, max = 10000, message = "Content must be between 10 and 10000 characters")
    private String content;
    
    private UUID categoryId;
    private String[] tags;
    
    // Constructors, getters, setters...
}
```

#### ForumPostResponse.java
```java
package com.tariff.app.dto;

import java.time.OffsetDateTime;
import java.util.UUID;

public class ForumPostResponse {
    private UUID id;
    private String title;
    private String content;
    private String excerpt;
    private UserDto author;
    private ForumCategoryDto category;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
    private OffsetDateTime lastActivityAt;
    private Integer viewCount;
    private Integer replyCount;
    private Integer likeCount;
    private Boolean isPinned;
    private Boolean isLocked;
    private String[] tags;
    private Boolean isLikedByCurrentUser;
    
    // Constructors, getters, setters...
}
```

### Phase 4: Service Layer

Create `ForumService.java` in `src/main/java/com/tariff/app/service/`:

```java
package com.tariff.app.service;

import com.tariff.app.dto.*;
import com.tariff.app.entity.*;
import com.tariff.app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class ForumService {
    
    @Autowired
    private ForumPostRepository postRepository;
    
    @Autowired
    private ForumCategoryRepository categoryRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public Page<ForumPostResponse> getAllPosts(Pageable pageable, UUID currentUserId) {
        Page<ForumPost> posts = postRepository.findAllActiveOrdered(pageable);
        return posts.map(post -> convertToPostResponse(post, currentUserId));
    }
    
    public Page<ForumPostResponse> getPostsByCategory(UUID categoryId, Pageable pageable, UUID currentUserId) {
        Page<ForumPost> posts = postRepository.findByCategoryIdOrdered(categoryId, pageable);
        return posts.map(post -> convertToPostResponse(post, currentUserId));
    }
    
    public ForumPostResponse createPost(CreatePostRequest request, UUID authorId) {
        // Validate category exists and is active
        ForumCategory category = categoryRepository.findActiveById(request.getCategoryId())
            .orElseThrow(() -> new RuntimeException("Category not found or inactive"));
        
        // Get author
        User author = userRepository.findById(authorId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Create post
        ForumPost post = new ForumPost();
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setExcerpt(generateExcerpt(request.getContent()));
        post.setAuthor(author);
        post.setCategory(category);
        post.setTags(request.getTags());
        
        OffsetDateTime now = OffsetDateTime.now();
        post.setCreatedAt(now);
        post.setUpdatedAt(now);
        post.setLastActivityAt(now);
        post.setViewCount(0);
        post.setReplyCount(0);
        post.setLikeCount(0);
        post.setIsPinned(false);
        post.setIsLocked(false);
        post.setIsDeleted(false);
        
        ForumPost savedPost = postRepository.save(post);
        return convertToPostResponse(savedPost, authorId);
    }
    
    public ForumPostResponse getPostById(UUID postId, UUID currentUserId) {
        ForumPost post = postRepository.findByIdAndIsDeletedFalse(postId)
            .orElseThrow(() -> new RuntimeException("Post not found"));
        
        // Increment view count
        post.setViewCount(post.getViewCount() + 1);
        postRepository.save(post);
        
        return convertToPostResponse(post, currentUserId);
    }
    
    private String generateExcerpt(String content) {
        if (content.length() <= 200) {
            return content;
        }
        return content.substring(0, 200) + "...";
    }
    
    private ForumPostResponse convertToPostResponse(ForumPost post, UUID currentUserId) {
        // Implementation to convert entity to DTO
        // Include logic to check if current user liked the post
        return new ForumPostResponse();
    }
}
```

### Phase 5: Controller Layer

Create `ForumController.java` in `src/main/java/com/tariff/app/controller/`:

```java
package com.tariff.app.controller;

import com.tariff.app.dto.*;
import com.tariff.app.service.ForumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;

@RestController
@RequestMapping("/api/forum")
@CrossOrigin(origins = "*")
public class ForumController {
    
    @Autowired
    private ForumService forumService;
    
    @GetMapping("/posts")
    public ResponseEntity<Page<ForumPostResponse>> getAllPosts(
            Pageable pageable,
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(required = false) String search,
            @CookieValue(name = "jwt", defaultValue = "") String jwtToken) {
        
        UUID currentUserId = getCurrentUserIdFromJwt(jwtToken);
        
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
        
        UUID currentUserId = getCurrentUserIdFromJwt(jwtToken);
        ForumPostResponse post = forumService.getPostById(id, currentUserId);
        return ResponseEntity.ok(post);
    }
    
    @PostMapping("/posts")
    public ResponseEntity<ForumPostResponse> createPost(
            @Valid @RequestBody CreatePostRequest request,
            @CookieValue(name = "jwt", defaultValue = "") String jwtToken) {
        
        if (jwtToken.isEmpty() || !JwtService.validateJwt(jwtToken)) {
            return ResponseEntity.status(401).build();
        }
        
        UUID currentUserId = getCurrentUserIdFromJwt(jwtToken);
        ForumPostResponse post = forumService.createPost(request, currentUserId);
        return ResponseEntity.ok(post);
    }
    
    private UUID getCurrentUserIdFromJwt(String jwtToken) {
        // Extract user ID from JWT token
        // Implementation depends on your JWT structure
        return null; // Placeholder
    }
}
```

---

## Frontend Implementation

### Phase 1: Update Forum Page

Update `app/forum/page.tsx` to integrate with real API:

```typescript
"use client"

import { useState, useEffect } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Plus, Search, ThumbsUp, Reply, Clock, Users, TrendingUp } from "lucide-react"
import { useAuth } from "@/components/auth-context"

interface ForumPost {
  id: string
  title: string
  content: string
  excerpt: string
  author: {
    id: string
    username: string
  }
  category: {
    id: string
    name: string
    color: string
  }
  createdAt: string
  viewCount: number
  replyCount: number
  likeCount: number
  isPinned: boolean
  isLikedByCurrentUser: boolean
}

interface ForumCategory {
  id: string
  name: string
  description: string
  color: string
  icon: string
}

export default function ForumPage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [categories, setCategories] = useState<ForumCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostCategory, setNewPostCategory] = useState("")

  useEffect(() => {
    fetchPosts()
    fetchCategories()
  }, [selectedCategory, searchQuery])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedCategory) params.append('categoryId', selectedCategory)
      if (searchQuery) params.append('search', searchQuery)
      
      const response = await fetch(`/api/forum/posts?${params}`)
      if (response.ok) {
        const data = await response.json()
        setPosts(data.content || data) // Handle both paginated and non-paginated responses
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/forum/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const createPost = async () => {
    if (!user) return

    try {
      const response = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newPostTitle,
          content: newPostContent,
          categoryId: newPostCategory
        })
      })

      if (response.ok) {
        // Reset form
        setNewPostTitle("")
        setNewPostContent("")
        setNewPostCategory("")
        // Refresh posts
        fetchPosts()
      }
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="bg-background">
        <NavigationHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </main>
      </div>
    )
  }

  return (
    <div className="bg-background">
      <NavigationHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Tariff Discussion Forum
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Connect with fellow traders, ask questions, and share insights about tariffs and international trade.
          </p>
        </div>

        {/* Search and Create Post */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          {user && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Post</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      placeholder="Enter post title..."
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <select
                      value={newPostCategory}
                      onChange={(e) => setNewPostCategory(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select category...</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Content</label>
                    <Textarea
                      placeholder="Write your post content..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <Button onClick={createPost} className="w-full">
                    Create Post
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div
                  className={`p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors ${
                    selectedCategory === "" ? "bg-accent" : ""
                  }`}
                  onClick={() => setSelectedCategory("")}
                >
                  <div className="font-medium text-sm">All Categories</div>
                </div>
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors ${
                      selectedCategory === category.id ? "bg-accent" : ""
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="font-medium text-sm">{category.name}</div>
                    <div className="text-xs text-muted-foreground mb-1">
                      {category.description}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Discussions</h2>
                <Badge variant="outline" className="gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Most Active
                </Badge>
              </div>

              {posts.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No posts found.</p>
                  </CardContent>
                </Card>
              ) : (
                posts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {post.author.username.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge 
                              variant="secondary" 
                              className="text-xs"
                              style={{ backgroundColor: post.category.color + '20', color: post.category.color }}
                            >
                              {post.category.name}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              by {post.author.username}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              • {formatDate(post.createdAt)}
                            </span>
                            {post.isPinned && (
                              <Badge variant="outline" className="text-xs">
                                Pinned
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-semibold text-lg mb-2 hover:text-primary cursor-pointer">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Reply className="h-4 w-4" />
                              {post.replyCount} replies
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              {post.likeCount} likes
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {post.viewCount} views
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
```

---

## Testing Strategy

### Backend Testing
1. **Unit Tests**: Test service layer business logic
2. **Integration Tests**: Test API endpoints with test database
3. **Repository Tests**: Test data access layer

### Frontend Testing
1. **Component Tests**: Test React components
2. **Integration Tests**: Test API integration
3. **E2E Tests**: Test complete user workflows

---

## Deployment Considerations

### Database Migrations
- Use Flyway or Liquibase for database versioning
- Create migration scripts for production deployment

### Environment Configuration
- Separate configurations for dev/staging/production
- Environment-specific database connections

### Performance Optimization
- Implement caching for frequently accessed data
- Add database connection pooling
- Optimize queries with proper indexing

---

## Implementation Checklist

### Phase 1: Database & Backend
- [ ] Create database tables and indexes
- [ ] Implement entity classes
- [ ] Create repository interfaces
- [ ] Implement service layer
- [ ] Create DTOs
- [ ] Implement REST controllers
- [ ] Add validation and error handling

### Phase 2: Frontend Integration
- [ ] Update forum page with real API calls
- [ ] Implement post creation functionality
- [ ] Add search and filtering
- [ ] Implement post detail view
- [ ] Add reply functionality
- [ ] Implement like system

### Phase 3: Advanced Features
- [ ] Add real-time notifications
- [ ] Implement rich text editor
- [ ] Add image upload support
- [ ] Implement moderation tools
- [ ] Add user subscriptions
- [ ] Implement reporting system

### Phase 4: Testing & Deployment
- [ ] Write comprehensive tests
- [ ] Performance testing
- [ ] Security audit
- [ ] Production deployment
- [ ] Monitor and optimize

---

This guide provides a complete roadmap for implementing the forum feature. Follow the phases sequentially, testing each component before moving to the next phase.
