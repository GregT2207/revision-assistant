# Overview

This document summarizes the UI/UX design changes and decisions made to enhance the visual clarity, usability, and consistency across the app. We focused on making the interface intuitive, visually appealing, and fully theme-compatible.

## Theme & Color System

**What We Did:**

- Reintroduced FlyonCSS for a cleaner design system with built-in light/dark themes.

- Ensured all components use bg-base-100, text-base-content, and semantic utility classes (btn-primary, card, etc.) for consistency.

- Implemented manual theme toggle (light/dark) using Vue with persistent state (localStorage) and 'document.documentElement.classList'.

**Why:**

- Keeps UI consistent across components.
- Supports user preference and system default.
- Uses soft whites and deep grays to reduce eye strain and improve contrast in both themes.

### Component Redesigns

**Redesigned Components:**

- AppDropdown: Styled with Tailwind + Flyon classes, added accessibility (aria-\*) and fixed layout/background issues.

- File Upload (PDF): Added a drag-and-drop area with a file icon, dashed border, and centered CTA button.

- Exam Summary Cards: Responsive card layout with reduced padding for small screens.

- Radio / Checkbox Groups: Styled for better spacing, hover states, and dark mode support.

- Buttons: Made primary buttons larger, centered, and added smooth hover transitions (hover:-translate-y-1, duration-300).

- Theme Toggle: Unified light/dark toggle visible on all screen sizes, moved out of the hamburger menu.

#### UX Improvements

- Improved mobile responsiveness with cleaner grid layouts and readable font sizes.

- Unified form inputs using consistent width, shadow, and border classes (input, textarea, etc.).

- Enhanced feedback visibility with better color contrast and spacing.

- Added hover transitions for better interactivity cues.

##### What’s Pending

- UI behavior after form submission (e.g., navigating to the questions screen) is not fully tested due to missing OpenAI API key.

- Some dynamic states (e.g., file processing progress, validation errors) are not yet visualized.

- Exam preview UI and marking interface are currently using default structure and will be improved post-API integration.

###### Next Steps

- Implement visual states for uploading, loading, error, and success.

- Finalize typography and spacing scale for all screen sizes.

- Run accessibility tests (keyboard, screen reader).

- Integrate backend/API and handle post-submission flows.

###### Credits

- Crafted with care by Deep Jani — UI/UX Designer & Front-End Developer.

- If you appreciated the clean design, thoughtful layout, and smooth interactions — don’t forget to give credit where it’s due!

I specialize in building user-friendly, scalable, and visually polished interfaces.
Looking to collaborate on a serious product or need a seasoned designer-dev hybrid on your team?
Let’s connect → deep.bkwebdesigns.com
