"use client"

import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calculator, Globe, TrendingUp, Users, Target, Award, CheckCircle } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: Calculator,
      title: "Accurate Calculations",
      description: "Real-time tariff calculations using official trade data and regulations"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Support for 200+ countries and territories worldwide"
    },
    {
      icon: TrendingUp,
      title: "Market Analysis",
      description: "Compare tariffs across different countries and trade routes"
    },
    {
      icon: Users,
      title: "Expert Community",
      description: "Connect with trade professionals and industry experts"
    }
  ]

  const stats = [
    { label: "Countries Covered", value: "200+" },
    { label: "HTS Codes", value: "10,000+" },
    { label: "Active Users", value: "50,000+" },
    { label: "Calculations Daily", value: "100,000+" }
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      description: "15+ years in international trade and customs compliance"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      description: "Expert in trade data systems and API development"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      description: "Former customs broker with deep industry knowledge"
    },
    {
      name: "David Kim",
      role: "Lead Developer",
      description: "Full-stack developer specializing in trade applications"
    }
  ]

  return (
    <div className="bg-background">
      <NavigationHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Target className="h-3 w-3 mr-1" />
            About TariffCalc Pro
          </Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Empowering Global Trade
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            TariffCalc Pro is the leading platform for import/export cost calculations, 
            helping businesses navigate complex international trade regulations with confidence.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-lg text-muted-foreground max-w-4xl mx-auto">
              To simplify international trade by providing accurate, real-time tariff calculations 
              and comprehensive trade intelligence that empowers businesses to make informed decisions 
              and optimize their global supply chains.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose TariffCalc Pro?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-2">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Stats Section */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle>Platform Statistics</CardTitle>
            <CardDescription>Trusted by businesses worldwide</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index}>
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge variant="secondary">{member.role}</Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {member.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Values */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Our Values</CardTitle>
            <CardDescription>What drives us every day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Accuracy</h3>
                <p className="text-sm text-muted-foreground">
                  We ensure every calculation is precise and up-to-date with current regulations.
                </p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  Clear, detailed breakdowns help you understand every cost component.
                </p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  Continuously improving our platform with cutting-edge technology.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
