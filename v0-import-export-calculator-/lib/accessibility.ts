/**
 * Accessibility utilities for consistent UI implementation
 */

// Standard ARIA labels for common UI patterns
export const ariaLabels = {
  // Navigation
  backToGames: "Return to games page",
  playGame: (gameTitle: string) => `Play ${gameTitle}`,
  
  // Statistics
  totalPoints: (points: number) => `${points.toLocaleString()} total points`,
  gamesPlayed: (count: number) => `${count} games played`,
  currentStreak: (days: number) => `${days} day streak`,
  globalRank: (rank: number) => `Rank ${rank}`,
  
  // Progress
  progressComplete: (percentage: number) => `${Math.round(percentage)}% complete`,
  questionProgress: (current: number, total: number) => `Question ${current} of ${total}`,
  timeSpent: (time: string) => `Time spent: ${time}`,
  pointsAvailable: (points: number) => `${points} points available`,
  
  // Game elements
  difficulty: (level: string) => `Difficulty: ${level}`,
  category: (cat: string) => `Category: ${cat}`,
  estimatedTime: (time: string) => `Estimated time: ${time}`,
  points: (points: number) => `${points} points`,
  
  // Badges and status
  newGame: "New game",
  dailyChallenge: "Daily challenge",
  
  // Actions
  submitAnswer: "Submit your selected answer",
  nextQuestion: "Go to next question",
  finishQuiz: "Finish quiz",
  restartGame: "Restart game",
  retakeQuiz: "Retake quiz",
  
  // Results
  perfectScore: "Perfect score achieved",
  correctAnswer: "Correct answer",
  wrongAnswer: "Incorrect answer",
  explanation: "Answer explanation"
}

// Standard roles for semantic HTML
export const roles = {
  main: "main",
  navigation: "navigation",
  banner: "banner",
  contentinfo: "contentinfo",
  region: "region",
  tablist: "tablist",
  tab: "tab",
  tabpanel: "tabpanel",
  grid: "grid",
  gridcell: "gridcell",
  button: "button",
  progressbar: "progressbar",
  status: "status",
  alert: "alert"
}

// Standard ARIA attributes
export const ariaAttributes = {
  hidden: "aria-hidden",
  label: "aria-label",
  describedby: "aria-describedby",
  pressed: "aria-pressed",
  selected: "aria-selected",
  expanded: "aria-expanded",
  controls: "aria-controls",
  owns: "aria-owns",
  live: "aria-live",
  atomic: "aria-atomic"
}

// Focus management utilities
export const focusManagement = {
  // Standard focus classes
  focusVisible: "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  focusRing: "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  
  // Skip link for keyboard navigation
  skipLink: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
}

// Color contrast utilities
export const colorContrast = {
  // Ensure sufficient contrast ratios
  text: {
    primary: "text-foreground",
    secondary: "text-muted-foreground",
    accent: "text-accent-foreground"
  },
  
  // Status colors with proper contrast
  status: {
    success: "text-green-700 dark:text-green-300",
    error: "text-red-700 dark:text-red-300",
    warning: "text-yellow-700 dark:text-yellow-300",
    info: "text-blue-700 dark:text-blue-300"
  },
  
  // Background colors
  background: {
    success: "bg-green-50 dark:bg-green-900/20",
    error: "bg-red-50 dark:bg-red-900/20",
    warning: "bg-yellow-50 dark:bg-yellow-900/20",
    info: "bg-blue-50 dark:bg-blue-900/20"
  }
}

// Screen reader utilities
export const screenReader = {
  // Hide decorative elements
  srOnly: "sr-only",
  notSrOnly: "not-sr-only",
  
  // Announcements
  announce: (message: string) => ({
    [ariaAttributes.live]: "polite",
    [ariaAttributes.atomic]: "true",
    "aria-label": message
  })
}

// Keyboard navigation utilities
export const keyboardNavigation = {
  // Standard keyboard event handlers
  onKeyDown: (callback: (event: React.KeyboardEvent) => void) => ({
    onKeyDown: (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        callback(event)
      }
    }
  }),
  
  // Arrow key navigation
  arrowKeys: {
    onKeyDown: (callback: (direction: 'up' | 'down' | 'left' | 'right') => void) => ({
      onKeyDown: (event: React.KeyboardEvent) => {
        switch (event.key) {
          case 'ArrowUp':
            event.preventDefault()
            callback('up')
            break
          case 'ArrowDown':
            event.preventDefault()
            callback('down')
            break
          case 'ArrowLeft':
            event.preventDefault()
            callback('left')
            break
          case 'ArrowRight':
            event.preventDefault()
            callback('right')
            break
        }
      }
    })
  }
}

// Form accessibility utilities
export const formAccessibility = {
  // Required field indicators
  required: (label: string) => `${label} (required)`,
  
  // Error messages
  errorMessage: (field: string, message: string) => `${field}: ${message}`,
  
  // Field descriptions
  fieldDescription: (field: string, description: string) => `${field} - ${description}`
}

// Animation and motion preferences
export const motionPreferences = {
  // Respect user's motion preferences
  reducedMotion: "motion-reduce:transition-none motion-reduce:animate-none",
  
  // Safe animations
  safeTransition: "transition-colors duration-200 ease-in-out",
  safeHover: "hover:scale-105 hover:shadow-lg transition-all duration-200"
}
