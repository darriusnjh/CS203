"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ariaLabels, roles, ariaAttributes, colorContrast, focusManagement } from "@/lib/accessibility"

// Standardized Game Card Component
interface GameCardProps {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  difficulty: "Easy" | "Medium" | "Hard"
  points: number
  estimatedTime: string
  category: string
  isNew?: boolean
  isDaily?: boolean
  onPlay: () => void
}

export function AccessibleGameCard({
  id,
  title,
  description,
  icon: Icon,
  difficulty,
  points,
  estimatedTime,
  category,
  isNew,
  isDaily,
  onPlay
}: GameCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Hard": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <Card 
      className={`hover:shadow-lg transition-shadow cursor-pointer group ${focusManagement.focusRing}`}
      role={roles.gridcell}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onPlay()
        }
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors" 
              aria-hidden="true"
            >
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription className="text-sm">
                {description}
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {isNew && (
              <Badge 
                variant="secondary" 
                className="text-xs" 
                aria-label={ariaLabels.newGame}
              >
                New
              </Badge>
            )}
            {isDaily && (
              <Badge 
                variant="default" 
                className="text-xs" 
                aria-label={ariaLabels.dailyChallenge}
              >
                Daily
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <Badge 
            className={getDifficultyColor(difficulty)} 
            aria-label={ariaLabels.difficulty(difficulty)}
          >
            {difficulty}
          </Badge>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <span aria-label={ariaLabels.points(points)}>{points} pts</span>
            </div>
            <div className="flex items-center gap-1">
              <span aria-label={ariaLabels.estimatedTime(estimatedTime)}>{estimatedTime}</span>
            </div>
          </div>
        </div>
        <Button 
          className="w-full" 
          size="sm" 
          onClick={onPlay}
          aria-label={ariaLabels.playGame(title)}
        >
          Play Game
        </Button>
      </CardContent>
    </Card>
  )
}

// Standardized Stats Card Component
interface StatsCardProps {
  label: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  color?: string
  progress?: number
  ariaLabel?: string
}

export function AccessibleStatsCard({
  label,
  value,
  icon: Icon,
  color = "text-primary",
  progress,
  ariaLabel
}: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg" aria-hidden="true">
            <Icon className={`h-5 w-5 ${color}`} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p 
              className="text-2xl font-bold" 
              aria-label={ariaLabel || `${value} ${label.toLowerCase()}`}
            >
              {value}
            </p>
          </div>
        </div>
        {progress !== undefined && (
          <Progress 
            value={progress} 
            className="mt-2" 
            aria-label={`${Math.round(progress)}% complete`}
          />
        )}
      </CardContent>
    </Card>
  )
}

// Standardized Progress Section Component
interface ProgressSectionProps {
  title: string
  description?: string
  current: number
  total: number
  ariaLabel?: string
}

export function AccessibleProgressSection({
  title,
  description,
  current,
  total,
  ariaLabel
}: ProgressSectionProps) {
  const progress = (current / total) * 100
  
  return (
    <section aria-label={ariaLabel || title}>
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>{title}</span>
        <span aria-label={`${current} of ${total}`}>{current}/{total}</span>
      </div>
      <Progress 
        value={progress} 
        className="h-2" 
        aria-label={`${Math.round(progress)}% complete`}
      />
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
    </section>
  )
}

// Standardized Button Component with Accessibility
interface AccessibleButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  ariaLabel?: string
  ariaDescribedby?: string
  type?: "button" | "submit" | "reset"
}

export function AccessibleButton({
  children,
  onClick,
  disabled = false,
  variant = "default",
  size = "default",
  className = "",
  ariaLabel,
  ariaDescribedby,
  type = "button"
}: AccessibleButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      size={size}
      type={type}
      className={`${focusManagement.focusRing} ${className}`}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
    >
      {children}
    </Button>
  )
}

// Standardized Badge Component with Accessibility
interface AccessibleBadgeProps {
  children: React.ReactNode
  variant?: "default" | "secondary" | "destructive" | "outline"
  className?: string
  ariaLabel?: string
}

export function AccessibleBadge({
  children,
  variant = "default",
  className = "",
  ariaLabel
}: AccessibleBadgeProps) {
  return (
    <Badge
      variant={variant}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </Badge>
  )
}

// Standardized Section Component
interface AccessibleSectionProps {
  children: React.ReactNode
  title?: string
  ariaLabel?: string
  className?: string
}

export function AccessibleSection({
  children,
  title,
  ariaLabel,
  className = ""
}: AccessibleSectionProps) {
  return (
    <section 
      className={className}
      aria-label={ariaLabel || title}
    >
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      {children}
    </section>
  )
}
