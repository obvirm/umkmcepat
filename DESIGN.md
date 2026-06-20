---
version: alpha
name: "Lovable AI Builder"
description: "Warm off-white AI builder design system inspired by Lovable: aurora hero, Camera Plain Variable typography, soft radii, flat depth, chat-first interaction."
colors:
  surface-base: "#eceae4"
  surface-muted: "#f7f4ed"
  surface-warm-white: "#fcfbf8"
  action-primary: "#1c1c1c"
  foreground-primary: "#1c1c1c"
  text-secondary: "#5f5f5d"
typography:
  display-hero:
    fontFamily: "Camera Plain Variable"
    fontSize: "60px"
    fontWeight: "480"
    lineHeight: "60px"
  display-large:
    fontFamily: "Camera Plain Variable"
    fontSize: "60px"
    fontWeight: "600"
    lineHeight: "66px"
    letterSpacing: "-1.5px"
  heading-xl:
    fontFamily: "Camera Plain Variable"
    fontSize: "48px"
    fontWeight: "600"
    lineHeight: "52.8px"
    letterSpacing: "-1.2px"
  heading-lg:
    fontFamily: "Camera Plain Variable"
    fontSize: "36px"
    fontWeight: "600"
    lineHeight: "39.6px"
    letterSpacing: "-0.9px"
  body-large:
    fontFamily: "Camera Plain Variable"
    fontSize: "18px"
    fontWeight: "400"
    lineHeight: "24.75px"
  body-base:
    fontFamily: "Camera Plain Variable"
    fontSize: "16px"
    fontWeight: "400"
    lineHeight: "24px"
  body-medium:
    fontFamily: "Camera Plain Variable"
    fontSize: "15px"
    fontWeight: "400"
    lineHeight: "24px"
  body-small:
    fontFamily: "Camera Plain Variable"
    fontSize: "14px"
    fontWeight: "400"
    lineHeight: "21px"
  label-emphasis:
    fontFamily: "Camera Plain Variable"
    fontSize: "14px"
    fontWeight: "480"
    lineHeight: "21px"
rounded:
  radius-sm: "6px"
  radius-md: "8px"
  radius-lg: "12px"
  radius-xl: "16px"
  radius-2xl: "24px"
  radius-3xl: "28px"
spacing:
  spacing-1: "2px"
  spacing-2: "4px"
  spacing-3: "6px"
  spacing-4: "8px"
  spacing-5: "10px"
  spacing-6: "12px"
  spacing-7: "16px"
  spacing-8: "20px"
  spacing-9: "24px"
  spacing-10: "32px"
  spacing-11: "40px"
  spacing-12: "48px"
  spacing-13: "56px"
  spacing-14: "80px"
  spacing-15: "144px"
  spacing-16: "160px"
  spacing-17: "192px"
---

## Overview

Target visual: Lovable-style AI builder.

Core traits:
- Full-bleed aurora gradient hero: pink, magenta, blue, orange.
- Warm neutral surfaces: `#eceae4`, `#fcfbf8`, `#f7f4ed`.
- Camera Plain Variable everywhere.
- Chat-first interaction card: rounded `12px`, warm white, flat border.
- Minimal transparent nav.
- Soft radius card system.
- Flat depth; avoid heavy shadows.

## Tailwind v4 tokens

```css
@theme {
  --color-surface-base: #eceae4;
  --color-foreground-primary: #1c1c1c;
  --color-surface-warm-white: #fcfbf8;
  --color-surface-muted: #f7f4ed;
  --color-text-secondary: #5f5f5d;
  --color-action-primary: #1c1c1c;

  --spacing-spacing-1: 2px;
  --spacing-spacing-2: 4px;
  --spacing-spacing-3: 6px;
  --spacing-spacing-4: 8px;
  --spacing-spacing-5: 10px;
  --spacing-spacing-6: 12px;
  --spacing-spacing-7: 16px;
  --spacing-spacing-8: 20px;
  --spacing-spacing-9: 24px;
  --spacing-spacing-10: 32px;
  --spacing-spacing-11: 40px;
  --spacing-spacing-12: 48px;
  --spacing-spacing-13: 56px;
  --spacing-spacing-14: 80px;
  --spacing-spacing-15: 144px;
  --spacing-spacing-16: 160px;
  --spacing-spacing-17: 192px;

  --radius-radius-sm: 6px;
  --radius-radius-md: 8px;
  --radius-radius-lg: 12px;
  --radius-radius-xl: 16px;
  --radius-radius-2xl: 24px;
  --radius-radius-3xl: 28px;

  --font-camera-plain-variable: "Camera Plain Variable", ui-sans-serif, system-ui, sans-serif;
}
```

## Implementation rules

- Use `#1c1c1c` for primary action. Remove orange CTA except aurora gradient decoration.
- Use `#eceae4` as page bg/header/borders structural base.
- Use `#fcfbf8` for hero cards, forms, elevated surfaces.
- Use `#f7f4ed` for muted sections/footer.
- Use `#5f5f5d` for secondary text only.
- Replace heavy shadows with border/outline: `0 0 0 2px` max.
- Radius map: inputs/buttons `12px`, cards `16–28px`, subtle chips `6–8px`.
- Mobile breakpoint priority: `<=600px`, vertical stacking.
- If Camera Plain font file missing, fallback stack allowed but keep CSS token name.
