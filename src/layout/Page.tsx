import { Helmet } from "react-helmet-async";

function Page({
  children,
  title,
  description,
  keywords,
  author,
  robots,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  ogType,
  twitterCard,
  twitterTitle,
  twitterDescription,
  twitterImage,
  noIndex,
  noFollow,
  themeColor,
  viewport = "width=device-width, initial-scale=1.0",
  charset = "UTF-8",
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  robots?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  themeColor?: string;
  viewport?: string;
  charset?: string;
}) {
  // Build robots meta tag
  let robotsContent = "";
  if (noIndex) robotsContent += "noindex, ";
  if (noFollow) robotsContent += "nofollow, ";
  if (robots) robotsContent += robots;
  robotsContent = robotsContent.replace(/,\s*$/, "");

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords.join(", ")} />}
        {author && <meta name="author" content={author} />}
        {robotsContent && <meta name="robots" content={robotsContent} />}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        {charset && <meta charSet={charset} />}
        {viewport && <meta name="viewport" content={viewport} />}
        {themeColor && <meta name="theme-color" content={themeColor} />}

        {/* Open Graph / Facebook */}
        {ogTitle && <meta property="og:title" content={ogTitle} />}
        {ogDescription && (
          <meta property="og:description" content={ogDescription} />
        )}
        {ogImage && <meta property="og:image" content={ogImage} />}
        {ogUrl && <meta property="og:url" content={ogUrl} />}
        {ogType && <meta property="og:type" content={ogType} />}

        {/* Twitter Card */}
        {twitterCard && <meta name="twitter:card" content={twitterCard} />}
        {twitterTitle && <meta name="twitter:title" content={twitterTitle} />}
        {twitterDescription && (
          <meta name="twitter:description" content={twitterDescription} />
        )}
        {twitterImage && <meta name="twitter:image" content={twitterImage} />}
      </Helmet>

      <div>{children}</div>
    </>
  );
}

export default Page;
