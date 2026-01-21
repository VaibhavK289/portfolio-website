<div align="center">

# Vaibhav Kumar Kandhway - Portfolio Website

[![Next.js](https://img.shields.io/badge/Next.js-16.0.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23-FF0080?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

A modern, responsive, and beautifully animated portfolio website showcasing my projects, skills, and experience as an aspiring full-stack developer.

[** Live Demo**](https://vaibhavkandhway.dev) · [** Contact**](mailto:vaibhavkrkandhway@gmail.com)

</div>

---

##  Features

-  **Modern UI/UX** - Clean, professional design with Aceternity UI and Magic UI components
-  **Dark/Light Mode** - Seamless theme switching with system preference detection
-  **Smooth Animations** - Beautiful animations powered by Framer Motion
-  **Fully Responsive** - Optimized for all devices (mobile, tablet, desktop)
-  **High Performance** - Server-side rendering and static generation with Next.js
-  **Smooth Scrolling** - Butter-smooth scroll experience with Lenis
-  **Interactive Elements** - Sparkle effects, hover animations, and dynamic backgrounds
-  **Contact Form** - Functional contact form with validation
-  **SEO Optimized** - Meta tags, Open Graph, and structured data

---

##  Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI library |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **Framer Motion** | Animation library |
| **next-themes** | Theme management |

### UI Components
| Library | Usage |
|---------|-------|
| **Aceternity UI** | Sparkles, Spotlight, Background effects |
| **Magic UI** | Magic Cards, Glow effects |
| **Lucide React** | Icon library |
| **Tabler Icons** | Additional icons |

### Form & Validation
| Library | Purpose |
|---------|---------|
| **React Hook Form** | Form state management |
| **Zod** | Schema validation |

### Utilities
| Library | Purpose |
|---------|---------|
| **Lenis** | Smooth scrolling |
| **clsx** | Conditional classNames |
| **tailwind-merge** | Merge Tailwind classes |

---

## Project Structure

```
my-app/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── projects/          # Projects listing & detail pages
│   └── api/               # API routes
│       └── contact/       # Contact form endpoint
├── components/            # React components
│   ├── ui/               # UI primitives
│   │   ├── aceternity/   # Aceternity UI components
│   │   └── magicui/      # Magic UI components
│   ├── animations/       # Animation components
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Site footer
│   ├── ProjectCard.tsx   # Project display card
│   └── ...
├── data/                  # Static data
│   ├── projects.ts       # Projects information
│   ├── skills.ts         # Skills & technologies
│   └── socials.ts        # Social links & personal info
├── lib/                   # Utility functions
├── types/                 # TypeScript type definitions
└── public/               # Static assets
    └── images/           # Images and media
```

---

## Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VaibhavK289/portfolio-website.git
   cd portfolio-website/my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

---

## Customization

### Personal Information
Edit `data/socials.ts` to update:
- Name and title
- Email and location
- Bio and description
- Social media links
- Resume URL

### Projects
Edit `data/projects.ts` to add/modify:
- Project title and description
- Technologies used
- Live demo and GitHub links
- Project images

### Skills
Edit `data/skills.ts` to update:
- Skill categories
- Technologies and proficiency
- Icons and descriptions

### Styling
- Global styles: `app/globals.css`
- Theme colors: CSS variables in globals.css
- Component styles: Tailwind classes

---

##  Deployment

This project is optimized for deployment on **Vercel**:

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. Configure the root directory as `my-app`
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/VaibhavK289/portfolio-website)

---

##  Performance

- ⚡ **100** Lighthouse Performance Score
- ♿ **100** Accessibility Score
- 🔍 **100** SEO Score
- ✅ **100** Best Practices Score

---

##  Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/VaibhavK289/portfolio-website/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

##  License

This project is open source and available under the [MIT License](LICENSE).

---

##  Author

**Vaibhav Kumar Kandhway**

- 🌐 Portfolio: [vaibhavkandhway.dev](https://vaibhavkandhway.dev)
- 📧 Email: [vaibhavkrkandhway@gmail.com](mailto:vaibhavkrkandhway@gmail.com)
- 🎓 Vellore Institute Of Technology

---

##  Acknowledgments

- [Aceternity UI](https://ui.aceternity.com/) - Beautiful UI components
- [Magic UI](https://magicui.design/) - Stunning animation components
- [Vercel](https://vercel.com/) - Hosting and deployment
- [Next.js](https://nextjs.org/) - The React framework

---

<div align="center">

⭐ **Star this repo if you find it helpful!** ⭐

Made with ❤️ by [Vaibhav Kumar Kandhway](https://github.com/VaibhavK289)

</div>
