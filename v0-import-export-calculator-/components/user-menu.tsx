"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from './auth-context'
import { User, LogOut, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function UserMenu() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleAccountClick = () => {
    router.push('/account')
  }

  const handleSettingsClick = () => {
    router.push('/settings')
  }

  const handleLogout = () => {
    logout()
  }

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0 hover:bg-transparent focus:bg-transparent">
          <Avatar className="h-8 w-8 ring-0 border-0">
            <AvatarImage src="/placeholder-user.jpg" alt={user.username || 'User'} />
            <AvatarFallback className="bg-muted text-muted-foreground">
              {user.username ? user.username.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {/* {user.email} */}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleAccountClick}>
          <User className="mr-2 h-4 w-4" />
          <span>Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSettingsClick}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
