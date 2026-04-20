# Color Palette - Wasla Project

## Overview
This document outlines the color palette used throughout the Wasla front-end application. The design follows a modern, professional aesthetic with a primary color scheme of dark navy blue and coral red.

## Primary Brand Colors

### Main Brand Colors
- **#1a1a2e** - Dark Navy Blue/Black
  - Used for: Primary text, borders, button backgrounds on hover
  - Hex: #1a1a2e
  - RGB: (26, 26, 46)
  - Usage: Navbar logo, CTA section buttons, category overlays

- **#e94560** - Coral Red/Pink
  - Used for: Accent color, primary buttons, highlights
  - Hex: #e94560
  - RGB: (233, 69, 96)
  - Usage: Hero section highlights, button backgrounds, category overlays, borders

### Secondary Brand Colors
- **#c73652** - Dark Coral Red
  - Used for: Button hover states
  - Hex: #c73652
  - RGB: (199, 54, 82)
  - Usage: Button hover backgrounds

## Background Colors

### Dark Gradient Background
Used in hero sections and major banners:
- **#0d0d1a** - Deep Dark Blue
- **#0f1628** - Dark Blue-Gray
- **#12102a** - Dark Navy
- Gradient: linear-gradient(135deg, #0d0d1a 0%, #0f1628 40%, #12102a 70%, #0d0d1a 100%)

### Light Backgrounds
- **#fafafa** - Off-White Gray
  - Used for: Section backgrounds, light areas
  - Hex: #fafafa
  - RGB: (250, 250, 250)

## Text Colors

### Primary Text
- **#1a1a2e** - Dark Navy (as mentioned above)
- **White** - Pure white (#ffffff)
- **White with opacity** - text-white/70, text-white/80, text-white/90

### Secondary Text
- **Gray variants** (Tailwind CSS):
  - text-gray-400: Light gray for subtitles
  - text-gray-500: Medium gray for descriptions
  - text-gray-600: Darker gray for navigation
  - text-gray-700: Dark gray for active states

## Status and State Colors

### Success States
- **Emerald variants**:
  - text-emerald-500: #10b981
  - text-emerald-600: #059669
  - bg-emerald-50: #ecfdf5

### Warning States
- **Amber variants**:
  - text-amber-500: #f59e0b
  - text-amber-600: #d97706
  - bg-amber-50: #fffbeb

### Error States
- **Rose variants**:
  - text-rose-500: #f43f5e
  - text-rose-600: #e11d48
  - bg-rose-50: #fef2f2

### Info States
- **Sky variants**:
  - text-sky-500: #0ea5e9
  - text-sky-600: #0284c7
  - bg-sky-50: #f0f9ff

### Processing States
- **Violet variants**:
  - text-violet-500: #8b5cf6
  - bg-violet-50: #faf5ff

### Neutral States
- **Gray variants**:
  - text-gray-500: #6b7280
  - bg-gray-100: #f3f4f6

## Category Colors

Used in category cards with gradient overlays:
- **from-[#1a1a2e]/70** - Dark navy overlay (70% opacity)
- **from-[#e94560]/70** - Coral red overlay (70% opacity)

## Wallet/Payment Colors

- **Red variants** (Vodafone Cash):
  - text-red-500: #ef4444
  - bg-red-50: #fef2f2

- **Blue variants** (InstaPay):
  - text-blue-500: #3b82f6
  - bg-blue-50: #eff6ff

- **Violet variants** (Bank Card):
  - text-violet-500: #8b5cf6
  - bg-violet-50: #faf5ff

- **Emerald variants** (Bank Transfer):
  - text-emerald-500: #10b981
  - bg-emerald-50: #ecfdf5

## Achievement Colors

Used in helper dashboard badges:
- text-emerald-500: Completed achievements
- text-amber-500: Speed achievements
- text-sky-500: Verification achievements
- text-rose-500: Favorite achievements
- text-orange-500: Performance achievements
- text-yellow-500: Top performer
- text-purple-500: High volume achievements
- text-teal-500: Mentor achievements
- text-indigo-500: Multitasking achievements
- text-amber-600: Legend status

## UI Element Colors

### Modals and Overlays
- **bg-black/40** - Semi-transparent black overlay
- **bg-white** - Pure white modal backgrounds
- **border-gray-100** - Light gray borders

### Scrollbars
- **#d1d5db** - Light gray scrollbar track
- **#9ca3af** - Medium gray scrollbar thumb

### Buttons and Interactive Elements
- **bg-white/10** - Semi-transparent white backgrounds
- **border-white/20** - Semi-transparent white borders
- **backdrop-blur-sm** - Blur effects for modern glass-morphism

## Color Usage Guidelines

### Primary Actions
- Background: #e94560
- Hover: #c73652
- Text: White

### Secondary Actions
- Background: Transparent
- Border: #1a1a2e
- Text: #1a1a2e
- Hover Background: #1a1a2e
- Hover Text: White

### Text Hierarchy
1. Headlines: #1a1a2e or #e94560
2. Body Text: Gray variants (gray-500 to gray-700)
3. Subtitles: Gray variants (gray-400 to gray-500)

### Accessibility Considerations
- Ensure sufficient contrast ratios
- Use darker variants for better readability
- Maintain consistent color meanings across states

## Implementation Notes

- Colors are primarily implemented using Tailwind CSS classes
- Custom hex colors are used for brand-specific elements
- Opacity modifiers (/70, /80, etc.) are used for overlays and effects
- Gradient backgrounds use CSS custom properties for smooth transitions