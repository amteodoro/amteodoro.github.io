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
        "ML systems against tangible business problems. For one anonymized insurance-operations " +
        "client, I helped build a document-understanding workflow processing around 150k invoices " +
        "per month, with 70%+ of reimbursements handled automatically. I also built the annotation " +
        "platform for a vehicle-photo damage detector, trained the models supporting insurance " +
        "underwriting and fraud-prevention workflows, and built a service around them. In an " +
        "insurance call-centre pilot, I fine-tuned Whisper for domain-specific speech-to-text and " +
        "worked on diarization for analytics. My work spans models, review tooling, APIs, and delivery.",
      tag: "INDUSTRY",
      ref: "01.04",
    },
    {
      id: "exp-phd",
      role: "PhD Scholarship — Researcher",
      org: "Instituto de Telecomunicações",
      start: "2015",
      end: "2019",
      desc:
        "ML and optimization methods for image restoration (deblurring, super-resolution), " +
        "MRI reconstruction and image fusion for remote sensing. Multiple publications in " +
        "leading journals and conferences.",
      tag: "RESEARCH",
      ref: "01.03",
    },
    {
      id: "exp-fellow",
      role: "Research Fellowship — MSc Holder",
      org: "Instituto de Telecomunicações",
      start: "2014",
      end: "2015",
      desc:
        "Project PAConvex — non-convex optimization and game-theoretic approaches for " +
        "imaging inverse problems. Improved Gaussian-mixture-based image denoising algorithms.",
      tag: "RESEARCH",
      ref: "01.02",
    },
    {
      id: "exp-argus",
      role: "Scientific Initiation Scholarship",
      org: "INESC-ID",
      start: "2013",
      end: "2013",
      desc:
        "Project ARGUS — activity recognition and object tracking. Built an interface " +
        "for trajectory monitoring and abnormal-event detection.",
      tag: "EARLY",
      ref: "01.01",
    },
  ],

  projects: [
    {
      id: "proj-nomly",
      lead: true,
      idLabel: "PROJ_01 / LEAD",
      badge: "LIVE",
      title: "Nomly",
      desc:
        "AI companion for safer gluten-free living. Barcode scanner, restaurant finder, " +
        "pantry tracker — daily decisions de-risked for the coeliac community.",
      specs: [
        ["CLASS",   "Consumer app · mobile-first"],
        ["DEPLOY",  "Production · iOS · Web"],
        ["STATUS",  "Active"],
      ],
      stack: ["React", "Mobile", "Web"],
      links: [
        { href: "https://www.nomly.xyz", label: "VISIT SITE ↗", primary: true },
      ],
      schematic: "scan",
    },
    {
      id: "proj-fires",
      lead: false,
      idLabel: "PROJ_02 / RESEARCH",
      badge: "DEMO",
      title: "Portugal Fire Detection",
      desc:
        "Research demo for detecting fires in satellite imagery using computer vision. " +
        "Public demo and source.",
      specs: [
        ["CLASS",   "Remote sensing · CV"],
        ["DATASET", "Sentinel-2/3 · FIRMS · MODIS"],
        ["STATUS",  "Open · demo + source"],
      ],
      stack: ["Python", "PyTorch", "Remote Sensing"],
      links: [
        { href: "https://huggingface.co/spaces/ateodoro/portugal-fires", label: "TRY DEMO ↗", primary: true },
        { href: "https://github.com/amteodoro/portugal-fire-detection", label: "VIEW CODE ↗", primary: false },
      ],
      schematic: "satellite",
    },
    {
      id: "proj-reps",
      lead: false,
      idLabel: "PROJ_03 / SIDE",
      badge: "SIDE",
      title: "RetroReps.fit",
      desc:
        "Daily bodyweight workouts wrapped in a 100% retro aesthetic. Built for " +
        "practical consistency with minimal equipment.",
      specs: [
        ["CLASS",   "Web · daily prompt"],
        ["DEPLOY",  "Production · web"],
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
    { cites: 105, title: "A convergent image fusion algorithm using scene-adapted Gaussian-mixture-based denoising", venue: "IEEE Transactions on Image Processing", year: 2018 },
    { cites:  96, title: "Image restoration and reconstruction using variable splitting and class-adapted image priors", venue: "IEEE ICIP",   year: 2016 },
    { cites:  52, title: "Single-frame Image Denoising and Inpainting Using Gaussian Mixtures", venue: "ICPRAM",                                            year: 2015 },
    { cites:  48, title: "Scene-adapted Plug-and-Play Algorithm with Convergence Guarantees",  venue: "IEEE MLSP",                                           year: 2017 },
    { cites:  40, title: "Image restoration and reconstruction using targeted plug-and-play priors", venue: "IEEE TCI",                                       year: 2019 },
    { cites:  18, title: "Sharpening Hyperspectral Images Using Plug-and-Play Priors",        venue: "LVA/ICA",                                              year: 2017 },
    { cites:  17, title: "Block-Gaussian-Mixture Priors for Hyperspectral Denoising and Inpainting", venue: "IEEE TGRS",                                     year: 2020 },
    { cites:  17, title: "Image restoration with locally selected class-adapted models",      venue: "IEEE MLSP",                                            year: 2016 },
  ],

  skills: [
    {
      bay: "01",
      title: "Vision & Image",
      jacks: [
        { name: "Object detection",   level: 0.92 },
        { name: "Segmentation",       level: 0.88 },
        { name: "Model optimization", level: 0.80 },
        { name: "OpenCV",             level: 0.85 },
        { name: "Remote sensing",     level: 0.78 },
      ],
    },
    {
      bay: "02",
      title: "GenAI & LLMs",
      jacks: [
        { name: "Fine-tuning",      level: 0.78 },
        { name: "RAG",              level: 0.90 },
        { name: "Prompt eng.",      level: 0.92 },
        { name: "LangChain",        level: 0.72 },
        { name: "Eval pipelines",   level: 0.68 },
      ],
    },
    {
      bay: "03",
      title: "MLOps & Eng.",
      jacks: [
        { name: "Docker",     level: 0.85 },
        { name: "FastAPI",    level: 0.88 },
        { name: "Git",        level: 0.92 },
        { name: "HTTP APIs",  level: 0.84 },
        { name: "CI/CD",      level: 0.70 },
      ],
    },
    {
      bay: "04",
      title: "Frontend",
      jacks: [
        { name: "React.js",   level: 0.84 },
        { name: "JavaScript", level: 0.88 },
        { name: "HTML / CSS", level: 0.86 },
        { name: "Gradio",     level: 0.82 },
        { name: "Streamlit",  level: 0.65 },
      ],
    },
  ],

  // First-person system prompt content used by the terminal AI
  bio: `Subject: A. M. Teodoro — AI consultant, PhD in Electrical and Computer Engineering (Instituto Superior Técnico, Lisbon), with a computer-vision and AI focus.
Specialties: computer vision, deep learning, NLP, remote sensing, image restoration & reconstruction (denoising, deblurring, super-resolution, MRI reconstruction).
Currently AI Consultant at Nimble Portal (2019 →). PhD researcher at Instituto de Telecomunicações (2015–2019). Earlier: MSc fellowship at IT (2014–15) and INESC-ID (2013, Project ARGUS).
Selected projects: Nomly (gluten-free AI companion, nomly.xyz), Portugal Fire Detection (satellite CV, HF Space + GitHub), RetroReps.fit (retro fitness web app).
Notable publications: image fusion via scene-adapted GMM denoising (TIP 2018), class-adapted image priors (ICIP 2016), GMM-based single-frame denoising/inpainting (ICPRAM 2015), scene-adapted PnP with convergence (MLSP 2017), hyperspectral plug-and-play priors (LVA/ICA 2017, TGRS 2020).
400+ citations on Google Scholar.
Tone: precise, dry-witty, technically grounded, never markets himself with empty hype.
Lives in Lisbon, Portugal. Email: afonso.teodoro91@gmail.com.`,

  suggestedPrompts: [
    "What do you actually do?",
    "Tell me about Nomly",
    "What's your PhD about?",
    "Are you available for consulting?",
    "What's your stack?",
  ],
};
