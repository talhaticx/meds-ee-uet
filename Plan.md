# Sanity to Keystatic Migration Plan

This plan covers the final migration of the current Astro site from the Sanity-style data layer to a Keystatic-backed local content workflow. The goal is to keep the real Astro UI in `src/`, remove Sanity runtime assumptions, and make all editable research content available through `/keystatic`.

## 1. Current Project Audit

### Current Astro app to keep

- `src/pages/index.astro`
- `src/pages/about.astro`
- `src/pages/blog/index.astro`
- `src/pages/blog/[slug].astro`
- `src/pages/projects/index.astro`
- `src/pages/projects/[slug].astro`
- `src/pages/publications.astro`
- `src/pages/activities.astro`
- `src/layouts/BaseLayout.astro`
- `src/components/*`
- `src/styles/global.css`

### Sanity-style pieces to replace

- `src/lib/sanity.ts`
  - Imports `@sanity/image-url`.
  - Imports `sanity:client`.
  - Provides `safeFetch()` fallback behavior.
  - Provides `urlFor()` for Sanity image assets.
- `src/lib/content.ts`
  - Uses GROQ projection strings.
  - Calls `safeFetch()` for Sanity queries.
  - Falls back to arrays from `src/lib/demo.ts`.
- `src/lib/types.ts`
  - Uses `@portabletext/types`.
  - Defines `PortableContent` as Sanity Portable Text.
- `src/lib/portableText.ts`
  - Provides Astro Portable Text components.
- `src/components/portable/PortableImage.astro`
  - Resolves Sanity image assets through `urlFor()`.
- `src/components/portable/PortableCode.astro`
  - Renders Sanity custom code blocks.
- Detail pages import `astro-portabletext`.
- Visible copy and links still say Sanity:
  - `src/pages/index.astro`
  - `src/components/Navbar.astro`
  - `src/components/Footer.astro`
  - `src/env.d.ts`

### Existing Keystatic setup

- `astro.config.mjs` already includes:
  - `@astrojs/react`
  - `@astrojs/markdoc`
  - `@keystatic/astro`
- `keystatic.config.ts` exists but only defines a basic `posts` collection.
- `README.md` already points to `/keystatic`.
- `src-old/` contains a starter Astro content collection example. Treat this as reference only, not production code.

### Immediate build risk

`package.json` does not include Sanity or Portable Text dependencies, but current source imports Sanity modules and `astro-portabletext`. The migration should remove these imports before relying on `npm run build`.

## 2. Target Architecture

Use Keystatic as the editorial layer and local files as the source of truth.

Recommended content layout:

```txt
src/content/
  posts/
    tapeout-readiness-spring-riscv-core.mdoc
  projects/
    aurora-risc-v-soc.mdoc
  members/
    amina-shah.yaml
  publications/
    low-power-risc-v-core.yaml
  activities/
    open-hardware-hack-night.yaml

src/assets/images/
  posts/
  projects/
  members/
  activities/
```

Recommended data access pattern:

- Keep page imports stable by preserving `src/lib/content.ts`.
- Add `src/content.config.ts` and use Astro content collections to read and render Keystatic-authored files.
- Use Keystatic as the editor and Astro content collections as the site runtime API.
- Keep normalized return functions:
  - `getMembers()`
  - `getPosts()`
  - `getPostBySlug(slug)`
  - `getProjects()`
  - `getProjectBySlug(slug)`
  - `getPublications()`
  - `getActivities()`
  - `getHomeSummaries()`
- Change rich body fields from Portable Text arrays to Markdoc content rendered through Astro's `render()` helper.

## 3. Keystatic Content Model

Update `keystatic.config.ts` to import `singleton` if needed, and define all collections used by the site.

### Posts collection

Path:

```ts
path: 'src/content/posts/*'
```

Format:

```ts
format: { contentField: 'content' }
```

Fields:

