# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
