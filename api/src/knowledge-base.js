// Knowledge base chunks for RAG retrieval
// Each chunk is a self-contained piece of information about Afonso Teodoro

export const KNOWLEDGE_CHUNKS = [
    // === IDENTITY & OVERVIEW ===
    {
        id: "identity-overview",
        category: "about",
        content: `My name is Afonso Teodoro. I am an AI Consultant and Researcher based in Lisbon, Portugal. I hold a PhD in Electrical and Computer Engineering from Instituto Superior Técnico, where I achieved a final grade of 19.0 out of 20. My mission is transforming complex data into intelligent solutions for real-world challenges.`
    },
    {
        id: "identity-focus",
        category: "about",
        content: `I specialize in Computer Vision, Natural Language Processing (NLP), and Deep Learning. My work bridges academic research and industry applications, focusing on solving real-world challenges through intelligent systems. I am passionate about applying cutting-edge AI techniques to practical problems.`
    },

    // === PROFESSIONAL EXPERIENCE ===
    {
        id: "exp-nimble",
        category: "experience",
        content: `Since 2019, I have been working as an Artificial Intelligence Consultant at Nimble Portal. In this role, I demonstrate expertise in end-to-end development of machine learning systems to address tangible business problems. This includes designing and implementing Computer Vision and NLP models using TensorFlow and PyTorch, deploying solutions with Docker, and developing Python-based API endpoints with FastAPI and annotation platforms with ReactJS.`
    },
    {
        id: "exp-phd",
        category: "experience",
        content: `From 2015 to 2019, I held a PhD Scholarship as a Researcher at Instituto de Telecomunicações. I conducted research and developed machine learning and optimization methods for image restoration (deblurring, super-resolution), MRI reconstruction, and image fusion for remote sensing. I authored multiple publications in leading journals and conferences during this period.`
    },
    {
        id: "exp-msc-fellowship",
        category: "experience",
        content: `From 2014 to 2015, I held a Research Fellowship (MSc Holder) at Instituto de Telecomunicações. I contributed to Project PAConvex, focusing on non-convex optimization and game-theoretic approaches for imaging inverse problems. I improved Gaussian mixture model-based image denoising algorithms during this period.`
    },
    {
        id: "exp-inesc",
        category: "experience",
        content: `In 2013, I held a Scientific Initiation Scholarship at INESC-ID. I worked on Project ARGUS, focusing on activity recognition and object tracking. I developed an interface for trajectory monitoring and abnormal event detection.`
    },

    // === EDUCATION ===
    {
        id: "edu-phd",
        category: "education",
        content: `I completed my PhD in Electrical and Computer Engineering at Instituto Superior Técnico (IST) in Lisbon, Portugal. My PhD focused on image restoration and reconstruction using optimization methods and machine learning. I achieved an exceptional final grade of 19.0 out of 20. Instituto Superior Técnico is considered the top engineering school in Portugal.`
    },

    // === PUBLICATIONS ===
    {
        id: "pub-tip2018",
        category: "publications",
        content: `My most-cited paper is "A convergent image fusion algorithm using scene-adapted Gaussian-mixture-based denoising", published in IEEE Transactions on Image Processing in 2018. This paper has received 105 citations and presents a novel image fusion method using Gaussian mixture model-based denoising with convergence guarantees.`
    },
    {
        id: "pub-icip2016",
        category: "publications",
        content: `My paper "Image restoration and reconstruction using variable splitting and class-adapted image priors" was published at IEEE ICIP in 2016 and has received 96 citations. It proposes methods for image restoration using variable splitting optimization techniques combined with class-adapted priors.`
    },
    {
        id: "pub-icpram2015",
        category: "publications",
        content: `My paper "Single-frame Image Denoising and Inpainting Using Gaussian Mixtures" was published at ICPRAM in 2015 and has 52 citations. This work addresses both image denoising and inpainting (filling in missing regions) using Gaussian mixture models.`
    },
    {
        id: "pub-mlsp2017",
        category: "publications",
        content: `My paper "Scene-adapted Plug-and-Play Algorithm with Convergence Guarantees" was published at IEEE MLSP in 2017 and has 48 citations. It introduces a plug-and-play framework that adapts to different image scenes while maintaining mathematical convergence guarantees.`
    },
    {
        id: "pub-tci2019",
        category: "publications",
        content: `My paper "Image restoration and reconstruction using targeted plug-and-play priors" was published in IEEE Transactions on Computational Imaging (TCI) in 2019 with 40 citations. This work extends plug-and-play methods with targeted priors for improved image restoration.`
    },
    {
        id: "pub-lva2017",
        category: "publications",
        content: `My paper "Sharpening Hyperspectral Images Using Plug-and-Play Priors" was published at LVA/ICA in 2017 with 18 citations. It applies plug-and-play prior methods to the problem of hyperspectral image sharpening.`
    },
    {
        id: "pub-tgrs2020",
        category: "publications",
        content: `My paper "Block-Gaussian-Mixture Priors for Hyperspectral Denoising and Inpainting" was published in IEEE Transactions on Geoscience and Remote Sensing (TGRS) in 2020 with 17 citations. This work applies block-based Gaussian mixture models to hyperspectral image denoising and inpainting.`
    },
    {
        id: "pub-mlsp2016",
        category: "publications",
        content: `My paper "Image restoration with locally selected class-adapted models" was published at IEEE MLSP in 2016 with 17 citations. It proposes locally adaptive image restoration using class-specific models selected for each image region.`
    },
    {
        id: "pub-overview",
        category: "publications",
        content: `I have published multiple papers in top-tier venues including IEEE Transactions on Image Processing (TIP), IEEE Transactions on Computational Imaging (TCI), IEEE Transactions on Geoscience and Remote Sensing (TGRS), IEEE ICIP, IEEE MLSP, ICPRAM, and LVA/ICA. My research has accumulated over 400 citations. My Google Scholar profile is available at scholar.google.com/citations?user=TV9RYGAAAAAJ.`
    },

    // === TECHNICAL SKILLS ===
    {
        id: "skills-vision",
        category: "skills",
        content: `In the domain of Computer Vision and Image Processing, my skills include Object Detection, Image Segmentation, Model Optimization, and OpenCV. I have extensive experience with image restoration techniques such as deblurring, super-resolution, denoising, and inpainting. I also work with remote sensing and hyperspectral imagery.`
    },
    {
        id: "skills-genai",
        category: "skills",
        content: `In Generative AI and Large Language Models (LLMs), my skills include Fine-tuning, Retrieval-Augmented Generation (RAG), Prompt Engineering, LangChain, and Transformers. I build AI systems that leverage the latest advances in generative AI.`
    },
    {
        id: "skills-mlops",
        category: "skills",
        content: `In MLOps and Engineering, I am proficient with Docker, Git, FastAPI, Weights & Biases (W&B), CI/CD pipelines, and Model Serving. I handle the full lifecycle of ML models from training to production deployment.`
    },
    {
        id: "skills-frontend",
        category: "skills",
        content: `On the frontend side, I work with React.js, JavaScript, HTML/CSS, and Gradio. I build annotation platforms and user interfaces for AI applications. I also build web applications using Next.js and TypeScript.`
    },
    {
        id: "skills-languages",
        category: "skills",
        content: `My primary programming languages and frameworks include Python, PyTorch, TensorFlow, SQL, and C++. Python is my main language for AI/ML work, while I use PyTorch and TensorFlow for deep learning model development.`
    },

    // === PROJECTS ===
    {
        id: "project-nomly",
        category: "projects",
        content: `Nomly is my lead featured project — an AI companion for safer gluten-free living, designed for people with celiac disease. It lets users scan product barcodes to check for gluten safety, find celiac-friendly restaurants, generate gluten-free recipes, track their pantry of safe products, and share finds with the community. The tech stack includes React 19, TypeScript, TailwindCSS, an Express.js backend, the Google Gemini API for AI features, and Capacitor for iOS/Android delivery. It is live at https://www.nomly.xyz.`
    },
    {
        id: "project-fire",
        category: "projects",
        content: `Portugal Fire Detection is one of my featured projects. It is an advanced system for real-time fire detection using satellite imagery and computer vision. The tech stack includes Python, PyTorch, and Remote Sensing technologies. The live demo is on Hugging Face Spaces and the source is on GitHub. This project demonstrates my expertise in applying computer vision to critical real-world problems.`
    },
    {
        id: "project-retroreps",
        category: "projects",
        content: `RetroReps.fit is one of my side projects. It provides daily bodyweight workouts designed with a 100% retro aesthetic. No equipment needed, just discipline. The tech stack is intentionally minimal: vanilla JavaScript, HTML, and CSS with no framework, no bundler, and no npm — all static files served by Nginx in Docker. It is available at https://retroreps.fit.`
    },

    // === CONTACT ===
    {
        id: "contact-info",
        category: "contact",
        content: `You can reach me via email at afonso.teodoro91@gmail.com. My LinkedIn profile is at linkedin.com/in/afonso-teodoro. My GitHub is at github.com/amteodoro. My Google Scholar profile is at scholar.google.com/citations?user=TV9RYGAAAAAJ.`
    },

    // === AVAILABILITY & CONSULTING ===
    {
        id: "availability",
        category: "availability",
        content: `Yes, I am currently accepting consulting work. My status on this page reads "operational, accepting work" for a reason. I take on selected AI and machine-learning engagements alongside my ongoing role at Nimble Portal — typically computer vision, NLP, RAG/LLM systems, and end-to-end ML delivery. If you have a problem in mind, the fastest path is to email me at afonso.teodoro91@gmail.com with a short description of the use case, the data you have, and the timeline. I will tell you honestly whether it is a good fit.`
    },
    {
        id: "consulting-engagements",
        category: "availability",
        content: `The engagements I am best suited for: building computer vision or NLP pipelines from scratch, productionising machine-learning prototypes, fine-tuning and deploying LLMs, designing RAG systems on top of bespoke knowledge bases, technical due diligence on AI claims, and advisory work on ML strategy. I am based in Lisbon but work remotely with clients across Europe and the US. I do not take on pure generic web development — my focus stays on the AI/ML layer.`
    },

    // === STACK SUMMARY ===
    {
        id: "stack-summary",
        category: "skills",
        content: `My day-to-day stack: Python as the primary language, PyTorch and TensorFlow for deep learning, FastAPI for backends, Docker for packaging, Weights & Biases for experiment tracking, and Git for everything. For LLM work I lean on the OpenAI, Anthropic, and OpenRouter APIs, plus LangChain when the workflow warrants it. On the frontend I use React, TypeScript, and vanilla JavaScript depending on the project — this very site is vanilla JS, while Nomly runs on React 19 with TailwindCSS. For infrastructure I use Cloudflare Workers for lightweight APIs and serverless edges, and standard Docker/Linux for heavier deployments.`
    },

    // === HOBBIES & PERSONAL ===
    {
        id: "hobbies-fitness",
        category: "hobbies",
        content: `I am passionate about fitness and bodyweight training. This passion led me to create RetroReps.fit, a web application that provides daily bodyweight workouts with a retro aesthetic. I believe in discipline and consistency over equipment.`
    },
    {
        id: "hobbies-coding",
        category: "hobbies",
        content: `Beyond my professional work, I enjoy building web applications and exploring creative coding projects. I combine my AI expertise with frontend development skills to create unique digital experiences. I am also interested in retro computing aesthetics and terminal-based interfaces.`
    },
    {
        id: "hobbies-research",
        category: "hobbies",
        content: `I have a deep interest in staying at the forefront of AI research. I keep up with the latest developments in computer vision, natural language processing, and generative AI. I enjoy reading and discussing new papers and exploring how cutting-edge techniques can be applied to practical problems.`
    },

    // === RESEARCH AREAS ===
    {
        id: "research-image-restoration",
        category: "research",
        content: `My PhD research focused heavily on image restoration and reconstruction. This includes techniques for deblurring (removing motion or out-of-focus blur from images), super-resolution (increasing image resolution), denoising (removing noise from images), and inpainting (filling in missing or damaged regions of images). I developed novel approaches using optimization methods and Gaussian mixture models.`
    },
    {
        id: "research-plug-and-play",
        category: "research",
        content: `A significant part of my research involved Plug-and-Play (PnP) priors for image processing. PnP methods allow sophisticated denoising algorithms to be used as building blocks within optimization frameworks for solving various inverse problems. My work contributed convergence guarantees for scene-adapted PnP algorithms, which was a novel theoretical contribution.`
    },
    {
        id: "research-remote-sensing",
        category: "research",
        content: `I have worked on remote sensing applications, including hyperspectral image processing. Hyperspectral images capture data across many wavelength bands and are used in environmental monitoring, agriculture, and mineral detection. My work on hyperspectral image sharpening and denoising using block-Gaussian mixture priors contributed to this field.`
    },
    {
        id: "research-mri",
        category: "research",
        content: `During my PhD, I also worked on MRI (Magnetic Resonance Imaging) reconstruction. The goal is to reconstruct high-quality medical images from undersampled or noisy MRI data, which can help speed up MRI scans while maintaining diagnostic image quality.`
    }
];
