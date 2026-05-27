// Knowledge base chunks for RAG retrieval.
// Each chunk is a self-contained, first-person statement about Afonso Teodoro.
// Audience mix: AI/ML recruiters, prospective consulting clients, and curious peers.

export const KNOWLEDGE_CHUNKS = [
    // === IDENTITY & OVERVIEW ===
    {
        id: "identity-overview",
        category: "about",
        content: `My name is Afonso Teodoro. I am an AI consultant and researcher based in Lisbon, Portugal. I hold a PhD in Electrical and Computer Engineering from Instituto Superior Técnico (IST), with a final grade of 19 out of 20. I have spent the last decade turning research-grade machine learning into systems that survive contact with real users, real data, and real production constraints.`
    },
    {
        id: "identity-focus",
        category: "about",
        content: `My core focus is computer vision, natural language processing, and applied deep learning. I work the full path from a paper or prototype to a deployed service: data, modelling, evaluation, packaging, and the API or UI in front of it. I am happiest when the problem is technically real and the user is too.`
    },

    // === PROFESSIONAL EXPERIENCE ===
    {
        id: "exp-nimble",
        category: "experience",
        content: `Since 2019 I have been an AI consultant at Nimble Portal. I lead end-to-end delivery of machine learning systems for client problems: training computer vision and NLP models in PyTorch and TensorFlow, wrapping them in Python services with FastAPI, packaging them with Docker, and building light annotation and review interfaces in React when the project needs them. I work on the AI layer and the immediate scaffolding around it — not on long-running web product teams.`
    },
    {
        id: "exp-phd",
        category: "experience",
        content: `From 2015 to 2019 I held a PhD scholarship as a researcher at Instituto de Telecomunicações. I developed machine learning and optimization methods for image restoration (deblurring, super-resolution, denoising, inpainting), MRI reconstruction, and image fusion for remote sensing. The work produced several publications in IEEE journals and conferences and accumulated most of the citations I have today.`
    },
    {
        id: "exp-msc-fellowship",
        category: "experience",
        content: `From 2014 to 2015 I held a research fellowship as an MSc holder at Instituto de Telecomunicações, working on Project PAConvex. The work centred on non-convex optimization and game-theoretic approaches to imaging inverse problems, and on improving Gaussian-mixture-based image denoising.`
    },
    {
        id: "exp-inesc",
        category: "experience",
        content: `In 2013 I held a scientific initiation scholarship at INESC-ID, working on Project ARGUS. I built tooling around activity recognition and object tracking, including a trajectory monitoring interface for abnormal event detection.`
    },

    // === EDUCATION ===
    {
        id: "edu-phd",
        category: "education",
        content: `I did my PhD in Electrical and Computer Engineering at Instituto Superior Técnico (IST) in Lisbon, considered the top engineering school in Portugal. The thesis covered image restoration and reconstruction with optimization methods and learned priors. I finished with a final grade of 19 out of 20.`
    },

    // === PUBLICATIONS (overview + top 3 by citations) ===
    {
        id: "pub-overview",
        category: "publications",
        content: `I have published in top-tier venues including IEEE Transactions on Image Processing, IEEE Transactions on Computational Imaging, IEEE Transactions on Geoscience and Remote Sensing, IEEE ICIP, IEEE MLSP, ICPRAM, and LVA/ICA. The work spans image restoration, plug-and-play priors, MRI reconstruction, and hyperspectral imaging. My papers have accumulated over 400 citations in total. The full list is on Google Scholar: scholar.google.com/citations?user=TV9RYGAAAAAJ.`
    },
    {
        id: "pub-tip2018",
        category: "publications",
        content: `My most-cited paper is "A convergent image fusion algorithm using scene-adapted Gaussian-mixture-based denoising", published in IEEE Transactions on Image Processing in 2018. It introduces an image fusion method based on Gaussian-mixture denoising with formal convergence guarantees. It is the paper I would point to first if you want a representative read of my PhD work.`
    },
    {
        id: "pub-icip2016",
        category: "publications",
        content: `"Image restoration and reconstruction using variable splitting and class-adapted image priors" was published at IEEE ICIP in 2016. It proposes a variable-splitting optimization scheme that uses class-adapted priors for image restoration. It was an early step toward the plug-and-play line of work I extended in later papers.`
    },
    {
        id: "pub-icpram2015",
        category: "publications",
        content: `"Single-frame Image Denoising and Inpainting Using Gaussian Mixtures" was published at ICPRAM in 2015. It addresses denoising and inpainting (filling in missing image regions) within a single Gaussian-mixture framework, and was one of the first papers from my PhD research line.`
    },

    // === SKILLS ===
    {
        id: "skills-languages",
        category: "skills",
        content: `Python is my primary language and the one I reach for by default for anything AI- or data-related. JavaScript and TypeScript are my second working language: I use them for frontends (React with TailwindCSS) and for serverless backends on Cloudflare Workers. I have used SQL and C++ when projects required them, but I would not list them as headline skills.`
    },
    {
        id: "skills-ai-core",
        category: "skills",
        content: `My core machine-learning skills are in computer vision (classification, detection, segmentation, image restoration), natural language processing (information extraction, semantic matching, intent classification), and speech (speech-to-text and diarization). I work in PyTorch and TensorFlow, mostly PyTorch for new work. I am comfortable across the lifecycle: dataset design, training, evaluation, packaging, and serving.`
    },
    {
        id: "skills-llm",
        category: "skills",
        content: `For LLM and RAG work I split things into techniques and tooling. Techniques I use: retrieval-augmented generation, prompt engineering, evaluation harnesses for LLM outputs, and agent-style orchestration. Fine-tuning I have applied to computer vision models, not to LLMs — I have not trained custom LLM weights in production. Tooling I use: the Hugging Face Transformers library (not to be confused with the Transformer architecture itself), LangChain when the workflow warrants it, and the OpenAI, Anthropic, and OpenRouter APIs. This very site runs a small RAG system on a Cloudflare Worker.`
    },
    {
        id: "skills-mlops",
        category: "skills",
        content: `On the engineering side I work with Docker for packaging, FastAPI for Python services, Git for everything, and Weights & Biases for experiment tracking. I am comfortable wiring up CI/CD pipelines and serving models behind HTTP APIs, on standard Linux hosts or on edge runtimes like Cloudflare Workers.`
    },
    {
        id: "skills-frontend",
        category: "skills",
        content: `I am capable on the frontend but I do not market myself as a frontend developer. I have shipped a production React + TypeScript + TailwindCSS app (Nomly) and a vanilla-JS static site (this one), and I can build the UI that an AI tool needs without help. The framing is: I can ship the interface for my AI systems, but the AI/ML layer is the headline service.`
    },

    // === STACK SUMMARY ===
    {
        id: "stack-summary",
        category: "skills",
        content: `My day-to-day stack: Python as the primary language, PyTorch and TensorFlow for deep learning, FastAPI for Python services, Docker for packaging, Weights & Biases for experiment tracking, and Git for everything. For LLM work I use the OpenAI, Anthropic, and OpenRouter APIs plus the Hugging Face Transformers library, and LangChain when the workflow warrants it. On the frontend I use React with TypeScript and TailwindCSS, or vanilla JavaScript when a project does not need a framework. For infrastructure I use Cloudflare Workers for lightweight APIs and standard Docker/Linux for heavier deployments.`
    },

    // === DOMAINS / PROBLEM AREAS ===
    {
        id: "domains-production",
        category: "domains",
        content: `The problems I have shipped most often in production are: document understanding and information extraction from documents, image classification, object detection and segmentation, semantic matching, speech-to-text, speaker diarization, and intent classification. These are the areas where I can talk concretely about data, evaluation, and trade-offs rather than in generalities.`
    },
    {
        id: "domains-academia",
        category: "domains",
        content: `My academic work was concentrated in image reconstruction and restoration: denoising, deblurring, super-resolution, inpainting, MRI reconstruction, and remote-sensing image fusion. It is the lineage behind my PhD and the bulk of my publications.`
    },
    {
        id: "domains-personal",
        category: "domains",
        content: `Outside client work I have a handful of personal projects that are live but not production-grade: a fire detection demo using satellite imagery, the Nomly app for safer gluten-free living, and the RetroReps.fit bodyweight-workout site. They exist because I wanted to build them, not because someone paid for them.`
    },

    // === PROJECTS ===
    {
        id: "project-nomly",
        category: "projects",
        content: `Nomly is my lead featured project — an AI companion for safer gluten-free living, aimed at people with celiac disease. It lets you scan product barcodes to check for gluten safety, find celiac-friendly restaurants, generate gluten-free recipes, track a pantry of safe products, and share finds with the community. The stack is React with TypeScript and TailwindCSS, an Express.js backend, the Google Gemini API for the AI features, and Capacitor for iOS and Android packaging. It is live at https://www.nomly.xyz.`
    },
    {
        id: "project-fire",
        category: "projects",
        content: `Portugal Fire Detection is a side project for real-time fire detection on satellite imagery using computer vision. The stack is Python and PyTorch on top of remote-sensing imagery. There is a live demo on Hugging Face Spaces and the source is on GitHub. It is a demo, not a production system.`
    },
    {
        id: "project-retroreps",
        category: "projects",
        content: `RetroReps.fit is a side project that serves daily bodyweight workouts with an unapologetically retro aesthetic. The stack is intentionally minimal: vanilla JavaScript, HTML, and CSS, with no framework, no bundler, and no npm, served as static files by Nginx in Docker. It is live at https://retroreps.fit.`
    },

    // === RESEARCH AREAS ===
    {
        id: "research-image-restoration",
        category: "research",
        content: `My PhD research centred on image restoration and reconstruction: deblurring (removing motion or out-of-focus blur), super-resolution (increasing resolution), denoising (removing noise), and inpainting (filling in missing regions). I developed methods that combined convex optimization with learned priors based on Gaussian mixture models.`
    },
    {
        id: "research-plug-and-play",
        category: "research",
        content: `A significant chunk of my research is in plug-and-play (PnP) priors: a framework where a sophisticated denoiser is used as a building block inside an optimization loop for inverse problems. My contribution was scene-adapted PnP algorithms with convergence guarantees, which addressed a real gap in the theory at the time.`
    },
    {
        id: "research-remote-sensing",
        category: "research",
        content: `I have worked on remote sensing problems, in particular hyperspectral imagery — images that capture many wavelength bands and are used in environmental monitoring, agriculture, and mineral detection. My published work in this area covers hyperspectral image sharpening and denoising with block-Gaussian-mixture priors.`
    },
    {
        id: "research-mri",
        category: "research",
        content: `During the PhD I also worked on MRI reconstruction: recovering high-quality medical images from undersampled or noisy MRI data, which is how MRI scans can be made faster without losing diagnostic quality.`
    },

    // === AVAILABILITY & CONSULTING ===
    {
        id: "availability",
        category: "availability",
        content: `Yes, I am currently accepting consulting work — that is what "operational, accepting work" on this page means. I take on selected AI and machine-learning engagements alongside my ongoing role at Nimble Portal. The fastest way in is an email to afonso.teodoro91@gmail.com with a short description of the use case, the data you have, and the timeline. I will tell you honestly whether it is a good fit.`
    },
    {
        id: "consulting-engagements",
        category: "availability",
        content: `The engagements I am best suited for: building computer vision or NLP pipelines from scratch, productionising machine-learning prototypes, designing RAG systems on top of bespoke knowledge bases, fine-tuning vision models, technical due diligence on AI claims, and advisory work on ML strategy. I am based in Lisbon but work remotely with clients across Europe and the US.`
    },
    {
        id: "carve-outs",
        category: "availability",
        content: `What I do not take on: pure web or frontend development for hire — frontend is a tool I use, not the service I sell. Pure data engineering or warehouse/ETL-only work — not my craft. And generic "ChatGPT wrapper" projects where the value is a thin prompt around someone else's model: if there is no real ML or AI problem underneath, I am the wrong person for it.`
    },
    {
        id: "methodology",
        category: "availability",
        content: `How I work: I take end-to-end ownership from research to production rather than handing off at the prototype stage. I prefer to ship a working baseline fast and then harden it, instead of spending months on upfront design. And I will tell you when AI is the wrong tool — if rules, heuristics, or a small classical model will do the job, I would rather say so than oversell a model.`
    },

    // === CONTACT ===
    {
        id: "contact-info",
        category: "contact",
        content: `You can reach me by email at afonso.teodoro91@gmail.com. My LinkedIn is at linkedin.com/in/afonso-teodoro, my GitHub is github.com/amteodoro, and my Google Scholar profile is at scholar.google.com/citations?user=TV9RYGAAAAAJ.`
    },

    // === HOBBIES & PERSONAL ===
    {
        id: "hobbies-fitness",
        category: "hobbies",
        content: `I am into bodyweight training and general fitness, which is the reason RetroReps.fit exists — I wanted the workout site I would actually use. The thesis there is discipline over equipment.`
    },
    {
        id: "hobbies-coding",
        category: "hobbies",
        content: `Outside of paid work I enjoy building small web applications and creative coding projects, usually with a retro or terminal aesthetic. This site is one of them.`
    },
    {
        id: "hobbies-research",
        category: "hobbies",
        content: `I read AI research for fun — mostly computer vision, NLP, and the latest on LLM systems — and I like to understand a new technique well enough to know when it would actually help a real project.`
    }
];