- `title`: `fields.slug({ name: { label: 'Title' } })`
- `publishedAt`: `fields.datetime({ label: 'Published at', validation: { isRequired: true } })`
- `author`: `fields.relationship({ label: 'Author', collection: 'members' })`
- `mainImage`: `fields.image({ label: 'Main image', directory: 'src/assets/images/posts', publicPath: '../../assets/images/posts/' })`
- `mainImageAlt`: `fields.text({ label: 'Main image alt text' })`
- `excerpt`: `fields.text({ label: 'Excerpt', multiline: true })`
- `content`: `fields.markdoc({ label: 'Content', options: { image: { directory: 'src/assets/images/posts', publicPath: '../../assets/images/posts/' } } })`

Sorting:

- Sort posts by `publishedAt` descending in `src/lib/content.ts`.

### Projects collection

Path:

```ts
path: 'src/content/projects/*'
```

Format:

```ts
format: { contentField: 'content' }
```

Fields:

- `title`: slug field
- `status`: select field with `Active` and `Completed`
- `abstract`: multiline text
- `techStack`: array of text items
- `heroImage`: image field stored in `src/assets/images/projects`
- `heroImageAlt`: text
- `featuredOrder`: integer or number field for homepage ordering
- `content`: Markdoc field

Sorting:

- Prefer `featuredOrder` for homepage featured projects.
- Use title or explicit order for project index unless a date field is added.

### Members collection

Path:

```ts
path: 'src/content/members/*'
```

Format:

```ts
format: 'yaml'
```

Fields:

- `name`: slug field or plain text plus slug field
- `role`: text
- `bio`: multiline text
- `linkedin`: URL
- `image`: image field stored in `src/assets/images/members`
- `imageAlt`: text
- `sortOrder`: integer

Usage:

- Posts reference members through `fields.relationship`.
- `getPosts()` resolves each author slug to a normalized member object.

### Publications collection

Path:

```ts
path: 'src/content/publications/*'
```

Format:

```ts
format: 'yaml'
```

Fields:

- `title`: slug field or text plus slug
- `authors`: text
- `publishedDate`: date
- `venue`: text
- `link`: URL

Sorting:

- Sort by `publishedDate` descending.

### Activities collection

Path:

```ts
path: 'src/content/activities/*'
```

Format:

```ts
format: 'yaml'
```

Fields:

- `title`: slug field or text plus slug
- `date`: datetime
- `location`: text
- `description`: multiline text
- `imageGallery`: array of objects:
  - `image`: image field stored in `src/assets/images/activities`
  - `alt`: text

Sorting:

- Sort by `date` descending.

### Optional site singleton

Add this only if homepage hero text, stats, mission, and capabilities need editor control.

Path:

```ts
path: 'src/content/site/home'
```

Fields:

- Hero eyebrow, title, description
- CTA labels and URLs
- Stats array
- Featured program card copy
- Mission copy
- Capabilities array

For the first migration, this can stay hardcoded to reduce scope.

## 4. Data Layer Migration

### Add Astro content collections for Keystatic files

Create `src/content.config.ts` with collections that match the files Keystatic writes.

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    publishedAt: z.string(),
    author: z.string().nullable().optional(),
    mainImage: z.string().nullable().optional(),
    mainImageAlt: z.string().nullable().optional(),
    excerpt: z.string().nullable().optional(),
  }),
});

