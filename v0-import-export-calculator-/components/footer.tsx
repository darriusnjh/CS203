"use client"

import Link from "next/link"
import { Calculator, Globe, TrendingUp, Newspaper, MessageSquare, User, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/components/auth-context"

export function Footer() {
  const { user } = useAuth()

  const currentYear = new Date().getFullYear()

  const navigationSections = [
    {
      title: "Features",
      links: [
        { name: "Tariff Calculator", href: "/", icon: Calculator },
        { name: "Country Comparison", href: "/", icon: TrendingUp },
        { name: "World Map View", href: "/", icon: Globe },
        { name: "HTS Code Lookup", href: "/", icon: TrendingUp }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "News & Articles", href: "/news", icon: Newspaper },
        { name: "Discussion Forum", href: "/forum", icon: MessageSquare },
        { name: "Help Center", href: "/help", icon: MessageSquare },
        { name: "API Documentation", href: "/docs", icon: TrendingUp }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about", icon: TrendingUp },
        { name: "Contact", href: "/contact", icon: Mail },
        { name: "Privacy Policy", href: "/privacy", icon: TrendingUp },
        { name: "Terms of Service", href: "/terms", icon: TrendingUp }
      ]
    }
  ]

  const socialLinks = [
    { name: "Facebook", href: "#", icon: Facebook },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "GitHub", href: "#", icon: Github }
  ]

  const contactInfo = [
    { icon: Mail, text: "support@tariffcalc.com", href: "mailto:support@tariffcalc.com" },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, text: "San Francisco, CA", href: "#" }
  ]

  return (
    <footer className="bg-card border-t border-border/50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">TariffCalc Pro</h3>
                <p className="text-sm text-muted-foreground">Import Export Cost Calculator</p>
              </div>
            </Link>
            
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Professional tariff calculation tool for businesses. Get accurate cost estimates, 
              compare countries, and visualize global trade costs with our comprehensive platform.
            </p>

            {/* Contact Information */}
            <div className="space-y-2">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon
                return (
                  <a
                    key={index}
                    href={contact.href}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    {contact.text}
                  </a>
                )
              })}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="p-2 rounded-lg bg-muted hover:bg-accent transition-colors group"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Navigation Sections */}
          {navigationSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-semibold text-foreground">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => {
                  const Icon = link.icon
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                      >
                        <Icon className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-border/50 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Stay Updated</h4>
              <p className="text-sm text-muted-foreground">
                Get the latest tariff updates and trade news delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <Button size="sm" className="gap-2">
                Subscribe
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>© {currentYear} TariffCalc Pro. All rights reserved.</span>
              <div className="hidden sm:flex items-center gap-4">
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* User Account Link */}
              {user ? (
                <Link href="/account">
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-3 w-3" />
                    Account
                  </Button>
                </Link>
              ) : (
                <Link href="/signup">
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-3 w-3" />
                    Sign Up
                  </Button>
                </Link>
              )}
            </div>
          </div>
          
          {/* Mobile Links */}
          <div className="sm:hidden mt-4 pt-4 border-t border-border/50">
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
