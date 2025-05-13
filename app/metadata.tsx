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
        title: metadata.title ?? "",
        icons: metadata.favicon ?? "",
        other: {
            "language": "en-AU",
            "HandheldFriendly": "True",
            "apple-mobile-web-app-capable": "yes",
            "format-detection": "telephone=no",

            "referrer": "no-referrer",
            "robots": metadata.robotsBad ? "noindex, nofollow" : "",

            "application-name": metadata.title ?? "",
            "url": metadata.url ?? "",

            "author": metadata.author ?? "",
            "designer": metadata.designer ?? "",
            "reply-to": metadata.replyTo ?? "",
            "keywords": metadata.keywords ?? "",
            "topic": metadata.topic ?? "",
            "description": metadata.description ?? "",
            "theme-color": metadata.themeColor ?? "",
            "copyright": metadata.copyright ?? "",

            "og:title": metadata.title ?? "",
            "og:type": metadata.ogType ?? "website",
            "og:url": metadata.url ?? "",
            "og:description": metadata.description ?? "",
            "og:image": metadata.previewImage ?? "",
            "og:email": metadata.replyTo ?? "",
            "og:locality": "Sydney",
            "og:region": "NSW",
            "og:country-name": "Australia",

            "twitter:card": metadata.previewImage ? "summary_large_image" : "summary",
            "twitter:title": metadata.title ?? "",
            "twitter:description": metadata.description ?? "",
            "twitter:image": metadata.previewImage ?? ""
        }
    };
}
