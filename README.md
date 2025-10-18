# 🌍 Radio Garden - Worldwide Radio Stations PWA

A stunning Progressive Web Application featuring a 3D interactive globe to explore and listen to worldwide radio stations with neumorphism and glassmorphism design.

## ✨ Features

### 🌐 3D Interactive Globe
- Real-time 3D globe visualization using Three.js
- Rotate and explore radio stations from around the world
- Station points colored by popularity (votes)
- Smooth GSAP animations when selecting stations

### 🎵 Live Radio Streaming
- Stream 1000+ worldwide radio stations
- Glassmorphic audio player with real-time controls
- Volume control and playback status
- Visual audio spectrum analyzer

### 🔍 Advanced Search & Filtering
- Search stations by name, country, or genre
- Filter by country with dropdown selector
- Genre-based filtering with dynamic tag extraction
- Real-time station count display

### 🎨 Modern Design
- **Neumorphism** UI elements with 3D depth effects
- **Glassmorphism** player with blur and transparency
- Dark theme optimized for night listening
- Fully responsive design (mobile, tablet, desktop)
- HUD-style text with glowing effects

### 📱 Progressive Web App
- Installable on mobile and desktop
- Works offline with cached assets
- Fast performance with optimized builds
- Smooth animations with Framer Motion

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/uthylearncode/radio-garden.git
cd radio-garden

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

The application will be available at `http://localhost:3000`

## 🛠 Development

### Available Scripts

```bash
# Start development server with hot reload
pnpm run dev

# Build for production
pnpm run build

# Preview production build locally
pnpm run preview

# Run type checking
pnpm run type-check

# Lint code
pnpm run lint
```

## 📦 Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Three.js** - 3D globe visualization
- **Framer Motion** - Smooth animations
- **GSAP** - Advanced animations
- **Zustand** - State management
- **Axios** - HTTP client
- **React Icons** - Icon library

### APIs
- **Radio Browser API** - 1000+ worldwide radio stations
- Public endpoints (no authentication required)
- Real-time station data with geolocation

## 🌍 Data Sources

### Radio Browser API
- **URL**: https://fi1.api.radio-browser.info/json
- **Docs**: https://api.radio-browser.info/
- **Features**: 
  - Get top stations by votes
  - Search by name, country, or tag
  - Geolocation data for each station
  - Station metadata (favicon, language, etc.)

## 🎯 Project Structure

```
radio-garden/
├── client/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Globe3D.tsx          # 3D globe visualization
│   │   │   ├── AudioPlayer.tsx      # Glassmorphic player
│   │   │   └── StationList.tsx      # Station search & filter
│   │   ├── pages/           # Page components
│   │   │   └── Home.tsx             # Main application page
│   │   ├── store/           # Zustand state management
│   │   │   └── radioStore.ts        # Radio station state
│   │   ├── lib/             # Utility functions
│   │   │   └── radioApi.ts          # Radio Browser API client
│   │   ├── App.tsx          # Root component
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Global styles
│   └── vite.config.ts       # Vite configuration
├── server/                  # Backend placeholder
├── vercel.json              # Vercel deployment config
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies
```

## 🎨 Design System

### Color Palette
- **Background**: Deep slate (#0a0e27)
- **Accent**: Purple (#8b5cf6)
- **Secondary**: Blue (#3b82f6)
- **Text**: Light gray (#e5e7eb)

### Components
- **Neumorphic**: Elevated 3D buttons and containers
- **Glassmorphic**: Frosted glass effect with blur
- **HUD**: Glowing text and borders for sci-fi aesthetic

## 📱 Responsive Design

The application is fully responsive:
- **Mobile** (< 640px): Single column layout
- **Tablet** (640px - 1024px): Two column layout
- **Desktop** (> 1024px): Full three column layout with globe

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Connect GitHub Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Choose `uthylearncode/radio-garden`

2. **Configure Project**
   - Framework: Vite
   - Build Command: `pnpm run build`
   - Output Directory: `dist/public`
   - Install Command: `pnpm install`

3. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://radio-garden.vercel.app`

### Deploy to Other Platforms

#### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist/public
```

#### GitHub Pages
```bash
# Build the project
pnpm run build

# Deploy dist/public to gh-pages branch
```

## 🔧 Configuration

### Environment Variables
Currently, the application uses public APIs without authentication. If you need to add environment variables:

```bash
# Create .env file
VITE_API_BASE_URL=https://fi1.api.radio-browser.info/json
```

### Customization

**Change Theme Colors**
Edit `client/src/index.css` to modify the CSS variables in the `.dark` theme section.

**Adjust Globe Settings**
Modify `client/src/components/Globe3D.tsx` to change:
- Globe rotation speed
- Point size and colors
- Camera position and zoom

**Update Station Limit**
In `client/src/pages/Home.tsx`, change the `getStations(1000)` parameter to fetch more/fewer stations.

## 🐛 Troubleshooting

### Audio Stream Not Playing
- Some streams may require CORS headers
- Check browser console for CORS errors
- Try selecting a different station

### Globe Not Rendering
- Ensure WebGL is enabled in your browser
- Check browser console for Three.js errors
- Try refreshing the page

### Slow Performance
- Reduce the number of stations (change limit in Home.tsx)
- Disable animations in browser settings
- Use a modern browser with WebGL support

## 📊 Performance

- **Bundle Size**: ~1.2 MB (gzipped: ~360 KB)
- **Load Time**: < 3 seconds on 4G
- **Lighthouse Score**: 85+
- **60 FPS Animations**: Optimized with Framer Motion and GSAP

## 🔐 Privacy & Security

- No user data is collected
- All API calls are to public endpoints
- No authentication required
- No cookies or tracking
- HTTPS only on production

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on [GitHub](https://github.com/uthylearncode/radio-garden/issues)
- Check existing issues for solutions
- Provide detailed error messages and browser information

## 🙏 Acknowledgments

- **Radio Browser API** for providing worldwide radio station data
- **Three.js** for 3D globe visualization
- **Vercel** for hosting and deployment
- **Tailwind CSS** for utility-first styling
- **React** community for amazing tools and libraries

---

**Made with ❤️ by the Radio Garden Team**

Visit the live application: [Radio Garden](https://radio-garden.vercel.app)

