# My Docs - Documentation Platform

![App Preview](https://imgix.cosmicjs.com/40922af0-526d-11f1-8305-f921d082af6c-autopilot-photo-1555066931-4365d14bab8c-1779076461335.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern documentation platform built with Next.js 16 and Cosmic CMS.

## Features

- 📁 Section-organized documentation pages
- 📄 Rich article content with markdown support
- 💻 Syntax-highlighted code samples
- 🔖 Version tracking and release notes
- 📋 Comprehensive changelog with categorized entries
- 🎨 Beautiful, responsive design
- ⚡ Fast static generation with Next.js
- 🔍 Easy navigation between sections and articles

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a0a8d1fa6022ba888908345&clone_repository=6a0a8e35a6022ba888908382)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a documentation site with documentation pages organized by section, version info, and a changelog.
>
> User instructions: A documentation site with sections, articles, a changelog, and code samples"

### Code Generation Prompt

> Build a Next.js application for a content management system called "My Docs". The content is managed in Cosmic CMS with the following object types: sections, versions, articles, changelog-entries. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A documentation site with sections, articles, a changelog, and code samples

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic SDK** - Content management
- **react-markdown** - Markdown rendering
- **react-syntax-highlighter** - Code highlighting

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the required content types

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Set up your environment variables (automatically configured)
4. Run the development server:
   ```bash
   bun dev
   ```

## Cosmic SDK Examples

### Fetching all sections
```typescript
const response = await cosmic.objects
  .find({ type: 'sections' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

### Fetching articles by section
```typescript
const response = await cosmic.objects
  .find({ type: 'articles', 'metadata.section': sectionId })
  .depth(1);
```

### Fetching changelog entries
```typescript
const response = await cosmic.objects
  .find({ type: 'changelog-entries' })
  .depth(1);
```

## Cosmic CMS Integration

The app uses four content types from Cosmic:
- **Sections** - Documentation categories
- **Articles** - Documentation pages with code samples
- **Versions** - Release version information
- **Changelog Entries** - Changelog updates with types

## Deployment Options

Deploy to Vercel, Netlify, or any platform supporting Next.js. Set environment variables `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` in your hosting platform.

<!-- README_END -->