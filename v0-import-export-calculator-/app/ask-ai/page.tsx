"use client"

import { useState, useRef, useEffect } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, Plus } from "lucide-react"
import { useAuth } from "@/components/auth-context"
import { toast } from "sonner"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

type ChatTurn = { role: "user" | "assistant"; content: string }

export default function AskAIPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [history, setHistory] = useState<ChatTurn[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth"
      })
    }
  }

  // Only auto-scroll when new messages are added, not on every render
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
  }, [messages.length])

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = inputRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
    }
  }, [inputValue])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
    }

    try {
      // maintain running conversation history
      const nextHistory: ChatTurn[] = [...history, { role: "user" as const, content: userMessage.content }]
      setHistory(nextHistory)

      const res = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content, history: nextHistory })
      })

      const contentType = res.headers.get("content-type") || ""
      let replyText = ""
      if (contentType.includes("text/plain")) {
        replyText = await res.text()
      } else {
        const data = await res.json()
        // Prefer plain string or DTO first
        if (typeof data === "string") {
          replyText = data
        } else if (data && typeof data === "object") {
          // Responses API: take LAST assistant message.output_text
          const msgs = Array.isArray(data.output)
            ? data.output.filter((m: any) => m?.type === "message")
            : []
          const lastMsg = msgs.length ? msgs[msgs.length - 1] : null
          const lastText = lastMsg && Array.isArray(lastMsg.content)
            ? lastMsg.content.find((c: any) => c?.type === "output_text")?.text
            : undefined
          replyText = data.aiResponse ?? data.output_text ?? lastText ?? JSON.stringify(data)
        }
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: replyText || "",
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
      // append assistant reply to history
      setHistory(prev => [...prev, { role: "assistant" as const, content: aiMessage.content }])
    } catch (error) {
      toast.error("Failed to get AI response")
      console.error("AI API error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      e.stopPropagation()
      handleSendMessage()
    }
  }



  const startNewChat = () => {
    setMessages([])
    setHistory([])
    toast.success("New chat started")
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Bot className="h-8 w-8 text-primary" />
              Ask AI
            </h1>
            <p className="text-muted-foreground mt-2">Get help with tariff calculations and trade questions</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={startNewChat}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              New Chat
            </Button>
          </div>
        </div>

        {/* Chat Container */}
        <Card className="flex flex-col" style={{ height: 'calc(100vh - 300px)' }}>
          <CardContent className="flex-1 flex flex-col p-0" style={{ minHeight: 0 }}>
            {/* Messages Area */}
            <div 
              className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth" 
              ref={messagesContainerRef}
              style={{ maxHeight: '100%', overflowY: 'auto' }}
            >
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Bot className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Ready when you are.</h3>
                  <p className="text-muted-foreground max-w-md">
                    Ask me anything about tariffs, trade calculations, HTS codes, or import/export processes.
                  </p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!message.isUser && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        message.isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <div className="text-sm break-words">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                      </div>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    
                    {message.isUser && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary text-secondary-foreground">
                          {user?.email?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))
              )}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                      <span className="text-sm text-muted-foreground">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>

        {/* Input Area - Fixed at bottom of page */}
        <div className="border-t bg-background p-4">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Textarea
                    ref={inputRef}
                    placeholder="Ask anything..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    className="min-h-[40px] max-h-[120px] resize-none overflow-hidden border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    rows={1}
                    style={{ height: '40px' }}
                  />
                </div>
                
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  size="sm"
                  className="flex items-center gap-2 h-10"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                <span>Press Enter to send, Shift+Enter for new line</span>
                <span>{messages.length} messages</span>
              </div>
            </div>
      </div>
    </div>
  )
}
