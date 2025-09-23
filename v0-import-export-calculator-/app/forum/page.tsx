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
import { MessageSquare, Plus, Search, ThumbsUp, Reply, Clock, Users, TrendingUp, Edit, Trash2 } from "lucide-react"
import { useAuth } from "@/components/auth-context"
import { forumAPI, ForumPost, ForumCategory, ForumComment, CreatePostRequest, CreateCommentRequest } from "@/lib/forum-api"
import { toast, Toaster } from "sonner"

export default function ForumPage() {
  const { user } = useAuth()
  const [categories, setCategories] = useState<ForumCategory[]>([])
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostCategory, setNewPostCategory] = useState("")
  const [expandedPost, setExpandedPost] = useState<string | null>(null)
  const [postComments, setPostComments] = useState<Record<string, ForumComment[]>>({})
  const [newComment, setNewComment] = useState("")
  const [debugInfo, setDebugInfo] = useState<string>("")
  const [activeTab, setActiveTab] = useState<'all' | 'trending'>('all')

  // Load categories
  const loadCategories = async () => {
    try {
      console.log('Loading categories...')
      setDebugInfo('Loading categories...')
      const data = await forumAPI.getCategories()
      console.log('Categories loaded:', data)
      setCategories(data)
      setDebugInfo(`Categories loaded: ${data.length} items`)
    } catch (error: any) {
      console.error('Failed to load categories:', error)
      setError(`Failed to load categories: ${error.message}`)
      setDebugInfo(`Error loading categories: ${error.message}`)
      toast.error(`Failed to load categories: ${error.message}`)
    }
  }

  // Load posts
  const loadPosts = async (page: number = 0) => {
    try {
      setLoading(true)
      console.log('Loading posts...')
      setDebugInfo(`Loading posts for page ${page}, category: ${selectedCategory || 'All'}`)
      const data = await forumAPI.getPosts(page, 10, selectedCategory)
      console.log('Posts loaded:', data)
      setPosts(data.content || [])
      setDebugInfo(`Posts loaded successfully: ${data.content?.length || 0} items on page ${page}`)
    } catch (error: any) {
      console.error('Failed to load posts:', error)
      setError(`Failed to load posts: ${error.message}`)
      setDebugInfo(`Error loading posts: ${error.message}`)
      toast.error(`Failed to load posts: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Load trending posts
  const loadTrendingPosts = async (page: number = 0) => {
    try {
      setLoading(true)
      console.log('Loading trending posts...')
      setDebugInfo(`Loading trending posts for page ${page}`)
      const data = await forumAPI.getTrendingPosts(page, 10)
      console.log('Trending posts loaded:', data)
      setPosts(data.content || [])
      setDebugInfo(`Trending posts loaded successfully: ${data.content?.length || 0} items on page ${page}`)
    } catch (error: any) {
      console.error('Failed to load trending posts:', error)
      setError(`Failed to load trending posts: ${error.message}`)
      setDebugInfo(`Error loading trending posts: ${error.message}`)
      toast.error(`Failed to load trending posts: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Load comments for a post
  const loadComments = async (postId: string) => {
    try {
      const response = await forumAPI.getComments(postId)
      const comments = response.content || response
      setPostComments(prev => ({ ...prev, [postId]: comments }))
    } catch (error: any) {
      console.error('Failed to load comments:', error)
      toast.error('Failed to load comments')
    }
  }

  // Create a new post
  const handleCreatePost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim() || !newPostCategory) {
      toast.error('Please fill in all fields')
      return
    }
    if (!user) {
      toast.error('You must be logged in to create a post')
      return
    }

    try {
      const request: CreatePostRequest = {
        title: newPostTitle,
        content: newPostContent,
        categoryId: newPostCategory
      }
      await forumAPI.createPost(request)
      toast.success('Post created successfully!')
      setNewPostTitle('')
      setNewPostContent('')
      setNewPostCategory('')
      setShowCreatePost(false)
      loadPosts(0) // Reload posts
    } catch (error: any) {
      console.error('Failed to create post:', error)
      toast.error(`Failed to create post: ${error.message}`)
    }
  }

  // Create a comment
  const handleCreateComment = async (postId: string) => {
    if (!newComment.trim()) {
      toast.error('Comment cannot be empty')
      return
    }
    if (!user) {
      toast.error('You must be logged in to comment')
      return
    }

    try {
      const request: CreateCommentRequest = {
        content: newComment
      }
      await forumAPI.createComment(postId, request)
      toast.success('Comment added successfully!')
      setNewComment('')
      loadComments(postId) // Reload comments for the specific post
    } catch (error: any) {
      console.error('Failed to create comment:', error)
      toast.error(`Failed to create comment: ${error.message}`)
    }
  }

  // Vote on a post
  const handleVote = async (postId: string, isUpvote: boolean) => {
    if (!user) {
      toast.error('You must be logged in to vote')
      return
    }
    try {
      await forumAPI.votePost(postId, isUpvote)
      toast.success('Vote recorded!')
      loadPosts(0) // Reload posts to update vote count
    } catch (error: any) {
      console.error('Failed to vote:', error)
      toast.error(`Failed to vote: ${error.message}`)
    }
  }

  // Initialize data
  useEffect(() => {
    console.log('Forum page useEffect triggered')
    const initializeData = async () => {
      console.log('Initializing forum data...')
      setDebugInfo('Initializing forum data...')
      try {
        await loadCategories()
        if (activeTab === 'trending') {
          await loadTrendingPosts(0)
        } else {
          await loadPosts(0)
        }
      } catch (error: any) {
        console.error('Initialization error:', error)
        setError(`Initialization failed: ${error.message}`)
        setDebugInfo(`Initialization failed: ${error.message}`)
      }
    }
    initializeData()
  }, [activeTab])

  // Reload posts when category changes or tab changes
  useEffect(() => {
    if (categories.length > 0) {
      if (activeTab === 'trending') {
        loadTrendingPosts(0)
      } else {
        loadPosts(0)
      }
    }
  }, [selectedCategory, categories.length, activeTab])

  // Toggle post expansion
  const togglePost = (postId: string) => {
    if (expandedPost === postId) {
      setExpandedPost(null)
    } else {
      setExpandedPost(postId)
      if (!postComments[postId]) {
        loadComments(postId)
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Forum</h1>
            <p className="text-muted-foreground mt-2">Discuss tariffs, trade, and more</p>
          </div>
          {user && (
            <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                  Create Post
              </Button>
            </DialogTrigger>
              <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                  <Input
                    placeholder="Post title"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                  />
                  <Textarea
                    placeholder="Post content"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    rows={4}
                  />
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <Button onClick={handleCreatePost}>Create Post</Button>
                    <Button variant="outline" onClick={() => setShowCreatePost(false)}>
                      Cancel
                    </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          )}
        </div>

        {/* Debug Info */}
        {debugInfo && (
          <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md">
            <p className="text-sm text-blue-800 dark:text-blue-200">Debug: {debugInfo}</p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-sm text-red-800 dark:text-red-200">Error: {error}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={() => {
                setError(null)
                loadCategories()
                loadPosts(0)
              }}
            >
              Retry
            </Button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
            <Button
              variant={activeTab === 'all' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('all')}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              All Posts
            </Button>
            <Button
              variant={activeTab === 'trending' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('trending')}
              className="flex items-center gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Trending
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {activeTab === 'all' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button
                      variant={selectedCategory === null ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(null)}
                    >
                      All Posts
                    </Button>
                    {categories.map(category => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.name}
                      </Button>
                    ))}
                      </div>
                </CardContent>
              </Card>
            )}

            <Card className={activeTab === 'all' ? "mt-6" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  {activeTab === 'trending' ? 'Trending Algorithm' : 'Trending'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {activeTab === 'trending' ? (
                    <div className="text-sm text-muted-foreground">
                      <p>Posts are ranked by:</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Number of upvotes</li>
                        <li>Recency penalty</li>
                        <li>Formula: votes ÷ (1 + age_in_hours ÷ 24)</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      <p>Switch to Trending tab to see posts ranked by popularity and recency.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-muted-foreground">Loading posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No posts found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map(post => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => togglePost(post.id)}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{post.title}</CardTitle>
                          <CardDescription className="mt-2">
                            {post.excerpt}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">
                          {post.category?.name || 'Uncategorized'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Avatar className="h-6 w-6">
                        <AvatarFallback>
                              {post.author.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                          <span>{post.author.username}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                          <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.commentCount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                          <span>{post.voteCount}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleVote(post.id, true)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => togglePost(post.id)}
                        >
                          <Reply className="h-4 w-4" />
                          {expandedPost === post.id ? 'Hide' : 'View'} Comments
                        </Button>
                      </div>

                      {/* Comments Section */}
                      {expandedPost === post.id && (
                        <div className="mt-4 border-t pt-4">
                          <div className="space-y-3">
                            {postComments[post.id]?.map(comment => (
                              <div key={comment.id} className="flex gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>
                                    {comment.author.username.charAt(0).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="font-medium">{comment.author.username}</span>
                                    <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                                  </div>
                                  <p className="text-sm mt-1">{comment.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {user && (
                            <div className="mt-4 flex gap-2">
                              <Input
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="flex-1"
                              />
                              <Button
                                size="sm"
                                onClick={() => handleCreateComment(post.id)}
                              >
                                Post
                              </Button>
                            </div>
                          )}
                    </div>
                      )}
                  </CardContent>
                </Card>
              ))}
            </div>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}