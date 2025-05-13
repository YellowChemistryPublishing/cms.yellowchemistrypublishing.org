export default function MMMMetadata(props) {
    return (
        <>
            {/* Common */}

            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="language" content="en-AU" />
            <meta http-equiv="Content-Language" content="en-AU" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="HandheldFriendly" content="True" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="format-detection" content="telephone=no" />

            <meta http-equiv="X-Content-Type-Options" content="nosniff" />
            <meta name="referrer" content="no-referrer" />
            {props.robotsBad && <meta name="robots" content="noindex, nofollow" />}

            {props.title && (
                <>
                    <title>{props.title}</title>
                    <meta name="application-name" content={props.title} />
                </>
            )}
            {props.url && <meta name="url" content={props.url} />}
            {props.favicon && <link rel="icon" href={props.favicon} />}

            {props.author && <meta name="author" content={props.author} />}
            {props.designer && <meta name="designer" content={props.designer} />}
            {props.reply_to && <meta name="reply-to" content={props.reply_to} />}
            {props.keywords && <meta name="keywords" content={props.keywords} />}
            {props.topic && <meta name="topic" content={props.topic} />}
            {props.description && <meta name="description" content={props.description} />}
            {props.theme_color && <meta name="theme-color" content={props.theme_color} />}
            {props.copyright && <meta name="copyright" content={props.copyright} />}

            {/* Open Graph */}

            {props.title && <meta property="og:title" content={props.title} />}
            <meta property="og:type" content={props.og_type ?? "website"} />
            {props.url && <meta name="og:url" content={props.url} />}
            {props.description && <meta property="og:description" content={props.description} />}
            {props.preview_image && <meta property="og:image" content={props.preview_image} />}
            {props.reply_to && <meta name="og:email" content={props.reply_to} />}
            <meta name="og:locality" content="Sydney" />
            <meta name="og:region" content="NSW" />
            <meta name="og:country-name" content="Australia" />

            {/* Twatter */}

            {props.preview_image ? <meta name="twitter:card" content="summary_large_image" /> : <meta name="twitter:card" content="summary" />}
            {props.title && <meta name="twitter:title" content={props.title} />}
            {props.description && <meta name="twitter:description" content={props.description} />}
            {props.preview_image && <meta property="twitter:image" content={props.preview_image} />}
        </>
    );
}
