# PRD: MTR Digital Marketing Agency Website

## Overview
High-converting, visually stunning website for **MTR Digital Marketing Agency** (National & International), built upon the **Air Design System** (Refero style `d3289fe7-a85e-42d8-96b7-eb7faa62a104`) with dark obsidian aesthetic, hairline glass surfaces, and vibrant Signal Blue accents reflecting the MTR upward growth arrow identity.

---

## Tasks

### Task 1: Scaffolding & Brand Asset Configuration
- Scaffold directory structure (`assets/`, `css/`, `js/`).
- Integrate MTR official logo with high-DPI scaling and clean dark/light display treatments.
- Configure favicon and meta headers.

### Task 2: Air Design System CSS Architecture
- Declare Air color tokens: Signal Blue (`#2b7fff`), Twilight Blue (`#426188`), Black Void (`#050811`), Ink (`#0e1422`), Haze (`#f5f5f5`), Whiteout (`#ffffff`).
- Establish typographic hierarchy with Inter and tight tracking (`-0.035em`).
- Build glassmorphism components (`backdrop-filter: blur(20px)`), hairline borders, glow accents, and responsive layout utilities.

### Task 3: Comprehensive Agency Markup (`index.html`)
- **Header**: Sticky glass navigation with MTR logo, navigation links, live client status pill, and "Book Free Audit" CTA.
- **Hero**: Atmospheric headline, value proposition for National & International scaling, animated metrics badges, client avatar social proof, dual CTAs.
- **Partner Ticker**: Google Premier Partner, Meta Business Partner, TikTok Ads Partner, Clutch 5.0 Rating.
- **Core Capabilities**: 4 pillars with deep feature lists: Performance Paid Ads, Search & AI Engine Optimization (SEO/AEO), Conversion Rate Optimization (CRO), and International Scaling.
- **Interactive ROI & Ad Spend Calculator**: Real-time sliders for monthly budget, industry selection, and expected ROAS / Lead / Revenue yield.
- **National vs. International Strategy Matrix**: Side-by-side comparison of localized hyper-targeted campaigns vs. cross-border multi-lingual expansion.
- **Client Case Studies**: Real growth breakdowns with before/after ROAS metrics, revenue generated, and client quote badges.
- **The MTR Scale Engine**: 4-step proprietary methodology (Audit -> Architecture -> Acceleration -> Domination).
- **Client Proof & Testimonials**: High-converting founder reviews and video testimonial placeholders with star ratings.
- **Interactive Free Growth Audit Request Form**: Step-by-step lead capture with instant validation.
- **FAQ Accordion**: 6 high-value agency FAQs addressing retainers, ad spend ownership, timeline, and reporting.
- **Footer**: Deep obsidian footer with MTR branding, global office timezones (New York, London, Dubai, Mumbai), and links.

### Task 4: Dynamic JavaScript (`js/app.js`)
- Real-time ROI and ad spend calculator logic with responsive slider calculation.
- National vs. International toggle filter.
- Animated number ticker counter on viewport reveal.
- Accessible FAQ accordion behavior.
- Interactive lead audit form modal with validation and success toast.
- Ambient glass cursor glow effect.

### Task 5: Mobile-First Responsive Polish & Accessibility
- Ensure seamless rendering across mobile (360px), tablet (768px), desktop (1280px), and ultra-wide screens.
- Full keyboard navigation and WCAG AA contrast compliance.

### Task 6: Quality, Security & Performance Review
- Ensure strict input sanitization against XSS.
- Zero external vulnerable dependencies (vanilla modern web stack).
- Instant loading and 60fps animations.
