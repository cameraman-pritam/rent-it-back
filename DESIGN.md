# Design System Specification: The Atmospheric Curator

## 1. Overview & Creative North Star
This design system is built upon the "Atmospheric Curator" North Star. We are moving away from the standard, boxy nature of typical SaaS platforms toward a high-end, editorial experience that feels like a premium lifestyle magazine. 

The aesthetic is defined by **expansive negative space, intentional asymmetry, and tonal depth**. We do not use loud shadows or harsh borders to define hierarchy; instead, we use "The Quiet Shift"—subtle changes in background luminosity and sophisticated typographic scaling to guide the eye. This system is designed to feel trustworthy through its precision and premium through its restraint.

## 2. Color & Surface Architecture
The palette is rooted in a deep, nocturnal base (`#0d1320`) punctuated by luminous teal and mint accents. 

### The "No-Line" Rule
Explicitly prohibited: 1px solid borders for sectioning or container definition. Boundaries must be defined solely through background color shifts or tonal transitions.
*   **Primary Sectioning:** Use `surface` as your base. 
*   **Content Grouping:** Transition to `surface-container-low` or `surface-container-high` to define a new area of focus. 

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers, like stacked sheets of frosted glass.
*   **Lowest Layer:** `surface_container_lowest` (#080e1b) – Use for deep background resets or footer areas.
*   **Base Layer:** `surface` (#0d1320) – The primary canvas.
*   **Elevated Content:** `surface_container` (#1a202d) and `surface_container_high` (#242a38) – Use these for cards, modules, and modals. 

### The Glass & Gradient Rule
To move beyond a flat "digital" look, apply **Glassmorphism** to floating elements (like navigation bars or hovering cards). Use a semi-transparent `surface_container` with a `backdrop-blur` of 12px–20px. 
*   **Signature Textures:** For primary CTAs or hero focal points, use a subtle linear gradient from `primary` (#6dd9c3) to `primary_container` (#46b5a1) at a 135-degree angle. This adds "soul" and prevents the mint tones from feeling clinical.

## 3. Typography: The Editorial Voice
We use **Manrope** across all scales. It is a modern, geometric sans-serif that balances the technical precision of a utility font with the warmth of a lifestyle brand.

*   **Display Scales (`display-lg` to `display-sm`):** These are our "Hero" moments. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) to create an authoritative, premium feel. 
*   **Headline & Title:** These convey the "Trust" aspect. They should be clear, confident, and never crowded.
*   **Body & Labels:** Use `body-md` (0.875rem) for most reading tasks. Ensure high contrast using `on_surface` (#dde2f5) against the dark backgrounds.
*   **Visual Hierarchy Tip:** Use `primary` (#6dd9c3) selectively for small, all-caps labels (`label-md`) to draw attention to specific metadata without shouting.

## 4. Elevation & Depth
In this design system, depth is a product of light, not lines.

*   **The Layering Principle:** Stack `surface-container` tiers to create natural lift. A `surface-container-highest` card sitting on a `surface` background provides enough contrast that no shadow is required.
*   **Ambient Shadows:** If an element must "float" (like a dropdown or modal), use an ultra-diffused shadow. 
    *   *Shadow Specs:* Blur: 40px, Spread: 0, Opacity: 8%, Color: derived from `on_background`. 
*   **The "Ghost Border" Fallback:** If a container requires a border for accessibility, use the `outline_variant` token at **15% opacity**. This creates a "whisper" of a line that defines space without cluttering the editorial flow.

## 5. Components

### Buttons
*   **Primary:** Fill with the Signature Gradient (`primary` to `primary_container`). Text in `on_primary`. High roundedness (`xl` - 0.75rem).
*   **Secondary:** No fill. Use the "Ghost Border" (15% `outline_variant`) with `on_surface` text.
*   **Tertiary:** Transparent background. Use `primary` text for "Sign Up" style actions, or `on_surface` for utility actions.

### Input Fields
*   **Styling:** Use `surface_container_high` for the field background. 
*   **Interaction:** On focus, the border should transition to 1px `primary` with a soft outer glow (using the `surface_tint` at 10% opacity).
*   **Error States:** Use `error` (#ffb4ab) only for the text and a subtle 1px border. Never fill the whole box with red.

### Cards & Lists
*   **Constraint:** Forbid the use of divider lines between list items. 
*   **Solution:** Use vertical white space (1.5rem - 2rem) and `surface` shifts. For lists, a subtle hover state change to `surface_container_low` is the preferred way to indicate interactivity.

### Interactive Chips
*   **Filter Chips:** Use `surface_container_highest` with `on_surface_variant` text. When selected, switch to `primary_container` with `on_primary_container` text.

## 6. Do's and Don'ts

### Do
*   **Do** embrace asymmetry. Center-aligned text should be reserved for the Hero; all other content should follow a sophisticated grid that allows for "breathing room."
*   **Do** use the `secondary` (#a5c8ff) and `tertiary` (#ffb5a1) colors for supporting data visualizations or secondary accents to keep the "teal" from becoming repetitive.
*   **Do** ensure all text meets WCAG AA contrast ratios, especially when using the mint accents on dark surfaces.

### Don't
*   **Don't** use 100% white (#FFFFFF). Always use `on_surface` (#dde2f5) to maintain the soft, premium "ink-on-paper" feel.
*   **Don't** use sharp corners. Stick to the `lg` (0.5rem) and `xl` (0.75rem) tokens to keep the aesthetic approachable and modern.
*   **Don't** use standard "drop shadows" with high opacity. If it looks like a "box" floating, it's too heavy for this system.