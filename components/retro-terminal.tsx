"use client"

import { useState, useRef, useEffect } from "react"
import { useChat, SUGGESTED_PROMPTS } from "./chat-context"

const BOOT_LINES = [
    'BOOTING TEODORO_AI v2.0.0...',
    'LOADING KNOWLEDGE_BASE.......... OK',
    'LOADING CONTEXT_ENGINE.......... OK',
    'LOADING MEMORY_MODULES.......... OK',
    '────────────────────────────────────',
]

const BOOT_TIMINGS = [0, 300, 600, 900, 1100]
const BOOT_DONE_DELAY = 1400

export function RetroTerminal() {
    const [input, setInput] = useState("")
    const { messages, isLoading, sendMessage } = useChat()
    const scrollRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [bootPhase, setBootPhase] = useState(0) // 0 = booting, -1 = done
    const [visibleBootLines, setVisibleBootLines] = useState<string[]>([])

    // Boot sequence on mount
    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (prefersReduced) {
            setBootPhase(-1)
            return
        }

        const timers: ReturnType<typeof setTimeout>[] = []

        BOOT_TIMINGS.forEach((delay, index) => {
            timers.push(setTimeout(() => {
                setVisibleBootLines(prev => [...prev, BOOT_LINES[index]])
            }, delay))
        })

        timers.push(setTimeout(() => {
            setBootPhase(-1)
        }, BOOT_DONE_DELAY))

        return () => timers.forEach(clearTimeout)
    }, [])

    // Focus input when boot completes
    useEffect(() => {
        if (bootPhase === -1) {
            inputRef.current?.focus()
        }
    }, [bootPhase])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, isLoading])

    const isBooting = bootPhase >= 0
    const onlyGreeting = messages.length === 1 && messages[0].role === "system"

    const handleFocusInput = () => {
        if (!isBooting) inputRef.current?.focus()
    }

    const submit = async (question: string) => {
        if (!question || isLoading || isBooting) return
        setInput("")
        await sendMessage(question)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await submit(input.trim())
    }

    return (
        <div
            className="flex-1 bg-[hsl(var(--terminal-bg))] text-foreground font-mono flex flex-col overflow-hidden relative crt-effect cursor-text transition-colors duration-300"
            onClick={handleFocusInput}
            tabIndex={0}
            role="application"
            aria-label="Interactive terminal"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleFocusInput() }}
        >
            {/* Chat history / boot screen */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto whitespace-pre-wrap px-6 md:px-12 lg:px-24 py-6 custom-scrollbar scroll-smooth space-y-4"
                aria-live="polite"
                aria-atomic="false"
            >
                {isBooting ? (
                    <div className="text-foreground/70 space-y-1">
                        {visibleBootLines.map((line, i) => (
                            <div key={i}>{line}</div>
                        ))}
                        {visibleBootLines.length > 0 && (
                            <span className="animate-[blink_1s_infinite] text-[hsl(var(--terminal-accent))]">▋</span>
                        )}
                    </div>
                ) : (
                    <>
                        {messages.map((msg) => (
                            <div key={msg.id} className="text-sm md:text-base">
                                {msg.role === "system" && (
                                    <div className="text-foreground/80 border-b border-[hsl(var(--terminal-accent)/0.3)] pb-4 mb-2">
                                        {msg.content}
                                    </div>
                                )}
                                {msg.role === "user" && (
                                    <div className="flex">
                                        <span className="text-[hsl(var(--terminal-accent))] font-bold mr-2 shrink-0">
                                            {">"} YOU:
                                        </span>
                                        <span className="text-foreground">{msg.content}</span>
                                    </div>
                                )}
                                {msg.role === "assistant" && (
                                    <div className="flex">
                                        <span className="text-[hsl(var(--terminal-accent))] font-bold mr-2 shrink-0">
                                            {">"} AFONSO:
                                        </span>
                                        <span className="text-foreground">{msg.content}</span>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Suggested prompts (only on a fresh session) */}
                        {onlyGreeting && !isLoading && (
                            <div className="pt-2">
                                <p className="text-[10px] uppercase tracking-widest text-foreground/50 mb-3">
                                    SUGGESTED_QUERIES:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {SUGGESTED_PROMPTS.map((prompt) => (
                                        <button
                                            key={prompt}
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); submit(prompt) }}
                                            className="border border-[hsl(var(--terminal-accent)/0.5)] text-foreground/90 hover:bg-[hsl(var(--terminal-accent)/0.15)] hover:border-[hsl(var(--terminal-accent))] hover:text-foreground transition-colors px-3 py-1.5 text-xs md:text-sm font-mono"
                                        >
                                            {prompt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Typing indicator */}
                        {isLoading && (
                            <div className="flex items-center text-sm md:text-base">
                                <span className="text-[hsl(var(--terminal-accent))] font-bold mr-2 shrink-0">
                                    {">"} AFONSO:
                                </span>
                                <span className="inline-flex gap-1 text-[hsl(var(--terminal-accent))]">
                                    <span className="animate-[blink_1s_infinite_0ms]">▓</span>
                                    <span className="animate-[blink_1s_infinite_200ms]">▓</span>
                                    <span className="animate-[blink_1s_infinite_400ms]">▓</span>
                                    <span className="ml-2 opacity-50 text-[10px]">PROCESSING_QUERY...</span>
                                </span>
                            </div>
                        )}
                    </>
                )}
            </div>

            <span className="sr-only" aria-live="assertive">{isLoading ? "Processing query..." : ""}</span>

            {/* Input area */}
            <form
                onSubmit={handleSubmit}
                className="flex items-center relative z-10 bg-[hsl(var(--terminal-bg))] backdrop-blur-sm border-t border-[hsl(var(--terminal-accent)/0.3)] px-6 md:px-12 lg:px-24 py-4 transition-colors duration-300"
            >
                <span className="mr-3 text-[hsl(var(--terminal-accent))] font-bold animate-pulse text-lg">
                    {">"}
                </span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="bg-transparent border-none outline-none flex-1 text-foreground placeholder-foreground/30 text-base md:text-lg"
                    placeholder={isBooting ? "BOOTING_SYSTEM..." : isLoading ? "WAITING_FOR_RESPONSE..." : "ASK_ME_ANYTHING..."}
                    disabled={isLoading || isBooting}
                    aria-label="Terminal input"
                    autoFocus
                />
                <button
                    type="submit"
                    disabled={isLoading || isBooting || !input.trim()}
                    aria-label="Send message"
                    className="ml-3 text-[hsl(var(--terminal-accent))] font-bold opacity-60 hover:opacity-100 disabled:opacity-20 transition-opacity shrink-0"
                >
                    ↵
                </button>
            </form>
            {messages.length > 1 && !isBooting && (
                <div className="px-6 md:px-12 lg:px-24 pb-2 text-foreground/40 text-[10px] font-mono select-none">
                    [TYPE &apos;HELP&apos; FOR COMMANDS · &apos;CLEAR&apos; TO RESET]
                </div>
            )}
            <div className="scanline"></div>
        </div>
    )
}
