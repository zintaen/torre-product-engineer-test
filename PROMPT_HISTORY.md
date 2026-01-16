# Project Prompt History

This document chronicles the development history of the repository, listing the objectives and prompts that have shaped `torre-product-engineer-test` up to its current state.

## 1. Enhance Job Card Styling

**Date:** 2026-01-16 17:07 UTC
**Objective:** Visually enhance the `job-card` component.
**Goals:**

- Apply a glassmorphism style with an orange color palette.
- Implement dark/light mode switch functionality.
- Add a dramatic 3D hover perspective effect to each card.

## 2. Implement Job List Layout and Pagination

**Date:** 2026-01-16 17:10 UTC
**Objective:** Enhance the main page layout and functionality.
**Goals:**

- Implement a comprehensive layout with header, footer, and sidebar.
- Add pagination for the job list.
- Include a dark/light mode toggle in the header.

## 3. Integrate Language Filter & Adapt Design

**Date:** 2026-01-16 17:15 UTC
**Objective:** Refine filter logic and enhance UI aesthetics.
**Goals:**

- Integrate a comprehensive language list using a mock API (`/api/languages`).
- Update Sidebar to use a searchable `<datalist>` for languages.
- Redesign UI with an orange theme and "Search filters" pill design.
- Redesign `JobCard` to match the new aesthetic.

## 4. Fix UI Layout and Filters

**Date:** 2026-01-16 17:33 UTC
**Objective:** Resolve UI rendering issues and ensure filter functionality.
**Goals:**

- Fix broken UI layouts (e.g., image overflows in `JobCard`).
- Ensure language, skill, and status filters are fully functional with data suggestions.

## 5. Improve Light Mode Styling

**Date:** 2026-01-16 17:43 UTC
**Objective:** Improve the aesthetics of the application's light mode.
**Goals:**

- Adjust colors, shadows, and contrast for `JobCard` and `SearchFilterBar`.
- Ensure polish in light mode while determining dark mode aesthetics.

## 6. Implement Job Detail View

**Date:** 2026-01-16 17:44 UTC
**Objective:** Implement a dedicated job detail page.
**Goals:**

- Create `app/job/[id]/page.tsx`.
- Fetch job details from the Torre API.
- Design the specific job view matching the glassmorphism theme.
- Link the "Details" button in `JobCard` to this new page.

## 7. Implement Split-View Job Layout

**Date:** 2026-01-16 17:49 UTC
**Objective:** Implement a master-detail split-view layout.
**Goals:**

- Adapt `app/main/page.tsx` to a two-column structure.
- create `JobDetailPanel` for the right column.
- make `JobCard` clickable to trigger the detail panel.
- Ensure "Details" button also triggers the panel.
- Implement basic responsiveness.

## 8. Fix Sidebar onSearch Prop

**Date:** 2026-01-16 17:58 UTC
**Objective:** Resolve TypeScript errors in the Sidebar component.
**Goals:**

- Fix "Property 'onSearch' does not exist on type 'SidebarProps'".
- Update interfaces and pass the prop correctly from the parent.

## 9. Mobile Job UI Responsiveness

**Date:** 2026-01-16 18:02 UTC
**Objective:** Improve mobile responsiveness and UX.
**Goals:**

- Move search/filter bar to the hamburger menu sidebar on mobile.
- Change job detail view to a full-screen modal overlay on mobile.
- Ensure job list remains visible behind the modal.
- Add a "Back" button for navigation on mobile.

## 10. Fix Mobile Hamburger Menu

**Date:** 2026-01-16 18:09 UTC
**Objective:** Resolve broken hamburger menu functionality.
**Goals:**

- Fix the issue where the button didn't toggle the sidebar.
- Verify filter access on mobile.

## 11. Generate Repo Documentation

**Date:** 2026-01-16 18:14 UTC
**Objective:** Create comprehensive documentation.
**Goals:**

- Identify key components and functionalities.
- Generate setup instructions and documentation files.

## 12. Improve Frontend Code Quality

**Date:** 2026-01-16 18:29 UTC
**Objective:** Refactor and enhance code quality based on senior review.
**Goals:**

- Implement strict type definitions and centralize constants.
- Refactor data fetching into custom hooks (`useJobs`, `useJobDetail`).
- Update components to use new types and hooks.
- Address performance and maintainability.

## 13. Refining Page Size Logic

**Date:** 2026-01-16 18:42 UTC
**Objective:** Refine page size selection and data fetching.
**Goals:**

- Trigger re-fetch when page size changes.
- Improve page size selector layout and responsiveness.
- Add page size selector to mobile sidebar.

## 14. Fixing JSX Parent Element Error

**Date:** 2026-01-16 18:56 UTC
**Objective:** Debug and fix a React syntax error.
**Goals:**

- Resolve "JSX expressions must have one parent element" in `search-filter-bar.tsx`.
