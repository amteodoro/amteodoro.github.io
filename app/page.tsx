"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Mail,
  Linkedin,
  Github,
  GraduationCap,
  Zap,
  Code,
  Briefcase,
  FlaskRoundIcon as Flask,
  Microscope,
  GitBranch,
  Terminal,
  User,
} from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { RetroTerminal } from "@/components/retro-terminal"
import { ChatProvider } from "@/components/chat-context"

type ViewMode = "terminal" | "portfolio"

function TabBar({ activeView, setActiveView }: { activeView: ViewMode; setActiveView: (v: ViewMode) => void }) {
  const isOffline = !process.env.NEXT_PUBLIC_CHATBOT_API_URL
  const tabTerminalRef = useRef<HTMLButtonElement>(null)
  const tabPortfolioRef = useRef<HTMLButtonElement>(null)

  const handleTablistKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "End") {
      e.preventDefault()
      setActiveView("portfolio")
      tabPortfolioRef.current?.focus()
    } else if (e.key === "ArrowLeft" || e.key === "Home") {
      e.preventDefault()
      setActiveView("terminal")
      tabTerminalRef.current?.focus()
    }
  }

  const isTerminal = activeView === "terminal"
    const navBg = isTerminal ? "bg-terminal-bg border-terminal-accent/40" : "bg-background border-foreground/30"
    const tabBase = "flex items-center gap-2 px-4 md:px-6 h-full font-mono text-xs md:text-sm font-bold uppercase tracking-wider transition-[background-color,color,border-color] duration-200"
    const tabBorder = isTerminal ? "border-r border-terminal-accent/20" : "border-r border-foreground/20"
    const activeTab = isTerminal
      ? "bg-terminal-accent/15 text-terminal-accent border-b-2 border-b-terminal-accent -mb-[2px]"
      : "bg-foreground/10 text-foreground border-b-2 border-b-foreground -mb-[2px]"
    const inactiveTab = isTerminal
      ? "text-terminal-accent/80 hover:text-terminal-accent hover:bg-terminal-accent/5"
      : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
    const statusColor = isTerminal ? "text-terminal-accent/50" : "text-foreground/50"
    const onlineDot = isTerminal ? "bg-terminal-accent animate-pulse" : "bg-foreground animate-pulse"

    return (
      <header className={`fixed w-full top-0 z-50 border-b-2 ${navBg}`}>
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-between h-12 px-4 md:px-6">
            {/* Left: Tab buttons */}
            <div className="flex items-center h-full" role="tablist" aria-label="Navigation" onKeyDown={handleTablistKeyDown}>
              <button
                ref={tabTerminalRef}
                id="tab-terminal"
                onClick={() => setActiveView("terminal")}
                role="tab"
                aria-selected={activeView === "terminal"}
                aria-controls="panel-terminal"
                className={`${tabBase} ${tabBorder} ${activeView === "terminal" ? activeTab : inactiveTab}`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">TERMINAL</span>
              </button>
              <button
                ref={tabPortfolioRef}
                id="tab-portfolio"
                onClick={() => setActiveView("portfolio")}
                role="tab"
                aria-selected={activeView === "portfolio"}
                aria-controls="panel-portfolio"
                className={`${tabBase} ${tabBorder} ${activeView === "portfolio" ? activeTab : inactiveTab}`}
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">PORTFOLIO</span>
              </button>
            </div>

            {/* Right: Status indicators */}
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-1.5 font-mono text-[10px] ${statusColor}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isOffline ? 'bg-destructive' : onlineDot}`} />
                <span className="hidden sm:inline">{isOffline ? 'OFFLINE' : 'ONLINE'}</span>
              </div>
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>
    )
}

function PortfolioView({ isActive }: { isActive: boolean }) {
  return (
    <div id="panel-portfolio" role="tabpanel" aria-labelledby="tab-portfolio" tabIndex={isActive ? 0 : -1} className={`min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background pt-12 ${!isActive ? "hidden" : ""}`}>
      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center pt-20 pb-24 overflow-hidden border-b-4 border-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="text-left space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.8] tracking-tighter uppercase font-display break-words [overflow-wrap:anywhere]">
                  AFONSO TEODORO
                </h1>
                <div className="h-4 bg-foreground w-32 md:w-48" />
              </div>

              <div className="text-2xl md:text-3xl font-bold uppercase italic max-w-2xl border-l-[12px] border-foreground pl-8 py-2">
                PhD in Computer Science — Instituto Superior Técnico <br />
                <span className="text-muted-foreground underline decoration-4 underline-offset-8">Artificial Intelligence Consultant · Lisbon, Portugal</span>
              </div>

              <p className="text-xl text-foreground max-w-3xl leading-tight font-medium">
                Transforming complex data into intelligent solutions through computer vision, deep learning, and NLP technologies.
              </p>

              <div className="flex flex-col sm:flex-row gap-8 pt-4">
                <Button asChild className="retro-button h-14 sm:h-20 px-8 sm:px-12 text-xl sm:text-2xl">
                  <Link href="#projects" aria-label="Explore work">EXPLORE_WORK</Link>
                </Button>
                <Button asChild variant="outline" className="retro-button h-14 sm:h-20 px-8 sm:px-12 text-xl sm:text-2xl w-full sm:w-auto">
                  <Link href="/cv_afonso.pdf" download="cv_afonso.pdf" aria-label="Download CV (PDF)">DOWNLOAD_CV</Link>
                </Button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 border-b-4 border-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-16 gap-8 flex-wrap">
              <h2 className="text-5xl md:text-6xl font-black uppercase italic font-display">Featured_Projects</h2>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">03 / SELECTED</span>
            </div>
            <div className="grid md:grid-cols-12 gap-x-8 gap-y-16 items-start">
              {/* Lead project — Nomly, spans 8/12, taller */}
              <Card className="retro-outline bg-background overflow-hidden flex flex-col group md:col-span-8">
                <div className="bg-foreground text-background px-6 py-5 flex justify-between items-center">
                  <span className="font-bold tracking-widest">PROJECT_01 / LEAD</span>
                  <Zap className="w-5 h-5" />
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <h3 className="text-5xl md:text-6xl font-black mb-6 uppercase font-display leading-[0.9]">Nomly</h3>
                  <p className="text-xl mb-10 leading-snug max-w-xl">
                    AI companion for safer gluten-free living — barcode scans, restaurant finder, pantry tracker.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {["React", "Gemini AI", "Mobile"].map(tag => (
                      <span key={tag} className="border-2 border-foreground px-2 py-1 text-xs font-black uppercase">{tag}</span>
                    ))}
                  </div>
                  <Button asChild className="retro-button w-full md:w-auto md:self-start mt-auto px-10 h-14 text-lg">
                    <Link href="https://www.nomly.xyz" target="_blank" rel="noopener noreferrer" aria-label="Visit Nomly (opens in new tab)">VISIT_SITE →</Link>
                  </Button>
                </div>
              </Card>

              {/* Spacer column to preserve asymmetric lead row */}
              <div className="hidden md:block md:col-span-4" aria-hidden="true" />

              {/* Secondary — Portugal Fire Detection */}
              <Card className="retro-outline bg-background overflow-hidden flex flex-col group md:col-span-6">
                <div className="bg-background text-foreground border-b-2 border-foreground px-4 py-3 flex justify-between items-center">
                  <span className="font-bold tracking-widest text-sm">PROJECT_02 / RESEARCH</span>
                  <Code className="w-4 h-4" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black mb-3 uppercase font-display leading-tight">Portugal Fire Detection</h3>
                  <p className="text-base mb-6 leading-tight">
                    Real-time fire detection using satellite imagery and computer vision.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Python", "PyTorch", "Remote Sensing"].map(tag => (
                      <span key={tag} className="border-2 border-foreground px-2 py-1 text-[10px] font-black uppercase">{tag}</span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                    <Button asChild className="retro-button flex-1 h-10 text-xs">
                      <Link href="https://huggingface.co/spaces/ateodoro/portugal-fires" target="_blank" rel="noopener noreferrer" aria-label="Try Portugal Fire Detection demo on Hugging Face Spaces (opens in new tab)">TRY_DEMO →</Link>
                    </Button>
                    <Button asChild variant="outline" className="retro-button flex-1 h-10 text-xs">
                      <Link href="https://github.com/amteodoro/portugal-fire-detection" target="_blank" rel="noopener noreferrer" aria-label="Portugal Fire Detection source on GitHub (opens in new tab)">VIEW_CODE →</Link>
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Tertiary — RetroReps.fit (equal emphasis to Fire) */}
              <Card className="retro-outline bg-background overflow-hidden flex flex-col group md:col-span-6">
                <div className="bg-background text-foreground border-b-2 border-foreground px-4 py-3 flex justify-between items-center">
                  <span className="font-bold tracking-widest text-sm">PROJECT_03 / SIDE</span>
                  <Zap className="w-4 h-4" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black mb-3 uppercase font-display leading-tight">RetroReps.fit</h3>
                  <p className="text-base mb-6 leading-tight">
                    Daily bodyweight workouts designed with a 100% retro aesthetic. No equipment, just discipline.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Next.js", "Retro UI", "Fitness"].map(tag => (
                      <span key={tag} className="border-2 border-foreground px-2 py-1 text-[10px] font-black uppercase">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <Button asChild className="retro-button w-full h-10 text-xs">
                      <Link href="https://retroreps.fit" target="_blank" rel="noopener noreferrer" aria-label="Visit RetroReps.fit (opens in new tab)">VISIT_SITE →</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 border-b-4 border-foreground bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-16 uppercase italic font-display">History_Log</h2>
            <div className="space-y-4">
              {[
                {
                  role: "Artificial Intelligence Consultant",
                  company: "Nimble Portal",
                  period: "2019 - PRESENT",
                  desc: "Demonstrated expertise in end-to-end development of machine learning systems to address tangible business problems. This included designing and implementing CV and NLP models (TensorFlow and PyTorch), deploying with Docker, and developing Python-based API endpoints (FastAPI) and annotation platforms (ReactJS).",
                  icon: <Briefcase />
                },
                {
                  role: "PhD Scholarship (Researcher)",
                  company: "Instituto de Telecomunicações",
                  period: "2015 - 2019",
                  desc: "Conducted research and developed machine learning and optimization methods for image restoration (deblurring, super-resolution), MRI reconstruction, and image fusion for remote sensing. Authored multiple publications in leading journals and conferences.",
                  icon: <Flask />
                },
                {
                  role: "Research Fellowship (MSc Holder)",
                  company: "Instituto de Telecomunicações",
                  period: "2014 - 2015",
                  desc: "Contributed to Project PAConvex, focusing on non-convex optimization and game-theoretic approaches for imaging inverse problems. Improved Gaussian mixture model-based image denoising algorithms.",
                  icon: <Microscope />
                },
                {
                  role: "Scientific Initiation Scholarship",
                  company: "INESC-ID",
                  period: "2013",
                  desc: "Worked on Project ARGUS, focusing on activity recognition and object tracking. Developed an interface for trajectory monitoring and abnormal event detection.",
                  icon: <GitBranch />
                }
              ].map((exp) => (
                <div key={exp.company} className="retro-outline bg-background p-8 flex flex-col md:flex-row gap-8 items-start hover:bg-muted transition-colors">
                  <div className="bg-foreground text-background border-2 border-foreground p-4">
                    {exp.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-2 flex-wrap gap-2">
                      <h3 className="text-2xl font-black uppercase text-left font-display">{exp.role}</h3>
                      <span className="font-bold underline">{exp.period}</span>
                    </div>
                    <p className="font-bold uppercase mb-4 text-sm">{exp.company}</p>
                    <p className="text-base leading-relaxed text-left max-w-3xl">{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="py-32 border-b-4 border-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-16 uppercase italic font-display">Selected_Papers</h2>
            <div className="space-y-6">
              {[
                { title: "A convergent image fusion algorithm using scene-adapted Gaussian-mixture-based denoising", venue: "IEEE Transactions on Image Processing", year: "2018", citations: "105" },
                { title: "Image restoration and reconstruction using variable splitting and class-adapted image priors", venue: "IEEE ICIP", year: "2016", citations: "96" },
                { title: "Single-frame Image Denoising and Inpainting Using Gaussian Mixtures", venue: "ICPRAM", year: "2015", citations: "52" },
                { title: "Scene-adapted Plug-and-Play Algorithm with Convergence Guarantees", venue: "IEEE MLSP", year: "2017", citations: "48" },
                { title: "Image restoration and reconstruction using targeted plug-and-play priors", venue: "IEEE TCI", year: "2019", citations: "40" },
                { title: "Sharpening Hyperspectral Images Using Plug-and-Play Priors", venue: "LVA/ICA", year: "2017", citations: "18" },
                { title: "Block-Gaussian-Mixture Priors for Hyperspectral Denoising and Inpainting", venue: "IEEE TGRS", year: "2020", citations: "17" },
                { title: "Image restoration with locally selected class-adapted models", venue: "IEEE MLSP", year: "2016", citations: "17" }
              ].map((paper) => {
                const url = `https://scholar.google.com/scholar?q=${encodeURIComponent(paper.title)}`
                return (
                  <a key={paper.title} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${paper.title} — opens Google Scholar search`} className="group">
                    <div className="retro-outline bg-background p-6 flex flex-col md:flex-row gap-6 items-center hover:bg-muted transition-colors">
                      <div className="text-2xl font-black min-w-[3rem] text-center">[{paper.citations}]</div>
                      <div className="flex-1 text-left">
                        <p className="font-bold text-lg leading-tight uppercase mb-2">{paper.title}</p>
                        <p className="text-sm font-bold text-muted-foreground uppercase">{paper.venue} • {paper.year}</p>
                      </div>
                      <span className="ml-auto text-xl font-black opacity-0 group-hover:opacity-100 transition-opacity shrink-0">→</span>
                    </div>
                  </a>
                )
              })}
              <div className="pt-12">
                <Button asChild className="retro-button h-16 w-full text-lg">
                  <Link href="https://scholar.google.com/citations?user=TV9RYGAAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" aria-label="View full Google Scholar profile (opens in new tab)">
                    <GraduationCap className="mr-4" /> VIEW_FULL_GOOGLE_SCHOLAR_PROFILE
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="skills" className="py-32 border-b-4 border-foreground bg-muted">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black mb-16 uppercase italic font-display">Expertise_Bank</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "VISION & IMAGE", skills: ["Object Detection", "Segmentation", "Model Opt.", "OpenCV"] },
                { title: "GENAI & LLMS", skills: ["Fine-tuning", "RAG", "Prompt Eng.", "LangChain"] },
                { title: "MLOPS & ENG", skills: ["Docker", "Git", "FastAPI", "W&B"] },
                { title: "FRONTEND", skills: ["React.js", "JavaScript", "HTML/CSS", "Gradio"] },
              ].map((cat) => (
                <div key={cat.title}>
                  <p className="font-black text-sm uppercase mb-1">{cat.title}</p>
                  <div className="border-b-2 border-foreground mb-3" />
                  {cat.skills.map((skill) => (
                    <p key={skill} className="text-sm py-0.5">{skill}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 border-b-4 border-foreground relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tighter italic underline decoration-4 underline-offset-8 font-display">
              LET&apos;S_COLLABORATE
            </h2>
            <p className="text-lg md:text-xl font-bold mb-10 uppercase leading-tight tracking-tight">
              READY TO TRANSFORM IDEAS INTO <br />
              <span className="bg-foreground text-background px-3 inline-block mt-2">INTELLIGENT SOLUTIONS?</span>
            </p>

            <div className="flex justify-start mb-16">
              <Button asChild className="retro-button w-full max-w-lg h-16 text-xl font-black uppercase shadow-[8px_8px_0px_0px_var(--retro-shadow)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200">
                <Link href="mailto:afonso.teodoro91@gmail.com" aria-label="Email me">EMAIL_ME</Link>
              </Button>
            </div>

            <div className="flex justify-start space-x-8 pt-12 border-t-4 border-foreground">
              <Link href="https://www.linkedin.com/in/afonso-teodoro/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="hover:scale-110 transition-transform"><Linkedin className="size-12" /></Link>
              <Link href="https://github.com/amteodoro" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="hover:scale-110 transition-transform"><Github className="size-12" /></Link>
              <Link href="https://scholar.google.com/citations?user=TV9RYGAAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" aria-label="Google Scholar profile" className="hover:scale-110 transition-transform"><GraduationCap className="size-12" /></Link>
              <Link href="mailto:afonso.teodoro91@gmail.com" aria-label="Send email" className="hover:scale-110 transition-transform"><Mail className="size-12" /></Link>
            </div>
          </div>
        </div>

      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-sm font-bold uppercase tracking-widest border-t-4 border-foreground">
        <p>&copy; 2026 AFONSO_TEODORO :: LISBON, PORTUGAL</p>
      </footer>
    </div>
  )
}

function TerminalView({ isActive }: { isActive: boolean }) {
  return (
    <div id="panel-terminal" role="tabpanel" aria-labelledby="tab-terminal" tabIndex={isActive ? 0 : -1} className={`h-screen flex-col bg-terminal-bg pt-12 ${isActive ? "flex" : "hidden"}`}>
      <RetroTerminal />
    </div>
  )
}

export default function AfonsoPortfolio() {
  const [activeView, setActiveView] = useState<ViewMode>("terminal")

  return (
    <ChatProvider>
      <div className="min-h-screen bg-background text-foreground font-mono selection:bg-foreground selection:text-background">
        <TabBar activeView={activeView} setActiveView={setActiveView} />
        <main id="main-content" tabIndex={-1} className="outline-none">
          <TerminalView isActive={activeView === "terminal"} />
          <PortfolioView isActive={activeView === "portfolio"} />
        </main>
      </div>
    </ChatProvider>
  )
}
