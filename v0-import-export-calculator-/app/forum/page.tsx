"use client"

import { useState } from "react"
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

// Mock forum data - in a real app, this would come from an API
const forumCategories = [
  {
    id: 1,
    name: "General Discussion",
    description: "General questions and discussions about tariffs and trade",
    postCount: 45,
    latestPost: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    name: "Tariff Calculations",
    description: "Help with tariff calculations and HTS codes",
    postCount: 32,
    latestPost: "2024-01-14T15:45:00Z"
  },
  {
    id: 3,
    name: "Policy Updates",
    description: "Discussion about new trade policies and regulations",
    postCount: 28,
    latestPost: "2024-01-13T09:20:00Z"
  },
  {
    id: 4,
    name: "Industry Specific",
    description: "Industry-specific tariff discussions",
    postCount: 19,
    latestPost: "2024-01-12T14:15:00Z"
  }
]

const recentPosts = [
  {
    id: 1,
    title: "How to calculate tariffs for electronics from China?",
    author: "John Smith",
    authorAvatar: "/placeholder-user.jpg",
    category: "Tariff Calculations",
    replies: 8,
    likes: 12,
    lastActivity: "2024-01-15T10:30:00Z",
    excerpt: "I'm importing electronic components from China and need help understanding the tariff calculation process..."
  },
  {
    id: 2,
    title: "New trade agreement impacts on agricultural imports",
    author: "Sarah Johnson",
    authorAvatar: "/placeholder-user.jpg",
    category: "Policy Updates",
    replies: 15,
    likes: 23,
    lastActivity: "2024-01-14T15:45:00Z",
    excerpt: "The recent trade agreement has significant implications for agricultural imports. Let's discuss the key changes..."
  },
  {
    id: 3,
    title: "HTS Code classification for automotive parts",
    author: "Mike Chen",
    authorAvatar: "/placeholder-user.jpg",
    category: "Industry Specific",
    replies: 6,
    likes: 9,
    lastActivity: "2024-01-13T09:20:00Z",
    excerpt: "I'm having trouble classifying automotive parts under the correct HTS codes. Any experts here who can help?"
  },
  {
    id: 4,
    title: "Best practices for tariff documentation",
    author: "Emily Davis",
    authorAvatar: "/placeholder-user.jpg",
    category: "General Discussion",
    replies: 12,
    likes: 18,
    lastActivity: "2024-01-12T14:15:00Z",
    excerpt: "What documentation do you typically prepare when calculating tariffs? Looking for best practices..."
  }
]

export default function ForumPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-background">
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
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select category...</option>
                    {forumCategories.map((category) => (
                      <option key={category.id} value={category.name}>
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
                <Button className="w-full">Create Post</Button>
              </div>
            </DialogContent>
          </Dialog>
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
                {forumCategories.map((category) => (
                  <div
                    key={category.id}
                    className="p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  >
                    <div className="font-medium text-sm">{category.name}</div>
                    <div className="text-xs text-muted-foreground mb-1">
                      {category.description}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{category.postCount} posts</span>
                      <span>•</span>
                      <span>{formatDate(category.latestPost)}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Recent Posts */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Discussions</h2>
                <Badge variant="outline" className="gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Most Active
                </Badge>
              </div>

              {recentPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={post.authorAvatar} alt={post.author} />
                        <AvatarFallback>
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {post.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            by {post.author}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            • {formatDate(post.lastActivity)}
                          </span>
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
                            {post.replies} replies
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            {post.likes} likes
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Discussions
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
