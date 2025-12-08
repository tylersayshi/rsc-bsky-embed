export interface BskyEmbedProps {
 /** The Bluesky post URL (e.g., https://bsky.app/profile/handle/post/postid) */
 url: string;
 /** Maximum width in pixels (220-600, default: 600) */
 maxWidth?: number;
 /** Color mode for the embed */
 colorMode?: "light" | "dark" | "system";
}

interface OEmbedResponse {
 type: "rich";
 version: "1.0";
 author_name: string;
 author_url: string;
 provider_name: "Bluesky Social";
 provider_url: "https://bsky.app";
 cache_age: number;
 width: number;
 height: null;
 html: string;
}

async function getOEmbed(url: string, maxWidth?: number): Promise<OEmbedResponse> {
 const params = new URLSearchParams({ url });

 if (maxWidth !== undefined) {
  params.set("maxwidth", String(maxWidth));
 }

 const response = await fetch(`https://embed.bsky.app/oembed?${params}`);

 if (!response.ok) {
  throw new Error(`Failed to fetch oEmbed: ${response.status} ${response.statusText}`);
 }

 return response.json() as Promise<OEmbedResponse>;
}

/**
 * A React Server Component that embeds a Bluesky post using the oEmbed API.
 *
 * Fetches embed HTML from Bluesky's oEmbed endpoint and renders the post
 * as an interactive widget. Supports customizable width and color modes.
 *
 * @see {@link https://docs.bsky.app/docs/advanced-guides/oembed} Bluesky oEmbed API documentation
 *
 * @param url - The Bluesky post URL to embed (must match `https://bsky.app/profile/.../post/...`)
 * @param maxWidth - Maximum width in pixels, between 220-600 (default: 600)
 * @param colorMode - Color theme: "light", "dark", or "system" (default: "system")
 * @returns A React element containing the embedded post - same as https://embed.bsky.app result
 *
 * @example
 * <BskyEmbed url="https://bsky.app/profile/tylur.dev/post/3m34dacmoyc2g" />
 *
 * @example
 * <BskyEmbed
 *   url="https://bsky.app/profile/tylur.dev/post/3m34dacmoyc2g"
 *   maxWidth={400}
 *   colorMode="dark"
 * />
 */
export async function BskyEmbed({ url, maxWidth, colorMode = "system" }: BskyEmbedProps) {
 const oembed = await getOEmbed(url, maxWidth);

 const html = oembed.html.replace("<blockquote", `<blockquote data-bluesky-embed-color-mode="${colorMode}"`);

 return <div dangerouslySetInnerHTML={{ __html: html }} suppressHydrationWarning />;
}
