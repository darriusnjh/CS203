// Forum API Client
const API_BASE_URL = 'http://localhost:8080/api/forum';

export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  color?: string;
  icon?: string;
}

export interface SimpleUser {
  id: string;
  username: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: SimpleUser;
  category: ForumCategory;
  createdAt: string;
  updatedAt: string;
  lastActivityAt: string;
  viewCount: number;
  commentCount: number;
  voteCount: number;
  isPinned: boolean;
  isLocked: boolean;
}

export interface ForumComment {
  id: string;
  content: string;
  author: SimpleUser;
  parentCommentId?: string;
  createdAt: string;
  updatedAt: string;
  voteCount: number;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  categoryId: string;
}

export interface CreateCommentRequest {
  content: string;
  parentCommentId?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

class ForumAPI {
  private getAuthHeaders(): HeadersInit {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return {
        'Content-Type': 'application/json'
      };
    }
    
    const jwtToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('jwt='))
      ?.split('=')[1] || '';
    
    return {
      'Content-Type': 'application/json',
      ...(jwtToken && { 'Authorization': `Bearer ${jwtToken}` })
    };
  }

  // Categories
  async getCategories(): Promise<ForumCategory[]> {
    console.log('Making request to:', `${API_BASE_URL}/categories`);
    const response = await fetch(`${API_BASE_URL}/categories`, {
      headers: this.getAuthHeaders()
    });
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Categories data:', data);
    return data;
  }

  // Posts
  async getPosts(page: number = 0, size: number = 10, categoryId?: string, search?: string): Promise<PaginatedResponse<ForumPost>> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString()
    });
    
    if (categoryId) params.append('categoryId', categoryId);
    if (search) params.append('search', search);

    const response = await fetch(`${API_BASE_URL}/posts?${params}`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }
    return response.json();
  }

  async getPost(id: string): Promise<ForumPost> {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }
    return response.json();
  }

  async createPost(postData: CreatePostRequest): Promise<ForumPost> {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(postData)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.statusText}`);
    }
    return response.json();
  }

  // Comments
  async getComments(postId: string, page: number = 0, size: number = 10): Promise<PaginatedResponse<ForumComment>> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString()
    });

    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments?${params}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch comments: ${response.statusText}`);
    }
    return response.json();
  }

  async createComment(postId: string, commentData: CreateCommentRequest): Promise<ForumComment> {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(commentData)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create comment: ${response.statusText}`);
    }
    return response.json();
  }

  // Voting
  async votePost(postId: string, up: boolean = true): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/vote?up=${up}`, {
      method: 'POST',
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to vote on post: ${response.statusText}`);
    }
  }

  async unvotePost(postId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/vote`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to remove vote from post: ${response.statusText}`);
    }
  }

  async voteComment(commentId: string, up: boolean = true): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/comments/${commentId}/vote?up=${up}`, {
      method: 'POST',
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to vote on comment: ${response.statusText}`);
    }
  }

  async unvoteComment(commentId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/comments/${commentId}/vote`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to remove vote from comment: ${response.statusText}`);
    }
  }

  // Trending posts
  async getTrendingPosts(page: number = 0, size: number = 10): Promise<PaginatedResponse<ForumPost>> {
    console.log('Making request to:', `${API_BASE_URL}/trending`);
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString()
    });
    
    const response = await fetch(`${API_BASE_URL}/trending?${params}`, {
      headers: this.getAuthHeaders()
    });
    
    console.log('Trending response status:', response.status);
    console.log('Trending response ok:', response.ok);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch trending posts: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Trending posts data:', data);
    return data;
  }
}

export const forumAPI = new ForumAPI();
