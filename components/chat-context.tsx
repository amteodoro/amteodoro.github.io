"use client"

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from "react"

export interface ChatMessage {
    id: string
    role: "user" | "assistant" | "system"
    content: string
}

const INITIAL_GREETING: ChatMessage = {
    id: crypto.randomUUID(),
    role: "system",
    content:
        "KNOWLEDGE_ENGINE ONLINE\n\nWelcome! I'm Afonso Teodoro — AI Consultant & PhD.\nAsk me anything about my work, skills, research, or experience.\nType 'help' for commands, 'topics' for what I know about, or 'clear' to reset.\n\nTip: Switch to [PORTFOLIO] above to see my full profile.",
}

const API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL ?? null

export const SUGGESTED_PROMPTS = [
    "What's your PhD about?",
    "Show me your featured projects",
    "Which AI skills do you specialize in?",
    "How can I get in touch?",
] as const

const HELP_TEXT = `AVAILABLE_COMMANDS:
- help     show this help
- topics   list what I can answer about
- clear    reset the conversation

Or just ask a question in plain English.`

const TOPICS_TEXT = `I CAN ANSWER ABOUT:
- about / identity
- experience (Nimble Portal, Instituto de Telecomunicações, INESC-ID)
- education and PhD
- projects (Nomly, Portugal Fire Detection, RetroReps.fit)
- publications and research
- skills (computer vision, NLP, GenAI, MLOps, frontend)
- contact

Ask anything in those areas, or try a suggested prompt above.`

// Keep the request body small — the worker also caps this.
const MAX_HISTORY_TURNS = 8

interface ChatContextType {
    messages: ChatMessage[]
    isLoading: boolean
    isOffline: boolean
    sendMessage: (question: string) => Promise<void>
    clearMessages: () => void
}

const ChatContext = createContext<ChatContextType | null>(null)

export function ChatProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING])
    const [isLoading, setIsLoading] = useState(false)
    const isLoadingRef = useRef(false)
    const messagesRef = useRef<ChatMessage[]>([INITIAL_GREETING])
    messagesRef.current = messages

    const isOffline = !API_URL

    const clearMessages = useCallback(() => {
        setMessages([INITIAL_GREETING])
    }, [])

    const appendAssistant = (content: string) => {
        setMessages(prev => [...prev, { id: crypto.randomUUID(), role: "assistant", content }])
    }

    const sendMessage = useCallback(async (question: string) => {
        const trimmed = question.trim()
        if (!trimmed || isLoadingRef.current) return

        const lower = trimmed.toLowerCase()

        // Local commands — keep them frontend-only so they work offline.
        if (lower === "clear") {
            setMessages([INITIAL_GREETING])
            return
        }
        if (lower === "help" || lower === "/help") {
            setMessages(prev => [
                ...prev,
                { id: crypto.randomUUID(), role: "user", content: trimmed },
                { id: crypto.randomUUID(), role: "assistant", content: HELP_TEXT },
            ])
            return
        }
        if (lower === "topics" || lower === "/topics") {
            setMessages(prev => [
                ...prev,
                { id: crypto.randomUUID(), role: "user", content: trimmed },
                { id: crypto.randomUUID(), role: "assistant", content: TOPICS_TEXT },
            ])
            return
        }

        if (!API_URL) {
            setMessages(prev => [
                ...prev,
                { id: crypto.randomUUID(), role: "user", content: trimmed },
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content: "CHATBOT_OFFLINE: Knowledge engine not configured. Contact me directly at afonso.teodoro91@gmail.com.",
                },
            ])
            return
        }

        const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", content: trimmed }
        setMessages(prev => [...prev, userMessage])
        setIsLoading(true)
        isLoadingRef.current = true

        // Snapshot history BEFORE the new user message so the worker sees prior turns only.
        const history = messagesRef.current
            .filter(m => m.role === "user" || m.role === "assistant")
            .slice(-MAX_HISTORY_TURNS)
            .map(m => ({ role: m.role, content: m.content }))

        try {
            const res = await fetch(`${API_URL}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: trimmed, history }),
            })

            if (!res.ok) {
                throw new Error(`API returned ${res.status}`)
            }

            const data = await res.json()
            appendAssistant(data.answer)
        } catch {
            appendAssistant(
                "CONNECTION_ERROR: Unable to reach the knowledge engine. Please try again later or contact me directly at afonso.teodoro91@gmail.com.",
            )
        } finally {
            setIsLoading(false)
            isLoadingRef.current = false
        }
    }, [])

    return (
        <ChatContext.Provider value={{ messages, isLoading, isOffline, sendMessage, clearMessages }}>
            {children}
        </ChatContext.Provider>
    )
}

export function useChat() {
    const context = useContext(ChatContext)
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider")
    }
    return context
}
