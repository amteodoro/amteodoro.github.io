// All structured content lives here so the dossier sections stay declarative
// and easy to edit. Slugs / IDs are stable so the renderers can reference them.

window.AMT = {
  experience: [
    {
      id: "exp-nimble",
      role: "Artificial Intelligence Consultant",
      org: "Nimble Portal",
      start: "2019",
      end: "PRESENT",
      desc:
        "Applied ML for enterprise insurance clients. For one anonymized insurance-operations " +
        "client, I helped build a document-understanding workflow processing around 150k invoices " +
        "per month, with 70%+ of reimbursements handled automatically. I also built the annotation " +
        "platform for a vehicle-photo damage detector, trained the models supporting insurance " +
        "underwriting and fraud-prevention workflows, and built a service around them. In an " +
        "insurance call-centre pilot, I fine-tuned Whisper for domain-specific speech-to-text and " +
        "worked on diarization for analytics. My work spans models, review tooling, APIs, and delivery.",
      tag: "INDUSTRY",
    },
    {
      id: "exp-phd",
      role: "PhD Researcher",
      org: "Instituto de Telecomunicações",
      start: "2015",
      end: "2019",
      desc:
        "PhD in Electrical and Computer Engineering (IST, 19/20), supervised by Prof. Mário " +
        "Figueiredo. Thesis: Mixture Models for Inverse Imaging Problems. ML and optimization " +
        "methods for image restoration (deblurring, super-resolution), MRI reconstruction and " +
        "image fusion for remote sensing, published in IEEE journals and conferences. " +
        "Awarded the IBM Scientific Prize 2019.",
      tag: "RESEARCH",
    },
    {
      id: "exp-fellow",
      role: "Research Fellow",
      org: "Instituto de Telecomunicações",
      start: "2014",
      end: "2015",
      desc:
        "Project PAConvex — non-convex optimization and game-theoretic approaches for " +
        "imaging inverse problems. Improved Gaussian-mixture-based image denoising algorithms.",
      tag: "RESEARCH",
    },
    {
      id: "exp-argus",
      role: "Research Intern",
      org: "INESC-ID",
      start: "2013",
      end: "2013",
      desc:
        "Project ARGUS — activity recognition and object tracking. Built an interface " +
        "for trajectory monitoring and abnormal-event detection.",
      tag: "INTERNSHIP",
    },
  ],

  projects: [
    {
      id: "proj-intrinsic",
      lead: true,
      idLabel: "AI SYSTEM",
      badge: "LIVE",
      title: "Intrinsic",
      desc:
        "Born from my passion for investing — it's the tool I use to analyse stocks and " +
        "opportunities. Scores each stock criterion by criterion against published methods " +
        "(Graham, Buffett, Lynch, Greenblatt, Piotroski), and a LangGraph tool-calling agent " +
        "writes the analysis, kept visibly separate from the computed figures.",
      specs: [
        ["TYPE",   "AI research tool · web"],
        ["RUNS ON", "Self-hosted · Docker Compose · nginx"],
        ["STATUS",  "Public demo · bring your own key"],
      ],
      stack: ["LangGraph", "FastAPI", "Next.js", "PostgreSQL"],
      links: [
        { href: "https://192-227-212-42.sslip.io/", label: "TRY APP ↗", primary: true },
      ],
      schematic: "verdict",
    },
    {
      id: "proj-nomly",
      lead: true,
      idLabel: "PRODUCT",
      badge: "LIVE",
      title: "Nomly",
      desc:
        "Coeliac disease is part of daily life at home, and finding safe products and " +
        "restaurants was a constant struggle. So I built Nomly: scan a barcode, or photograph an unfamiliar ingredient " +
        "label and let the AI read it for hidden gluten. Restaurant finder and pantry tracker " +
        "included.",
      specs: [
        ["TYPE",   "Consumer app · mobile-first"],
        ["RUNS ON", "Production · installable web app"],
        ["STATUS",  "Active"],
      ],
      stack: ["React", "PWA", "AI label reading"],
      links: [
        { href: "https://www.nomly.xyz", label: "VISIT SITE ↗", primary: true },
      ],
      schematic: "scan",
    },
    {
      id: "proj-fires",
      lead: false,
      idLabel: "REMOTE SENSING",
      badge: "DEMO",
      title: "Portugal Fire Detection",
      desc:
        "Motivated by Portugal's fire seasons. Ingests NASA FIRMS, Meteosat and Sentinel-2/3 data, " +
        "runs a MobileViT classifier over Sentinel-2 tiles, and emails alerts for areas you draw. " +
        "Public demo and source.",
      specs: [
        ["TYPE",   "Remote sensing · CV"],
        ["DATA",    "FIRMS · Meteosat · Sentinel-2/3"],
        ["STATUS",  "Open · demo + source"],
      ],
      stack: ["PyTorch", "FastAPI", "PostGIS"],
      links: [
        { href: "https://huggingface.co/spaces/ateodoro/portugal-fires", label: "TRY DEMO ↗", primary: true },
        { href: "https://github.com/amteodoro/portugal-fire-detection", label: "VIEW CODE ↗", primary: false },
      ],
      schematic: "satellite",
    },
    {
      id: "proj-reps",
      lead: false,
      idLabel: "SIDE PROJECT",
      badge: "SIDE",
      title: "RetroReps.fit",
      desc:
        "Daily bodyweight workouts wrapped in a 100% retro aesthetic. Built for " +
        "practical consistency with minimal equipment.",
      specs: [
        ["TYPE",   "Web · daily prompt"],
        ["RUNS ON", "Production · web"],
        ["STATUS",  "Live"],
      ],
      stack: ["Vanilla JS", "Retro UI", "Fitness"],
      links: [
        { href: "https://retroreps.fit", label: "VISIT SITE ↗", primary: true },
      ],
      schematic: "reps",
    },
  ],

  papers: [
    { cites: 105, title: "A convergent image fusion algorithm using scene-adapted Gaussian-mixture-based denoising", venue: "IEEE Transactions on Image Processing", year: 2019 },
    { cites:  96, title: "Image restoration and reconstruction using variable splitting and class-adapted image priors", venue: "IEEE ICIP",   year: 2016 },
    { cites:  52, title: "Single-frame Image Denoising and Inpainting Using Gaussian Mixtures", venue: "ICPRAM",                                            year: 2015 },
    { cites:  48, title: "Scene-adapted Plug-and-Play Algorithm with Convergence Guarantees",  venue: "IEEE MLSP",                                           year: 2017 },
    { cites:  40, title: "Image restoration and reconstruction using targeted plug-and-play priors", venue: "IEEE TCI",                                       year: 2019 },
    { cites:  18, title: "Sharpening Hyperspectral Images Using Plug-and-Play Priors",        venue: "LVA/ICA",                                              year: 2017 },
    { cites:  17, title: "Block-Gaussian-Mixture Priors for Hyperspectral Denoising and Inpainting", venue: "IEEE TGRS",                                     year: 2021 },
    { cites:  17, title: "Image restoration with locally selected class-adapted models",      venue: "IEEE MLSP",                                            year: 2016 },
  ],

  skills: [
    {
      bay: "01",
      title: "Vision & Image",
      jacks: [
        { name: "Object detection" },
        { name: "Segmentation" },
        { name: "Model optimization" },
        { name: "OpenCV" },
        { name: "Remote sensing" },
      ],
    },
    {
      bay: "02",
      title: "GenAI & LLMs",
      jacks: [
        { name: "Fine-tuning (vision, speech)" },
        { name: "RAG" },
        { name: "Prompt eng." },
        { name: "LangChain / LangGraph" },
        { name: "Eval pipelines" },
      ],
    },
    {
      bay: "03",
      title: "MLOps & Eng.",
      jacks: [
        { name: "Docker" },
        { name: "FastAPI" },
        { name: "Git" },
        { name: "HTTP APIs" },
        { name: "CI/CD" },
      ],
    },
    {
      bay: "04",
      title: "Frontend",
      jacks: [
        { name: "React.js" },
        { name: "JavaScript" },
        { name: "HTML / CSS" },
        { name: "Gradio" },
        { name: "Streamlit" },
      ],
    },
  ],

  suggestedPrompts: [
    "What do you actually do?",
    "Why should I hire you?",
    "Tell me about Intrinsic",
    "Are you open to new roles?",
    "What's your PhD about?",
  ],
};
