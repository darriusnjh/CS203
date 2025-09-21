"use client"

import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Scale, AlertTriangle, Shield, CreditCard, Users, Mail } from "lucide-react"

export default function TermsPage() {
  const lastUpdated = "December 15, 2024"

  const sections = [
    {
      icon: Users,
      title: "Acceptance of Terms",
      content: "By accessing and using TariffCalc Pro, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
    },
    {
      icon: Shield,
      title: "Use License",
      content: "Permission is granted to temporarily download one copy of TariffCalc Pro for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials."
    },
    {
      icon: AlertTriangle,
      title: "Disclaimer",
      content: "The materials on TariffCalc Pro are provided on an 'as is' basis. TariffCalc Pro makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
    },
    {
      icon: Scale,
      title: "Limitations",
      content: "In no event shall TariffCalc Pro or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on TariffCalc Pro, even if TariffCalc Pro or an authorized representative has been notified orally or in writing of the possibility of such damage."
    }
  ]

  const userObligations = [
    "Provide accurate and complete information when creating an account",
    "Maintain the confidentiality of your account credentials",
    "Use the service only for lawful purposes",
    "Not attempt to gain unauthorized access to our systems",
    "Comply with all applicable laws and regulations",
    "Not use the service to transmit harmful or malicious content",
    "Respect intellectual property rights of others"
  ]

  const prohibitedUses = [
    "Violating any applicable laws or regulations",
    "Transmitting or procuring the sending of spam or unsolicited messages",
    "Attempting to interfere with the proper functioning of the service",
    "Using automated systems to access the service without permission",
    "Reverse engineering or attempting to extract source code",
    "Using the service for any commercial purpose without authorization",
    "Collecting user information without consent"
  ]

  return (
    <div className="bg-background">
      <NavigationHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <FileText className="h-3 w-3 mr-1" />
            Terms of Service
          </Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            These terms govern your use of TariffCalc Pro. Please read them carefully 
            before using our platform.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Introduction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Welcome to TariffCalc Pro. These Terms of Service ("Terms") govern your use of our 
              tariff calculation platform and related services (collectively, the "Service") 
              operated by TariffCalc Pro ("us," "we," or "our").
            </p>
            <p className="text-muted-foreground">
              By accessing or using our Service, you agree to be bound by these Terms. 
              If you disagree with any part of these terms, then you may not access the Service.
            </p>
          </CardContent>
        </Card>

        {/* Main Sections */}
        <div className="space-y-8 mb-8">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{section.content}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* User Obligations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>User Obligations</CardTitle>
            <CardDescription>
              Your responsibilities when using our service
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userObligations.map((obligation, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2" />
                  <span className="text-sm text-muted-foreground">{obligation}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Prohibited Uses */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Prohibited Uses</CardTitle>
            <CardDescription>
              Activities that are not allowed on our platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {prohibitedUses.map((use, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-destructive rounded-full mt-2" />
                  <span className="text-sm text-muted-foreground">{use}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Terms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Payment Terms
            </CardTitle>
            <CardDescription>
              Information about subscriptions and billing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Subscription Fees</h4>
                <p className="text-sm text-muted-foreground">
                  Access to premium features requires a paid subscription. Fees are billed in advance 
                  on a monthly or annual basis as selected during signup.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Payment Processing</h4>
                <p className="text-sm text-muted-foreground">
                  All payments are processed securely through our third-party payment processors. 
                  We accept major credit cards and other payment methods as available.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Refunds</h4>
                <p className="text-sm text-muted-foreground">
                  Refunds are handled on a case-by-case basis. Generally, refunds are not provided 
                  for partial months or unused portions of subscriptions.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Price Changes</h4>
                <p className="text-sm text-muted-foreground">
                  We reserve the right to modify subscription prices with 30 days' notice to existing subscribers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Intellectual Property */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Intellectual Property</CardTitle>
            <CardDescription>
              Ownership and usage rights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Our Content</h4>
                <p className="text-sm text-muted-foreground">
                  The Service and its original content, features, and functionality are and will remain 
                  the exclusive property of TariffCalc Pro and its licensors.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">User Content</h4>
                <p className="text-sm text-muted-foreground">
                  You retain ownership of any content you submit to the Service. By submitting content, 
                  you grant us a license to use, modify, and display such content in connection with the Service.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Trademarks</h4>
                <p className="text-sm text-muted-foreground">
                  TariffCalc Pro and related trademarks are our property and may not be used without our written permission.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Termination */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Termination</CardTitle>
            <CardDescription>
              How accounts can be terminated
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Termination by You</h4>
                <p className="text-sm text-muted-foreground">
                  You may terminate your account at any time by contacting our support team or using 
                  the account deletion feature in your settings.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Termination by Us</h4>
                <p className="text-sm text-muted-foreground">
                  We may terminate or suspend your account immediately, without prior notice, for conduct 
                  that we believe violates these Terms or is harmful to other users, us, or third parties.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Effect of Termination</h4>
                <p className="text-sm text-muted-foreground">
                  Upon termination, your right to use the Service will cease immediately. 
                  We may delete your account and data in accordance with our Privacy Policy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimers */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Disclaimers</CardTitle>
            <CardDescription>
              Important limitations and disclaimers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Service Availability</h4>
                <p className="text-sm text-muted-foreground">
                  We strive to maintain high service availability but do not guarantee uninterrupted access. 
                  The Service may be temporarily unavailable due to maintenance or technical issues.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Accuracy of Calculations</h4>
                <p className="text-sm text-muted-foreground">
                  While we strive for accuracy, tariff calculations are estimates based on available data. 
                  Users should verify calculations with official sources for critical business decisions.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Third-Party Services</h4>
                <p className="text-sm text-muted-foreground">
                  Our Service may integrate with third-party services. We are not responsible for 
                  the availability or accuracy of such third-party services.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Governing Law</CardTitle>
            <CardDescription>
              Legal jurisdiction and dispute resolution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Applicable Law</h4>
                <p className="text-sm text-muted-foreground">
                  These Terms shall be interpreted and governed by the laws of the State of California, 
                  United States, without regard to its conflict of law provisions.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Dispute Resolution</h4>
                <p className="text-sm text-muted-foreground">
                  Any disputes arising from these Terms or your use of the Service shall be resolved 
                  through binding arbitration in accordance with the rules of the American Arbitration Association.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Jurisdiction</h4>
                <p className="text-sm text-muted-foreground">
                  Any legal action or proceeding arising under these Terms will be brought exclusively 
                  in the courts of San Francisco County, California.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Changes to Terms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Changes to Terms</CardTitle>
            <CardDescription>
              How we handle updates to these terms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
            </p>
            <p className="text-muted-foreground">
              Your continued use of the Service after any such changes constitutes your acceptance of the new Terms. 
              If you do not agree to the new terms, please stop using the Service.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Questions about these Terms?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-1">
                <p className="text-sm">
                  <strong>Email:</strong>{" "}
                  <a href="mailto:legal@tariffcalc.com" className="text-primary hover:underline">
                    legal@tariffcalc.com
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
