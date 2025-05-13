import { Metadata } from "next";

type HeadMetadata = {
    robotsBad?: boolean;

    title?: string;
    url?: string;
    favicon?: string;
    previewImage?: string;

    author?: string;
    designer?: string;
    replyTo?: string;
    keywords?: string;
    topic?: string;
    description?: string;
    themeColor?: string;
    copyright?: string;

    ogType?: string;
};

export function headMetadata(metadata: HeadMetadata): Metadata {
    return {
        title: metadata.title ?? null,
        icons: metadata.favicon ?? null,
        other: {
            "language": "en-AU",
            "HandheldFriendly": "True",
            "apple-mobile-web-app-capable": "yes",
            "format-detection": "telephone=no",

            "referrer": "no-referrer",
            "robots": metadata.robotsBad ? "noindex, nofollow" : null,

            "application-name": metadata.title ?? null,
            "url": metadata.url ?? null,

            "author": metadata.author ?? null,
            "designer": metadata.designer ?? null,
            "reply-to": metadata.replyTo ?? null,
            "keywords": metadata.keywords ?? null,
            "topic": metadata.topic ?? null,
            "description": metadata.description ?? null,
            "theme-color": metadata.themeColor ?? null,
            "copyright": metadata.copyright ?? null,

            "og:title": metadata.title ?? null,
            "og:type": metadata.ogType ?? "website",
            "og:url": metadata.url ?? null,
            "og:description": metadata.description ?? null,
            "og:image": metadata.previewImage ?? null,
            "og:email": metadata.replyTo ?? null,
            "og:locality": "Sydney",
            "og:region": "NSW",
            "og:country-name": "Australia",

            "twitter:card": metadata.previewImage ? "summary_large_image" : "summary",
            "twitter:title": metadata.title ?? null,
            "twitter:description": metadata.description ?? null,
            "twitter:image": metadata.previewImage ?? null
        }
    };
}
