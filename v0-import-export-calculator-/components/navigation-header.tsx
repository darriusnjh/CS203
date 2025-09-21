"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LoginDialog } from "@/components/login-dialog"
import { UserMenu } from "@/components/user-menu"
import { useAuth } from "@/components/auth-context"
import { Calculator, Globe, TrendingUp, Menu, X, Newspaper, MessageSquare, LogIn, UserPlus, ChevronDown, BookOpen, HelpCircle, FileText, Users, Mail, Shield, FileCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export function NavigationHeader() {
  const { user } = useAuth()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const resourcesItems = [
    {
      name: "News & Articles",
      href: "/news",
      icon: Newspaper,
      description: "Latest tariff news and articles"
    },
    {
      name: "Discussion Forum",
      href: "/forum",
      icon: MessageSquare,
      description: "Community discussions"
    },
    {
      name: "Help Centre",
      href: "/help",
      icon: HelpCircle,
      description: "Get help and support"
    },
    {
      name: "API Documentation",
      href: "/docs",
      icon: BookOpen,
      description: "Developer documentation"
    }
  ]

  const companyItems = [
    {
      name: "About Us",
      href: "/about",
      icon: Users,
      description: "Learn about our company"
    },
    {
      name: "Contact",
      href: "/contact",
      icon: Mail,
      description: "Get in touch with us"
    },
    {
      name: "Privacy Policy",
      href: "/privacy",
      icon: Shield,
      description: "Our privacy policy"
    },
    {
      name: "Terms of Services",
      href: "/terms",
      icon: FileCheck,
      description: "Terms and conditions"
    }
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">TariffCalc Pro</h1>
                <p className="text-sm text-muted-foreground hidden sm:block">Import Export Cost Calculator</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
            {/* Calculate Button */}
            <Link
              href="/"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                isActive("/")
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              )}
            >
              <Calculator className="h-4 w-4" />
              Calculate
            </Link>

            {/* Resources Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                Resources
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {activeDropdown === 'resources' && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-popover border rounded-md shadow-lg z-50">
                  <div className="p-1">
                    {resourcesItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
                        >
                          <Icon className="h-4 w-4" />
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-muted-foreground">{item.description}</div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('company')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                Company
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {activeDropdown === 'company' && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-popover border rounded-md shadow-lg z-50">
                  <div className="p-1">
                    {companyItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
                        >
                          <Icon className="h-4 w-4" />
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-muted-foreground">{item.description}</div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
            </nav>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <UserMenu />
            ) : (
              <div className="flex items-center gap-2">
                <LoginDialog />
                <Button variant="default" size="sm" asChild>
                  <Link href="/signup">
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <nav className="flex flex-col space-y-2">
              {/* Calculate */}
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive("/")
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                <Calculator className="h-5 w-5" />
                <div>
                  <div className="font-medium">Calculate</div>
                  <div className="text-xs text-muted-foreground">Tariff Calculator</div>
                </div>
              </Link>

              {/* Resources Section */}
              <div className="px-3 py-2">
                <div className="text-sm font-semibold text-foreground mb-2">Resources</div>
                <div className="ml-4 space-y-1">
                  {resourcesItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground text-muted-foreground"
                      >
                        <Icon className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Company Section */}
              <div className="px-3 py-2">
                <div className="text-sm font-semibold text-foreground mb-2">Company</div>
                <div className="ml-4 space-y-1">
                  {companyItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground text-muted-foreground"
                      >
                        <Icon className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
              
              {/* Mobile Auth Links */}
              {!user && (
                <div className="pt-4 border-t">
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                      <LogIn className="h-4 w-4" />
                      Login
                    </Button>
                    <Button variant="default" size="sm" asChild className="w-full justify-start gap-2">
                      <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        <UserPlus className="h-4 w-4" />
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
