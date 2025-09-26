"use client"

import { useAuth } from '@/components/auth-context'
import { NavigationHeader } from '@/components/navigation-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { User, Mail, Calendar, Shield, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AccountPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="bg-background">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Account Settings</h1>
            <p className="text-muted-foreground text-base sm:text-lg">
              Manage your account information and preferences
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Your personal account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder-user.jpg" alt={user.username || 'User'} />
                    <AvatarFallback className="text-lg">
                      {user.username ? user.username.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left">
                    <h3 className="font-semibold text-lg">{user.username || 'User'}</h3>
                    <Badge variant="secondary">Standard</Badge>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Member Since</p>
                      <p className="text-sm text-muted-foreground">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        }) : 'Unknown'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">User ID</p>
                      <p className="text-sm text-muted-foreground font-mono">
                        {user.user_id ? user.user_id.slice(0, 8) + '...' : 'Unknown'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Account Status</p>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Active
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => router.push('/settings')}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => router.push('/settings')}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    disabled
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Notification Settings
                    <Badge variant="secondary" className="ml-auto text-xs">Soon</Badge>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    disabled
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Privacy Settings
                    <Badge variant="secondary" className="ml-auto text-xs">Soon</Badge>
                  </Button>
                </div>
                <Separator />
                <Button 
                  variant="destructive" 
                  className="w-full justify-start gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Additional details about your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Last Updated</p>
                        <p className="text-sm text-muted-foreground">
                          {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          }) : 'Unknown'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Account Type</p>
                        <Badge variant="secondary">Standard</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Username</p>
                        <p className="text-sm text-muted-foreground font-mono">
                          {user.username || 'Unknown'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">
                          Not provided
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
