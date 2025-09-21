"use client"

import { useState } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  HelpCircle, 
  Search, 
  BookOpen, 
  MessageSquare, 
  Phone, 
  Mail, 
  ChevronRight,
  Calculator,
  Globe,
  TrendingUp,
  Users,
  FileText,
  Video,
  Download
} from "lucide-react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const quickActions = [
    {
      icon: Calculator,
      title: "Getting Started",
      description: "Learn the basics of tariff calculation",
      href: "#getting-started"
    },
    {
      icon: Globe,
      title: "Country Support",
      description: "See which countries we support",
      href: "#countries"
    },
    {
      icon: TrendingUp,
      title: "Advanced Features",
      description: "Explore comparison and analysis tools",
      href: "#advanced"
    },
    {
      icon: Users,
      title: "Account Management",
      description: "Manage your account and subscription",
      href: "#account"
    }
  ]

  const faqCategories = [
    {
      title: "General",
      questions: [
        {
          question: "What is TariffCalc Pro?",
          answer: "TariffCalc Pro is a comprehensive platform for calculating import/export tariffs, comparing costs across countries, and analyzing global trade data."
        },
        {
          question: "How accurate are the calculations?",
          answer: "Our calculations are based on official government data and trade regulations. We update our database regularly to ensure accuracy, but users should verify critical calculations with official sources."
        },
        {
          question: "Which countries are supported?",
          answer: "We support 200+ countries and territories worldwide, covering the majority of global trade routes."
        }
      ]
    },
    {
      title: "Account & Billing",
      questions: [
        {
          question: "How do I create an account?",
          answer: "Click the 'Sign Up' button in the top navigation, fill out the registration form with your details, and verify your email address."
        },
        {
          question: "What subscription plans are available?",
          answer: "We offer Free, Professional, and Enterprise plans. The Free plan includes basic calculations, while paid plans offer advanced features, higher usage limits, and priority support."
        },
        {
          question: "How do I cancel my subscription?",
          answer: "You can cancel your subscription anytime from your account settings. Go to Account > Billing > Cancel Subscription."
        }
      ]
    },
    {
      title: "Technical",
      questions: [
        {
          question: "What browsers are supported?",
          answer: "TariffCalc Pro works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience."
        },
        {
          question: "Is there a mobile app?",
          answer: "Currently, we offer a responsive web application that works well on mobile devices. Native mobile apps are planned for future release."
        },
        {
          question: "Can I integrate with my existing systems?",
          answer: "Yes! We provide comprehensive APIs and can work with your team to integrate with existing ERP or trade management systems."
        }
      ]
    }
  ]

  const helpResources = [
    {
      icon: BookOpen,
      title: "User Guide",
      description: "Comprehensive guide to using TariffCalc Pro",
      type: "Guide",
      href: "#"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video walkthroughs",
      type: "Video",
      href: "#"
    },
    {
      icon: FileText,
      title: "API Documentation",
      description: "Technical documentation for developers",
      type: "Documentation",
      href: "/docs"
    },
    {
      icon: Download,
      title: "Sample Data",
      description: "Download sample datasets for testing",
      type: "Download",
      href: "#"
    }
  ]

  const contactOptions = [
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "Available 24/7",
      action: "Start Chat"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 4 hours",
      action: "Send Email"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our experts",
      availability: "Mon-Fri 9AM-6PM PST",
      action: "Call Now"
    }
  ]

  return (
    <div className="bg-background">
      <NavigationHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <HelpCircle className="h-3 w-3 mr-1" />
            Help Center
          </Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            How can we help you?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Find answers to common questions, learn how to use our platform, 
            and get support when you need it.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for help articles, guides, or FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3"
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{action.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {action.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button variant="ghost" size="sm" className="w-full justify-between">
                      Learn More
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <CardTitle>{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.questions.map((faq, faqIndex) => (
                      <div key={faqIndex} className="border-l-2 border-primary/20 pl-4">
                        <h4 className="font-medium mb-2">{faq.question}</h4>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {helpResources.map((resource, index) => {
                const Icon = resource.icon
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Icon className="h-6 w-6 text-primary" />
                        <div>
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                          <Badge variant="secondary" className="text-xs">
                            {resource.type}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        {resource.description}
                      </CardDescription>
                      <Button variant="outline" size="sm" className="w-full">
                        Access Resource
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Contact Support Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {contactOptions.map((option, index) => {
                const Icon = option.icon
                return (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{option.title}</CardTitle>
                      <CardDescription>{option.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Badge variant="outline" className="text-xs">
                          {option.availability}
                        </Badge>
                        <Button className="w-full">
                          {option.action}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Popular Articles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Popular Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">How to Calculate Tariffs</CardTitle>
                <CardDescription>
                  Step-by-step guide to using our tariff calculator
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  Read Article
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Understanding HTS Codes</CardTitle>
                <CardDescription>
                  Learn about Harmonized Tariff Schedule codes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  Read Article
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">Country Comparison Guide</CardTitle>
                <CardDescription>
                  How to compare tariffs across different countries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  Read Article
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
