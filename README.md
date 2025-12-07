# rsc-bsky-embed

A React Server Component for embedding Bluesky posts using the [oEmbed API](https://docs.bsky.app/docs/advanced-guides/oembed).

## Installation

```bash
npm install rsc-bsky-embed
```

## Usage

```tsx
import { BskyEmbed } from "rsc-bsky-embed";

export default function Page() {
  return <BskyEmbed url="https://bsky.app/profile/tylur.dev/post/3m34dacmoyc2g" />;
}
```

### With Options

```tsx
<BskyEmbed
  url="https://bsky.app/profile/tylur.dev/post/3m34dacmoyc2g"
  maxWidth={400}
  colorMode="dark"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `url` | `string` | required | Bluesky post URL (`https://bsky.app/profile/*/post/*`) |
| `maxWidth` | `number` | `600` | Maximum width in pixels (220-600) |
| `colorMode` | `"light" \| "dark" \| "system"` | `"system"` | Color theme for the embed |

## Requirements

React 18+ with Server Components support (Next.js App Router, Waku, etc.)
