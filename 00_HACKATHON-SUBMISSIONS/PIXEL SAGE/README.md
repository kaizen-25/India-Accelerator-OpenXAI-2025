# PIXEL SAGE

An AI-powered tool that goes beyond object detection to generate rich, contextual descriptions for any image. Built with Next.js, TypeScript, and Tailwind CSS, PIXEL SAGE leverages advanced AI models to analyze images and present mood-based visual experiences.

---

## 📁 Folder Structure

**Folder:** `PIXEL SAGE/`

```
nextjs-app/
├── app/
│   ├── api/
│   │   └── analyze-image/
│   │       └── route.ts          # Image analysis API endpoint
│   ├── mood-electric/            # Electric mood page
│   ├── mood-golden/              # Golden mood page
│   ├── mood-nostalgic/           # Nostalgic mood page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Main landing page
├── package.json                  # Dependencies and scripts
├── tailwind.config.js            # Tailwind CSS configuration
├── next.config.mjs               # Next.js configuration
└── tsconfig.json                 # TypeScript configuration
```

---

## � Project Information

- **Team Name:** bit_Byte
- **Project Name:** PIXEL SAGE
- **Project Description:**
  PIXEL SAGE is an AI-powered web application that analyzes images and generates rich, contextual, and mood-based descriptions. Users can upload images to receive detailed AI insights and explore curated mood themes (Electric, Golden, Nostalgic) for unique visual experiences.
- **Track:** Computer Vision / Generative AI

---

## ✨ Features

- **AI Image Analysis:** Upload an image and receive contextual, descriptive analysis using advanced AI models (via `/api/analyze-image`).
- **Mood Themes:** Explore Electric, Golden, and Nostalgic mood pages for different visual interpretations.
- **Modern UI:** Responsive, beautiful interface built with Next.js 14+, TypeScript, and Tailwind CSS.
- **Drag & Drop Upload:** User-friendly image upload with preview and validation.
- **Customizable:** Easily extend mood themes or analysis features.

---

## 🚀 Getting Started

1. Navigate to the project directory:
	```bash
	cd nextjs-app
	```
2. Install dependencies:
	```bash
	npm install
	```
3. Run the development server:
	```bash
	npm run dev
	```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- Ollama (for AI model integration)

---

## 📝 Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Run ESLint

---

## 🤖 AI Integration

The `/api/analyze-image` endpoint processes uploaded images using an Ollama-powered AI model to generate:
- Object detection
- Scene understanding
- Contextual and mood-based descriptions

---

## 🎨 Customization

- Add new mood pages in `app/`
- Extend analysis logic in `api/analyze-image/route.ts`
- Update UI styles in `globals.css` and `tailwind.config.js`

---

## 🖼️ Example Workflow

1. **Upload Image:** User selects or drags an image file
2. **Preview:** Image is displayed before analysis
3. **Analyze:** Click "Analyze Image" to trigger AI processing
4. **Results:** Receive and view detailed, mood-based analysis

---

## Submission Requirements

- Folder follows naming convention: `PIXEL SAGE/`
- All code and documentation included
- This README is updated with project details

---

## Happy Hacking! 🚀