export const collections = { posts };
```

Expand this with `projects`, `members`, `publications`, and `activities`.

Then rewrite `src/lib/content.ts` around `getCollection()` and `getEntry()` from `astro:content`.

Example normalized post shape:

```ts
{
  title: post.data.title,
  slug: post.id,
  publishedAt: post.data.publishedAt,
  author,
  mainImageUrl: post.data.mainImage,
  mainImageAlt: post.data.mainImageAlt || post.data.title,
  bodyText: post.data.excerpt,
  entry: post,
}
```

Important decisions:

- Rename `body` to `entry` or `contentEntry` in the shared type, or keep `body` temporarily as an alias for the Astro content entry while templates are migrated.
- Prefer explicit `excerpt` over trying to derive text from Markdoc.
- Resolve author relationships by looking up `members` entries by slug.
- Remove fallback demo behavior after seed files exist.

### Optional Keystatic reader usage

The installed Keystatic package includes `createReader()` from `@keystatic/core/reader`, but the safer first migration path for this Astro project is Astro content collections because:

- The starter code in `src-old/` already demonstrates `getCollection()`, `getEntry()`, and `render()`.
- Detail pages need rendered Markdoc components, not just raw Markdoc data.
- Astro content collections give route generation and rendering in one familiar API.

Use `createReader()` later only if a server-only API needs direct Keystatic reads outside Astro pages.

### Update types

Change `src/lib/types.ts`:

- Remove `@portabletext/types`.
- Replace `PortableContent` with a Keystatic/Markdoc-friendly field type, or avoid exporting a rich body type entirely.
- Keep stable interfaces for pages where useful:
  - `Member`
  - `Post`
  - `Project`
  - `Publication`
  - `Activity`

Recommended page-facing rich content fields:

```ts
entry?: unknown;
bodyText?: string;
```

Use stricter Astro content entry types once `src/content.config.ts` is in place.

## 5. Page Rendering Changes

### Blog detail page

File:

```txt
src/pages/blog/[slug].astro
```

Changes:

- Remove:
  - `portableTextComponents`
  - `PortableText`
- Render the Astro content entry that Keystatic writes.
- Follow the pattern from the Keystatic starter:

```astro
import { render } from 'astro:content';

const { Content } = await render(post.entry);
```

Final goal:

```astro
<article class="surface px-6 py-8 sm:px-8">
  <Content />
</article>
```

### Project detail page

File:

```txt
src/pages/projects/[slug].astro
```

Apply the same Portable Text to Markdoc replacement as blog details.

### Index/list pages

Files:

- `src/pages/index.astro`
- `src/pages/blog/index.astro`
- `src/pages/projects/index.astro`
- `src/pages/about.astro`
- `src/pages/publications.astro`
- `src/pages/activities.astro`

Changes:

- Keep current UI structure.
- Ensure image fields point to local Keystatic image paths.
- Use `excerpt` for blog cards.
- Keep date formatting through `src/lib/format.ts`.
- Replace visible Sanity copy with Keystatic/editorial wording.

### Admin links

Files:

- `src/components/Navbar.astro`
- `src/components/Footer.astro`

Changes:

- Replace `/sanity` with `/keystatic`.
- Change label from `Studio` to `Admin` or `Editor`.

## 6. Remove Sanity and Portable Text Code

Delete after pages compile with Markdoc:

- `src/lib/sanity.ts`
- `src/lib/portableText.ts`
- `src/components/portable/PortableImage.astro`
- `src/components/portable/PortableCode.astro`

Update:

- `src/env.d.ts`
  - Remove `/// <reference types="@sanity/astro/module" />`

Confirm no remaining imports:

```bash
rg -n "sanity|Sanity|groq|PortableText|portableText|astro-portabletext|@portabletext|@sanity|sanity:client" src keystatic.config.ts astro.config.mjs package.json
```

## 7. Seed Content Migration

Create real Keystatic content from the current demo data in `src/lib/demo.ts`.

### Members

Create one YAML file per member:

- `src/content/members/amina-shah.yaml`
- `src/content/members/bilal-khan.yaml`
- `src/content/members/sara-iqbal.yaml`
- `src/content/members/zain-abbas.yaml`

Move remote Unsplash images either:

- Into local `src/assets/images/members`, preferred for stable builds.
- Or keep external URLs only if the Keystatic schema supports URL image fields separately.

### Posts

Create one `.mdoc` file per post:

- `src/content/posts/tapeout-readiness-spring-riscv-core.mdoc`
- `src/content/posts/accelerator-lab-up-to-speed.mdoc`
- `src/content/posts/workshop-notes-open-hardware-flows.mdoc`

Convert Portable Text blocks to Markdown/Markdoc body content.

Convert Sanity code objects to fenced code blocks:

````md
```verilog
module pipeline_top (...);
```
````

### Projects

Create one `.mdoc` file per project:

- `src/content/projects/aurora-risc-v-soc.mdoc`
- `src/content/projects/tensoredge-fpga-accelerator.mdoc`
- `src/content/projects/noc-instrumentation-suite.mdoc`

