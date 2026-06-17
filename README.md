# 🏮 Mystic India

Mystic India is not just a web application—it's a captivating cultural odyssey. Step into the heart of India and experience her timeless traditions, vivid festivals, authentic cuisines, and ancient heritage skills. From the snow-clad Himalayas to the vibrant coasts of Kerala, Mystic India bridges the geographical and cultural gaps, offering users an immersive, interactive platform to explore the soul of every Indian state.

Discover hidden gems through virtual tours, savor local delicacies, engage with indigenous arts, and celebrate India's unmatched diversity—all in one seamless experience.

## 🌐 [Live Demo](https://mystic-india.netlify.app/)

---

## ✨ Features

- 🌐 **Virtual Cultural Tours** — Explore the unique cultural landscapes of different Indian states
- 🍛 **Local Cuisine Discovery** — Dive into authentic culinary experiences
- 🎉 **Festival Highlights** — Learn about traditional festivals and celebrations
- 🏺 **Heritage Skills Showcase** — Information about traditional arts and crafts
- 🗺️ **Journey Planner** — AI-powered trip planning with detailed itineraries
- 🤖 **AI Chatbot** — Ask questions about Indian culture, states, and travel tips
- 🌦️ **Live Data** — Real-time weather, news, and currency exchange rates
- 📱 **Responsive Design** — Seamless experience on all devices
- 🎨 **Beautiful Animations** — Smooth UI interactions with Framer Motion
- 🌙 **Dark/Light Theme** — Toggle between themes for comfortable viewing

---

## 🚀 Technologies Used

| Technology | Purpose |
|---|---|
| ⚛️ React 18 + TypeScript | Type-safe, scalable frontend architecture |
| 🎨 Tailwind CSS | Utility-first CSS framework for custom designs |
| 🧩 shadcn/ui + Radix UI | Accessible, composable UI component library |
| 🎞️ Framer Motion | Smooth animations and page transitions |
| 🌍 React Router | Dynamic routing for multi-page experience |
| 🔮 React Three Fiber | 3D graphics and interactive visuals |
| 📊 Tanstack React Query | Server state management and data fetching |
| ⚡ Vite | Ultra-fast development server and build tool |
| 🛠️ ESLint + PostCSS | Code quality and CSS tooling |

---

## 📁 Project Structure

```
Mystic_India/
├── public/                    # Static assets (favicon, images)
├── src/
│   ├── components/
│   │   ├── admin/             # Admin panel components
│   │   ├── chatbot/           # AI chatbot (training data, providers, UI)
│   │   ├── cuisine/           # Cuisine exploration components
│   │   ├── journey/           # Journey planner components
│   │   ├── layout/            # Navbar, Footer, layout wrappers
│   │   ├── sections/          # Homepage sections
│   │   ├── theme/             # Theme provider (dark/light mode)
│   │   └── ui/                # Reusable UI primitives (shadcn/ui)
│   ├── context/               # React context providers (Auth)
│   ├── data/
│   │   ├── cultural/          # Art forms, cultural data
│   │   ├── journeys.ts        # Journey itinerary data
│   │   └── stateData.ts       # Data for all Indian states
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities (auth, email, animations)
│   ├── pages/                 # Route-level page components
│   ├── services/
│   │   ├── ai-providers/      # Multi-provider AI service (Gemini, Claude, Qwen)
│   │   ├── live-data-service.ts  # Weather, news, currency APIs
│   │   └── multi-ai-service.ts   # AI provider orchestration
│   ├── styles/                # Global and optimized CSS
│   ├── App.tsx                # Root component with routing
│   └── main.tsx               # Application entry point
├── .env.example               # Required environment variables template
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
├── tailwind.config.ts         # Tailwind CSS configuration
├── vite.config.ts             # Vite build configuration
└── README.md                  # This file
```

---

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Deepanshu9548/Mystic_India.git
   cd Mystic_India
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your API keys (see [Environment Variables](#-environment-variables) below).

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:8080/`

### Quick Launch

Alternatively, use the launch scripts:
- **macOS/Linux:** `./launch.sh`
- **Windows:** `launch.bat`

---

## 🔑 Environment Variables

Create a `.env` file in the project root (see `.env.example` for a template):

| Variable | Description | Required | Get it from |
|---|---|---|---|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for AI chatbot | Optional | [Google AI Studio](https://aistudio.google.com/apikey) |
| `VITE_OPENWEATHER_API_KEY` | OpenWeatherMap API key for live weather | Optional | [OpenWeatherMap](https://openweathermap.org/api) |
| `VITE_NEWS_API_KEY` | NewsAPI key for latest India news | Optional | [NewsAPI](https://newsapi.org/) |

> **Note:** The app works without these keys — AI chatbot falls back to built-in training data, and live data features gracefully degrade.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 8080 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint checks |

---

## 📄 License

This project is licensed under the MIT License.

---

## 📧 Contact

**Deepanshu Chauhan**
- Email: deepanshu95488@gmail.com
- GitHub: [@Deepanshu9548](https://github.com/Deepanshu9548)
