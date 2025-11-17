# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.0] - 2024-11-17
### Added
- Header component with navigation and theme switcher
  - Logo/brand name with link to home
  - Navigation menu (About, Portfolio, Blog)
  - Active route highlighting with underline indicator
  - Theme switcher integration in header
- Footer component with social links and copyright
  - Quick links navigation
  - Social media links (GitHub, LinkedIn)
  - Dynamic copyright year
  - Responsive grid layout
- DefaultLayout component for consistent page structure
  - Fixed header with proper spacing
  - Flexible main content area
  - Footer at bottom of page
- Mobile navigation menu
  - Hamburger menu toggle
  - Slide-out navigation drawer
  - Overlay for closing menu
  - Body scroll lock when menu is open
- Accessibility improvements
  - Skip to content link for keyboard navigation
  - Proper ARIA labels for interactive elements
  - Semantic HTML structure
- Smooth scroll behavior across entire site
- Global content styles moved to reset.scss

### Changed
- App.vue now uses DefaultLayout wrapper
- All pages now include Header and Footer automatically

## [0.5.0] - 2024-11-17
### Added
- Portfolio detail page with dynamic routing (`/portfolio/:slug`)
- Rich text content rendering with HTML support
- Image gallery component for portfolio items
- SEO meta tags for portfolio detail pages using @vueuse/head
  - Open Graph meta tags for social sharing
  - Dynamic page titles and descriptions
- 404 handling for invalid portfolio slugs
- Navigation link from portfolio card to detail page
- Back to Portfolio navigation link
- Technology tags display
- Key highlights/achievements list with custom styling
- Arrow-left and external-link icons
- Order field in Portfolio CMS collection for custom sorting

## [0.4.0] - 2024-11-14
### Added
- Portfolio CMS collection with comprehensive fields
- Portfolio listing page with grid layout
- Portfolio card component
- Technology filter functionality
- Sort options for portfolio items
- Featured portfolio item support
- usePortfolio composable for data management

## [0.3.0] - 2024-11-14
### Added
- Setup PayloadCMS with SQLite database
- About Me CMS collection (singleton) with personal info
- About Me page with Experience and skills sections
- Export cms data to json method
- Icons for dark and light mode
- Responsive layout for About page
- useAbout composable for data management
- useTheme composable for theme management

## [0.2.0] - 2024-11-12
### Added
- Complete design token system with CSS custom properties (tokens.scss)
  - Color tokens for light/dark modes (black/white aesthetic)
  - Typography scale using Inter font family
  - Spacing scale for consistent padding/margins
  - Border radius, shadows, and z-index layers
  - Transition speeds
- Dark mode and light mode themes with CSS custom properties
- Theme switcher component with icon-based toggle (sun/moon)
- System preference detection on initial load
- Theme persistence using localStorage
- CSS reset and base typography styles (reset.scss)
- SVG sprite system for icons
  - Icon component with dynamic width/height props
  - Automated sprite generation script
  - Sun and moon icons for theme toggle
- SCSS support with modern Sass compiler API
- Responsive design tokens (mobile-first approach)

### Changed
- Converted all CSS to SCSS
- Updated build process to generate SVG sprites before dev/build
- Migrated from deprecated @import to @use in SCSS

### Technical
- Added Sass as dev dependency
- Configured Vite to use modern Sass compiler API
- Created automated SVG sprite generation workflow

## [0.1.0] - 2024-11-12
### Added
- Initial project setup with Vue 3 and Vite
- Project structure for Vue application (components, views, composables, router)
- Vue Router configuration with routes for About Me, Portfolio, and Blog
- Basic view components (AboutMe, Portfolio, PortfolioDetail, Blog, BlogDetail)
- Comprehensive .gitignore for project files
- Project documentation (README.md)
- Development scripts:
  - `npm run dev` - Vue development server
  - `npm run build` - Production build
  - `npm run preview` - Preview production build

### Notes
- Old static site backed up to `old-site/` directory
- CMS integration deferred to later phases when needed
- Node.js v20.18.0 installed and ready
