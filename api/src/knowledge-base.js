// Knowledge base chunks for RAG retrieval.
// Each chunk is a self-contained, first-person statement about Afonso Teodoro.
// Audience mix: AI/ML recruiters, prospective consulting clients, and curious peers.

export const KNOWLEDGE_CHUNKS = [
    // === IDENTITY & OVERVIEW ===
    {
        id: "identity-overview",
        category: "about",
        content: `My name is Afonso Teodoro. I am an AI consultant and researcher based in Lisbon, Portugal. I hold a PhD in Electrical and Computer Engineering from Instituto Superior Técnico (IST), with a final grade of 19 out of 20. I have worked in machine learning since 2013: first in academic research, and since 2019 in industry, shipping solutions that solve real client problems.`
    },
    {
        id: "identity-focus",
        category: "about",
        content: `My core focus spans computer vision, NLP, and applied deep learning, with current work also covering LLM application systems: retrieval-augmented generation, prompt engineering, and workflow orchestration. I work across the path from data and modelling through evaluation, packaging, deployment, and the API or interface around it, taking end-to-end ownership when the engagement calls for it. I am happiest when the problem is technically real and the user is too.`
    },

    // === PROFESSIONAL EXPERIENCE ===
    {
        id: "exp-nimble",
        category: "experience",
        content: `Since 2019 I have been an AI consultant at Nimble Portal, working with client stakeholders and delivery teams to put machine-learning systems into use. In one anonymized insurance-operations engagement, I helped build a document-understanding workflow processing around 150,000 invoices per month, with 70%+ of reimbursements handled automatically. I also built the annotation platform for a vehicle-photo damage detector, trained the models that supported insurance underwriting and fraud-prevention workflows, and exposed them through a service. In an insurance call-centre pilot, I fine-tuned Whisper for domain-specific speech-to-text and worked on diarization for analytics. My work spans data, modelling, annotation/review tooling, APIs, and delivery.`
    },
    {
        id: "exp-phd",
        category: "experience",
        content: `From 2015 to 2019 I held a PhD scholarship as a researcher at Instituto de Telecomunicações. I developed machine learning and optimization methods for image restoration (deblurring, super-resolution, denoising, inpainting), MRI reconstruction, and image fusion for remote sensing. The work produced several publications in IEEE journals and conferences.`
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
        content: `I did my PhD in Electrical and Computer Engineering at Instituto Superior Técnico (IST) in Lisbon, one of Portugal’s leading engineering schools. The thesis covered image restoration and reconstruction with optimization methods and learned priors. I finished with a final grade of 19 out of 20.`
    },

    // === PUBLICATIONS (overview + top 3 by citations) ===
    {
        id: "pub-overview",
        category: "publications",
        content: `I have published in peer-reviewed venues including IEEE Transactions on Image Processing, IEEE Transactions on Computational Imaging, and IEEE Transactions on Geoscience and Remote Sensing. The work spans image restoration, plug-and-play priors, MRI reconstruction, and hyperspectral imaging. Google Scholar lists 400+ citations. The full list is on Google Scholar: https://scholar.google.com/citations?user=TV9RYGAAAAAJ&hl=en.`
    },
    {
        id: "pub-tip2018",
        category: "publications",
        content: `One of my most-cited papers is "A convergent image fusion algorithm using scene-adapted Gaussian-mixture-based denoising", published in IEEE Transactions on Image Processing in 2018. It introduces an image fusion method based on Gaussian-mixture denoising with formal convergence guarantees. It is the paper I would point to first if you want a representative read of my PhD work.`
    },
    {
        id: "pub-icip2016",
        category: "publications",
        content: `"Image restoration and reconstruction using variable splitting and class-adapted image priors" was published at IEEE ICIP in 2016. It proposes a variable-splitting optimization scheme that uses class-adapted priors for image restoration. It was an early step toward the plug-and-play line of work I extended in later papers.`
    },
    {
        id: "pub-icpram2015",
        category: "publications",
        content: `"Single-frame Image Denoising and Inpainting Using Gaussian Mixtures" was published at ICPRAM in 2015. It addresses denoising and inpainting (filling in missing image regions) within a single Gaussian-mixture framework. It grew out of my MSc thesis and became a stepping stone for my later PhD work.`
    },

    // === SKILLS ===
    {
        id: "skills-languages",
        category: "skills",
        content: `Python is my primary language and the one I reach for by default for anything AI- or data-related. JavaScript and TypeScript are my second working languages.`
    },
    {
        id: "skills-ai-core",
        category: "skills",
        content: `My core machine-learning skills are in computer vision (classification, detection, segmentation, and image restoration) and natural language processing (information extraction, semantic matching, and intent classification). I have also worked on speech-to-text and diarization. I work primarily in PyTorch, with TensorFlow where projects require it. I am comfortable across the lifecycle: dataset design, training, evaluation, packaging, and serving.`
    },
    {
        id: "skills-llm",
        category: "skills",
        content: `For LLM application work I use retrieval-augmented generation, prompt engineering, and workflow orchestration. I have applied fine-tuning to computer-vision models, not to LLMs — I have not trained custom LLM weights in production. My usual tooling includes Hugging Face Transformers, LangChain when the workflow warrants it, and hosted model APIs such as OpenAI, Anthropic, and OpenRouter. This very site runs a small RAG system for its chatbot.`
    },
    {
        id: "skills-mlops",
        category: "skills",
        content: `On the engineering side I work with Docker for packaging, FastAPI for Python services, and Git for everything. I have experience wiring up CI/CD pipelines and serving models behind HTTP APIs.`
    },
    {
        id: "skills-frontend",
        category: "skills",
        content: `I build the frontend needed to ship AI products; AI/ML remains my headline service. I have shipped a production React app (Nomly) and a vanilla-JavaScript static site (this one). I can build the interface an AI tool needs.`
    },

    // === STACK SUMMARY ===
    {
        id: "stack-summary",
        category: "skills",
        content: `My current working stack is Python, primarily PyTorch with TensorFlow where projects require it, FastAPI, Docker, and Git. For LLM applications I use RAG, prompt design, workflow orchestration, Hugging Face Transformers, LangChain when useful, and hosted model APIs such as OpenAI, Anthropic, and OpenRouter. On the frontend I use React or vanilla JavaScript, depending on the product.`
    },

    // === DOMAINS / PROBLEM AREAS ===
    {
        id: "domains-production",
        category: "domains",
        content: `The production problems I have worked on include document understanding and information extraction, image classification, object detection and segmentation, semantic matching, and intent classification. I have also worked on speech-to-text and speaker diarization. These are areas where I can talk concretely about data, evaluation, and trade-offs rather than in generalities.`
    },
    {
        id: "domains-academia",
        category: "domains",
        content: `My academic work focused on image reconstruction and restoration — denoising, deblurring, super-resolution, and inpainting — with related work in MRI reconstruction and remote-sensing image fusion. This work formed the core of my PhD and most of my publications.`
    },
    {
        id: "domains-personal",
        category: "domains",
        content: `Outside client work, my main personal product is Nomly, an app for safer gluten-free living. I also maintain a satellite-imagery fire-detection demo and RetroReps.fit, a bodyweight-workout site. These are projects I chose to build independently, not client commissions.`
    },

    // === PROJECTS ===
    {
        id: "project-nomly",
        category: "projects",
        content: `Nomly is my lead featured project — an AI companion for safer gluten-free living, aimed at people with celiac disease. It lets you scan product barcodes for gluten safety, find celiac-friendly restaurants, track a pantry of safe products, and share finds with the community. Nomly is built in React and runs as a browser-based app, with AI features supporting safer gluten-free decisions. It is available at https://www.nomly.xyz.`
    },
    {
        id: "project-fire",
        category: "projects",
        content: `Portugal Fire Detection is a research demo for detecting fires using computer vision on satellite imagery. The demo is available at https://huggingface.co/spaces/ateodoro/portugal-fires, and the source is at https://github.com/amteodoro/portugal-fire-detection.`
    },
    {
        id: "project-retroreps",
        category: "projects",
        content: `RetroReps.fit is a side project that serves daily bodyweight workouts with an unapologetically retro aesthetic. I built it for my own use, as a practical nudge toward healthier habits. It is intentionally minimal, built with vanilla JavaScript, HTML, and CSS. It is live at https://retroreps.fit.`
    },

    // === RESEARCH AREAS ===
    {
        id: "research-image-restoration",
        category: "research",
        content: `My PhD research centred on image restoration and reconstruction: deblurring (removing motion or out-of-focus blur), super-resolution (increasing resolution), denoising (removing noise), and inpainting (filling in missing regions). I developed methods that combined optimization with learned priors based on Gaussian mixture models.`
    },
    {
        id: "research-plug-and-play",
        category: "research",
        content: `A significant chunk of my research is in plug-and-play (PnP) priors: a framework where a sophisticated denoiser is used as a building block inside an optimization loop for inverse problems. My contribution was scene-adapted PnP algorithms with theoretical convergence guarantees.`
    },
    {
        id: "research-remote-sensing",
        category: "research",
        content: `I have worked on remote sensing problems, in particular hyperspectral imagery — images that capture many wavelength bands and are used in environmental monitoring, agriculture, and mineral detection. My published work in this area covers hyperspectral image sharpening and denoising with block-Gaussian-mixture priors.`
    },
    {
        id: "research-mri",
        category: "research",
        content: `During my PhD I also worked on MRI reconstruction from undersampled or noisy data.`
    },

    // === AVAILABILITY & CONSULTING ===
    {
        id: "availability",
        category: "availability",
        content: `I consider selected consulting engagements in AI and machine learning. The fastest way in is an email to afonso.teodoro91@gmail.com with a short description of the use case, the data you have, and the timeline. I will tell you honestly whether it is a good fit.`
    },
    {
        id: "consulting-engagements",
        category: "availability",
        content: `The engagements I am best suited for include building computer vision or NLP pipelines from scratch, productionising machine-learning prototypes, designing RAG systems on top of bespoke knowledge bases, fine-tuning vision models, technical due diligence on AI claims, and advisory work on ML strategy. I am based in Lisbon and work remotely with clients internationally.`
    },
    {
        id: "carve-outs",
        category: "availability",
        content: `Frontend is a supporting capability I use to ship AI products, rather than my primary service. I can work with data systems when they support an AI project, but pure warehouse or ETL work is not my focus.`
    },
    {
        id: "methodology",
        category: "availability",
        content: `How I work: I can take end-to-end ownership from research to production when the engagement calls for it, rather than handing off at the prototype stage. I prefer to ship a working baseline fast and then harden it, instead of spending months on upfront design. And I will tell you when AI is the wrong tool — if rules, heuristics, or a small classical model will do the job, I would rather say so than oversell a model.`
    },
    {
        id: "employment-stance",
        category: "availability",
        content: `I am open to discussing exceptional full-time opportunities that align with my experience in computer vision, NLP, and GenAI. If you are building something technically serious and think there may be a strong fit, email me at afonso.teodoro91@gmail.com with the role and what the team is building.`
    },
    {
        id: "cofounder-stance",
        category: "availability",
        content: `I have never taken on a technical co-founder role, but I would consider taking that risk for a strong fit and a problem worth building. I am also open to advising founders on technical due diligence, ML strategy, and the first production version of an AI product. If you think there is a fit, email me at afonso.teodoro91@gmail.com with the pitch.`
    },
    {
        id: "cv-pointer",
        category: "contact",
        content: `My CV is available on this site via the DOWNLOAD CV button in the dossier view, or directly at https://amteodoro.github.io/cv_afonso.pdf. For my publication record, visit my Google Scholar profile at https://scholar.google.com/citations?user=TV9RYGAAAAAJ&hl=en; it is also linked in the OPEN CHANNEL section.`
    },
    {
        id: "engagement-logistics",
        category: "availability",
        content: `Engagement logistics: I am based in Lisbon and work remotely with clients internationally. Typical engagements start with a short scoping call, then a written proposal with milestones. Timing depends on my current commitments; email afonso.teodoro91@gmail.com to check availability.`
    },

    // === CONTACT ===
    {
        id: "contact-info",
        category: "contact",
        content: `You can reach me by email at afonso.teodoro91@gmail.com. My LinkedIn is https://www.linkedin.com/in/afonso-teodoro/, my GitHub is https://github.com/amteodoro, and my Google Scholar profile is https://scholar.google.com/citations?user=TV9RYGAAAAAJ&hl=en.`
    },

    // === HOBBIES & PERSONAL ===
    {
        id: "hobbies-coding",
        category: "hobbies",
        content: `I enjoy building small web applications and creative coding side projects, often with a retro or terminal aesthetic.`
    },
    {
        id: "hobbies-research",
        category: "hobbies",
        content: `I read AI research for fun — mostly in computer vision, NLP, and LLM applications — and like to understand a new technique well enough to know when it would actually help a real project.`
    }
];
