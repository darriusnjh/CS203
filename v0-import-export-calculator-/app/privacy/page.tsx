"use client"

import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, Lock, Database, Users, Mail, Calendar } from "lucide-react"

export default function PrivacyPage() {
  const lastUpdated = "December 15, 2024"

  const dataTypes = [
    {
      icon: Users,
      title: "Account Information",
      description: "Name, email, company details, and profile information"
    },
    {
      icon: Database,
      title: "Usage Data",
      description: "How you interact with our platform and features"
    },
    {
      icon: Mail,
      title: "Communication",
      description: "Messages, support tickets, and feedback you send us"
    },
    {
      icon: Calendar,
      title: "Transaction Data",
      description: "Payment information and subscription details"
    }
  ]

  const rights = [
    "Access your personal data",
    "Correct inaccurate information",
    "Delete your account and data",
    "Export your data",
    "Object to data processing",
    "Withdraw consent at any time"
  ]

  return (
    <div className="bg-background">
      <NavigationHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Shield className="h-3 w-3 mr-1" />
            Privacy Policy
          </Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how TariffCalc Pro collects, 
            uses, and protects your personal information.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </div>
        </div>

        {/* Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              TariffCalc Pro ("we," "our," or "us") is committed to protecting your privacy and personal information. 
              This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you 
              use our tariff calculation platform and related services.
            </p>
            <p className="text-muted-foreground">
              By using our services, you agree to the collection and use of information in accordance with this policy. 
              If you do not agree with our policies and practices, please do not use our services.
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Information We Collect
            </CardTitle>
            <CardDescription>
              We collect information you provide directly and automatically when using our services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {dataTypes.map((type, index) => {
                const Icon = type.icon
                return (
                  <div key={index} className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium mb-1">{type.title}</h4>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* How We Use Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How We Use Your Information</CardTitle>
            <CardDescription>
              We use your information to provide and improve our services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Service Provision</h4>
                <p className="text-sm text-muted-foreground">
                  To provide tariff calculations, country comparisons, and other platform features you request.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Account Management</h4>
                <p className="text-sm text-muted-foreground">
                  To create and manage your account, process payments, and provide customer support.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Communication</h4>
                <p className="text-sm text-muted-foreground">
                  To send you important updates, newsletters, and respond to your inquiries.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Analytics & Improvement</h4>
                <p className="text-sm text-muted-foreground">
                  To analyze usage patterns and improve our platform's functionality and user experience.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Legal Compliance</h4>
                <p className="text-sm text-muted-foreground">
                  To comply with legal obligations and protect our rights and interests.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Information Sharing */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Information Sharing and Disclosure</CardTitle>
            <CardDescription>
              We do not sell your personal information to third parties
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Service Providers</h4>
                <p className="text-sm text-muted-foreground">
                  We may share information with trusted third-party service providers who assist us in operating our platform, 
                  such as payment processors, cloud hosting providers, and analytics services.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Legal Requirements</h4>
                <p className="text-sm text-muted-foreground">
                  We may disclose information if required by law, court order, or to protect our rights and the safety of our users.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Business Transfers</h4>
                <p className="text-sm text-muted-foreground">
                  In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of the transaction.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Consent</h4>
                <p className="text-sm text-muted-foreground">
                  We may share information with your explicit consent for specific purposes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Data Security
            </CardTitle>
            <CardDescription>
              We implement industry-standard security measures to protect your information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Encryption</h4>
                <p className="text-sm text-muted-foreground">
                  All data is encrypted in transit and at rest using industry-standard encryption protocols.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Access Controls</h4>
                <p className="text-sm text-muted-foreground">
                  Strict access controls ensure only authorized personnel can access your information.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Regular Audits</h4>
                <p className="text-sm text-muted-foreground">
                  We conduct regular security audits and assessments to maintain the highest security standards.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Incident Response</h4>
                <p className="text-sm text-muted-foreground">
                  We have procedures in place to respond quickly to any security incidents.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Privacy Rights</CardTitle>
            <CardDescription>
              You have certain rights regarding your personal information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {rights.map((right, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span className="text-sm">{right}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                To exercise any of these rights, please contact us at{" "}
                <a href="mailto:privacy@tariffcalc.com" className="text-primary hover:underline">
                  privacy@tariffcalc.com
                </a>
                . We will respond to your request within 30 days.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Cookies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Cookies and Tracking Technologies</CardTitle>
            <CardDescription>
              We use cookies and similar technologies to enhance your experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Essential Cookies</h4>
                <p className="text-sm text-muted-foreground">
                  Required for the platform to function properly, including authentication and security features.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Analytics Cookies</h4>
                <p className="text-sm text-muted-foreground">
                  Help us understand how you use our platform to improve performance and user experience.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Preference Cookies</h4>
                <p className="text-sm text-muted-foreground">
                  Remember your settings and preferences, such as theme selection and language preferences.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>
              Questions about this Privacy Policy?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-1">
                <p className="text-sm">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:privacy@tariffcalc.com" className="text-primary hover:underline">
                    privacy@tariffcalc.com
                  </a>
                </p>
                <p className="text-sm">
                  <strong>Address:</strong> TariffCalc Pro, San Francisco, CA
                </p>
                <p className="text-sm">
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
