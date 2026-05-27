# Modern Portfolio 🎨

A stunning, modern portfolio website built with Next.js, React, Three.js, and Tailwind CSS. Features smooth animations, 3D effects, and a beautiful responsive design.

## ✨ Features

- **Modern UI/UX** - Clean and professional design
- **3D Effects** - Interactive 3D elements with Three.js
- **Smooth Animations** - Beautiful animations with Framer Motion and GSAP
- **Responsive Design** - Works perfectly on all devices
- **Performance Optimized** - Fast loading and smooth interactions
- **SEO Friendly** - Built with Next.js for optimal SEO

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/69-Insomnia/modern-portfolio.git
cd modern-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env.local
```

4. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Build

Build the application for production:

```bash
npm run build
npm start
```

## 🧹 Linting

Run ESLint:

```bash
npm run lint
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy this Next.js app is to use [Vercel](https://vercel.com):

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel
```

Or simply push to GitHub and connect your repository to Vercel through the [Vercel Dashboard](https://vercel.com/dashboard).

#### Steps for Vercel Dashboard:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
3. Click "New Project" and select your repository
4. Vercel will automatically detect Next.js settings
5. Click "Deploy"

### Environment Variables for Vercel

Add any required environment variables in Vercel Dashboard:
- Go to Settings → Environment Variables
- Add your variables (see `.env.example` for template)

### Deploy to Other Platforms

**Netlify:**
```bash
npm run build
# Deploy the .next folder using Netlify
```

**Docker:**
```bash
docker build -t modern-portfolio .
docker run -p 3000:3000 modern-portfolio
```

## 📁 Project Structure

```
client/
├── components/        # React components
├── pages/            # Next.js pages (routing)
├── public/           # Static files
├── styles/           # Global styles
├── next.config.js    # Next.js configuration
├── tailwind.config.js # Tailwind CSS config
└── package.json      # Dependencies
```

## 🛠️ Tech Stack

- **Next.js 15** - React framework
- **React 18** - UI library
- **Three.js** - 3D graphics
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **GSAP** - Professional animation platform
- **React Icons** - Icon library
- **Swiper** - Touch slider
- **Particles** - Particle effects

## 📝 Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
# API endpoints (if any)
NEXT_PUBLIC_API_URL=

# Analytics (if any)
NEXT_PUBLIC_GA_ID=
```

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Dipendra Guragain**
- GitHub: [@69-Insomnia](https://github.com/69-Insomnia)
- Email: guragaidipendra7@gmail.com

## 🙏 Support

If you found this project helpful, please consider supporting me:
- [Patreon](https://www.patreon.com/sanidhy)
- [Buy me a coffee](https://www.buymeacoffee.com/sanidhy)

---

Built with ❤️ using Next.js
