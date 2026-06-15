# Project & Architecture Decisions

This directory archives major architectural, design, and product decisions made during the life of the Shree Ganesha project.

## Purpose
* Document the reasoning behind specific technical or design choices.
* Avoid re-litigating past choices and help new team members get context quickly.
* Track design directions, color system updates, and third-party tools selections.

## File Naming Convention
* Use format: `adr-XXX-short-title.md` (e.g. `adr-001-hashrouter-for-gh-pages.md`).

## Current Log
* **ADR-001**: Use `HashRouter` instead of `BrowserRouter` to prevent 404 reload issues on GitHub Pages.
* **ADR-002**: Maintain a JSON-driven structure (`demos.json`, `products.json`) to keep the demo portal lightweight and zero-maintenance.
