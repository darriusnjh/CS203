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
        <Avatar 
          className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="User menu"
          role="button"
          tabIndex={0}
        >
          <AvatarImage src="/placeholder-user.jpg" alt={user.username || 'User'} />
          <AvatarFallback className="bg-muted text-muted-foreground">
            {user.username ? user.username.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56" 
        align="end" 
        forceMount 
        sideOffset={5}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {/* {user.email} */}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleAccountClick} 
          onSelect={(e) => e.preventDefault()}
          className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
        >
          <User className="mr-2 h-4 w-4" />
          <span>Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleSettingsClick} 
          onSelect={(e) => e.preventDefault()}
          className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout} 
          onSelect={(e) => e.preventDefault()}
          className="cursor-pointer focus:bg-accent focus:text-accent-foreground text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
