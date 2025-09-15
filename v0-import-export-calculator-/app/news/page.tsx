"use client"

import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, TrendingUp, Globe, DollarSign, FileText } from "lucide-react"

// Mock news data - in a real app, this would come from an API
const newsArticles = [
  {
    id: 1,
    title: "New Tariff Rates Announced for Electronics Imports",
    excerpt: "The U.S. Trade Representative has announced updated tariff rates for electronic goods imported from select countries, effective January 2024.",
    content: "The updated tariff structure affects various categories of electronic devices, including smartphones, laptops, and consumer electronics. Importers should review their supply chains and consider alternative sourcing strategies to minimize cost impacts.",
    author: "Trade Policy Team",
    publishedAt: "2024-01-15",
    readTime: "3 min read",
    category: "Policy Updates",
    tags: ["Electronics", "Tariffs", "Import Policy"],
    featured: true
  },
  {
    id: 2,
    title: "Impact of Trade Agreements on Agricultural Tariffs",
    excerpt: "Recent trade agreements have significantly reduced tariff barriers for agricultural products, benefiting farmers and consumers alike.",
    content: "The new trade agreements include provisions for gradual tariff reduction over the next five years, with immediate benefits for key agricultural commodities including grains, fruits, and vegetables.",
    author: "Agricultural Trade Analyst",
    publishedAt: "2024-01-12",
    readTime: "5 min read",
    category: "Trade Agreements",
    tags: ["Agriculture", "Trade Agreements", "Farmers"],
    featured: false
  },
  {
    id: 3,
    title: "How to Calculate Tariffs for Multi-Country Shipments",
    excerpt: "A comprehensive guide to understanding and calculating tariffs for goods that transit through multiple countries before reaching their final destination.",
    content: "Multi-country shipments present unique challenges in tariff calculation. This guide covers the rules of origin, preferential trade agreements, and how to determine the correct tariff classification for complex supply chains.",
    author: "Customs Expert",
    publishedAt: "2024-01-10",
    readTime: "7 min read",
    category: "How-To Guide",
    tags: ["Calculation", "Multi-Country", "Rules of Origin"],
    featured: false
  },
  {
    id: 4,
    title: "Automotive Industry Faces New Tariff Challenges",
    excerpt: "Recent policy changes have introduced new tariff structures for automotive imports, affecting both manufacturers and consumers.",
    content: "The automotive industry is adapting to new tariff regulations that impact vehicle imports, parts, and components. Industry leaders are working with policymakers to ensure smooth transitions.",
    author: "Industry Reporter",
    publishedAt: "2024-01-08",
    readTime: "4 min read",
    category: "Industry News",
    tags: ["Automotive", "Manufacturing", "Policy"],
    featured: false
  },
  {
    id: 5,
    title: "Digital Services and Cross-Border Taxation",
    excerpt: "Exploring the evolving landscape of digital service taxation and its implications for international trade.",
    content: "As digital services continue to grow, countries are implementing new taxation frameworks that affect cross-border digital trade. Understanding these regulations is crucial for digital service providers.",
    author: "Digital Trade Specialist",
    publishedAt: "2024-01-05",
    readTime: "6 min read",
    category: "Digital Trade",
    tags: ["Digital Services", "Taxation", "Cross-Border"],
    featured: false
  }
]

const categories = [
  { name: "All", count: newsArticles.length },
  { name: "Policy Updates", count: newsArticles.filter(article => article.category === "Policy Updates").length },
  { name: "Trade Agreements", count: newsArticles.filter(article => article.category === "Trade Agreements").length },
  { name: "How-To Guide", count: newsArticles.filter(article => article.category === "How-To Guide").length },
  { name: "Industry News", count: newsArticles.filter(article => article.category === "Industry News").length },
  { name: "Digital Trade", count: newsArticles.filter(article => article.category === "Digital Trade").length }
]

export default function NewsPage() {
  const featuredArticle = newsArticles.find(article => article.featured)
  const regularArticles = newsArticles.filter(article => !article.featured)

  return (
    <div className="bg-background">
      <NavigationHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Tariff News & Articles
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay updated with the latest developments in international trade, tariff policies, and industry insights.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <Badge
              key={category.name}
              variant={category.name === "All" ? "default" : "secondary"}
              className="cursor-pointer hover:bg-primary/80 transition-colors"
            >
              {category.name} ({category.count})
            </Badge>
          ))}
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <Card className="mb-8 border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="default">Featured</Badge>
                <Badge variant="outline">{featuredArticle.category}</Badge>
              </div>
              <CardTitle className="text-2xl">{featuredArticle.title}</CardTitle>
              <CardDescription className="text-base">{featuredArticle.excerpt}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(featuredArticle.publishedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {featuredArticle.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  {featuredArticle.author}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {featuredArticle.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" size="sm">
                Read Full Article
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Regular Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularArticles.map((article) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{article.category}</Badge>
                </div>
                <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {article.readTime}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>
      </main>
    </div>
  )
}