Convert project Portable Text body to Markdoc.

### Publications

Create YAML files for the three current demo publications.

### Activities

Create YAML files for the three current demo activities.

Move gallery images to local assets where possible.

## 8. Astro Content Collections Decision

There are two viable routes:

### Preferred route: Astro content collections

- Add `src/content.config.ts`.
- Use `getCollection()`, `getEntry()`, and `render()`.
- Keep all content access helpers in `src/lib/content.ts`.
- This is the most reliable route for rendering `.mdoc` pages in Astro.

### Alternative route: Keystatic reader only

- Use `@keystatic/core/reader`.
- Do not add `src/content.config.ts`.
- Keep all content access inside `src/lib/content.ts`.
- This can be useful for non-page data, but requires extra renderer decisions for rich Markdoc content.

Recommendation:

Use Astro content collections first. Keystatic remains the editor, and Astro becomes the runtime reader and renderer.

## 9. Dependency Cleanup

`package.json` currently looks Keystatic-oriented. After code cleanup, confirm that no Sanity packages are needed.

Keep:

- `@keystatic/astro`
- `@keystatic/core`
- `@astrojs/markdoc`
- `@astrojs/react`
- `react`
- `react-dom`
- `astro`

Remove if present later:

- `@sanity/astro`
- `@sanity/client`
- `@sanity/image-url`
- `astro-portabletext`
- `@portabletext/types`

Run after package edits:

```bash
npm install
```

## 10. Styling and UX Improvements During Migration

Keep this scope small while replacing the CMS:

- Preserve the existing page layouts and visual language.
- Replace all Sanity wording with Keystatic or neutral editorial wording.
- Add empty states for collections:
  - No posts yet
  - No projects yet
  - No activities yet
- Ensure cards still render gracefully when optional images are missing.
- Use local image alt fields consistently.
- Keep `/keystatic` easy to find from navbar and footer.

## 11. Verification Checklist

Run these checks after migration:

```bash
npm run build
```

```bash
npm run dev
```

Manual browser checks:

- `/`
- `/about`
- `/blog`
- `/blog/tapeout-readiness-spring-riscv-core`
- `/projects`
- `/projects/aurora-risc-v-soc`
- `/publications`
- `/activities`
- `/keystatic`

Search checks:

```bash
rg -n "sanity|Sanity|groq|PortableText|portableText|astro-portabletext|@portabletext|@sanity|sanity:client" src keystatic.config.ts astro.config.mjs package.json
```

Expected result:

- No Sanity or Portable Text references remain, except in old archived files if `src-old/` is intentionally kept.

Content checks:

- Each collection appears in Keystatic.
- Creating a new post generates a `.mdoc` file under `src/content/posts`.
- Uploading a post image writes to `src/assets/images/posts`.
- Blog detail pages render Markdoc content.
- Project detail pages render Markdoc content.
- Author relationships resolve on blog cards and detail pages.
- Publications and activities sort newest first.

## 12. Suggested Implementation Order

1. Expand `keystatic.config.ts` with posts, projects, members, publications, and activities.
2. Seed `src/content/**` files from `src/lib/demo.ts`.
3. Rewrite `src/lib/types.ts` to remove Portable Text.
4. Rewrite `src/lib/content.ts` to use the Keystatic reader.
5. Update blog and project detail pages to render Markdoc instead of Portable Text.
6. Update navbar, footer, homepage copy, and `src/env.d.ts`.
7. Delete Sanity and Portable Text helper files.
8. Run the Sanity reference search and fix anything remaining in `src/`.
9. Run `npm run build`.
10. Run `npm run dev` and manually verify all public pages plus `/keystatic`.

## 13. Definition of Done

The migration is complete when:

- All visible site pages render from Keystatic/local files.
- `/keystatic` is the only admin/editor route linked in the UI.
- `src/` contains no Sanity imports, GROQ queries, Sanity image helpers, or Portable Text rendering.
- Demo arrays are no longer used for production content.
- The site builds successfully.
- A new editor can add posts, projects, members, publications, and activities from Keystatic without touching code.
