---
name: luxury-casino-3d-ui-designer
description: Specialized UI/UX engineering skill for building ultra-luxurious, 3D spatial, tactile brutalist, glassmorphism, and performance-optimized iGaming/Casino web interfaces with champagne gold accents and dark onyx velvet depth.
source: custom
date_added: "2026-08-11"
---

# Luxury Casino 3D UI & Spatial UX Engineering Skill

## 1. Core Principles for High-End iGaming Interfaces

### 💎 A. Tactile Brutalism & 3D Spatial Depth
- **No Flat Generic Rectangles**: Avoid boring rectangular boxes with thick borders. Elements should feel like physical, floating 3D objects or weightless spatial layers.
- **24K Champagne Gold Palette**:
  - Primary Accent: 24K Champagne Gold (`#d4af37`, `#e6ca65`, `#faf6f0`).
  - Dark Velvet Onyx Backgrounds: Pure Deep Onyx (`#0c0a09`, `#18120e`, `#241810`).
  - Subtle Gold Atmospheric Glows: `blur-[180px] bg-[#d4af37]/10`.

### 🌌 B. Glassmorphism & Depth Hierarchy
- **Backdrop Blur & Semi-Translucency**: Use `backdrop-blur-2xl bg-[#18120e]/90` with fine `1px` metallic gold border highlights (`border-[#e6ca65]/50`).
- **Layer Z-Indexing**:
  - Layer 0: Dark Onyx canvas with subtle radial gold ambient lighting.
  - Layer 1: Spatial interactive elements (3D ball selectors, ticket generators).
  - Layer 2: Floating HUD pills (Live balance, Countdown timers, Tickers).
  - Layer 3: Modal overlays with heavy blur (`backdrop-blur-xl`).

### 🎟️ C. Physical iGaming Metaphors
- **Ticket Receipts**: Model tickets after physical casino receipts with perforated dashed borders (`border-dashed border-[#e6ca65]/40`), watermarks, and metallic foil headers.
- **3D Sphere Lottery Balls**: Render lottery balls as metallic 3D spheres (`bg-gradient-to-tr from-[#f0d885] via-[#d4af37] to-[#7a5711] shadow-[0_0_15px_rgba(212,175,55,0.7)]`).

## 2. Motion & Micro-Interactions
- **Smooth 3D Hover Transforms**: Use `hover:scale-105 transition-all duration-300 active:scale-95`.
- **Staggered Animations**: Stagger ball entry with `animate-in zoom-in-50`.
- **Sub-Second Feedback**: Provide immediate Sonner toast notifications with rich gold icon badges.

## 3. SEO & Structural Best Practices
- Single `<h1>` per page.
- Valid Schema.org JSON-LD structured data.
- Feature-wise modular components in `src/components/<feature>/`.
- Feature-wise Database Queries in `src/db/queries/<feature>/`.
- Feature-wise Server Actions in `src/actions/<feature>/`.
