import React, { useEffect } from 'react';
import { DocArticle } from '../data/docsData';

interface SEOHeadProps {
  currentPath: string;
  activeArticle?: DocArticle;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ currentPath, activeArticle }) => {
  useEffect(() => {
    let title = 'Spinx — Fast by default. Disciplined by design.';
    let description =
      'The PHP framework where the runtime, module architecture, and frontend pipeline share one config file and one boot sequence. High-throughput coroutine performance.';
    let canonicalUrl = `https://spinx.dev${currentPath}`;

    if (currentPath.startsWith('/docs') && activeArticle) {
      title = `${activeArticle.title} | Spinx Framework Docs`;
      description = activeArticle.description || activeArticle.subtitle;
    }

    // Update document title
    document.title = title;

    // Helper to update meta tag content
    const updateMetaTag = (nameOrProperty: string, content: string, isProperty = false) => {
      const selector = isProperty
        ? `meta[property="${nameOrProperty}"]`
        : `meta[name="${nameOrProperty}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', nameOrProperty);
        } else {
          element.setAttribute('name', nameOrProperty);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMetaTag('description', description);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:url', canonicalUrl, true);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Update dynamic JSON-LD TechArticle schema for docs
    const existingScript = document.getElementById('dynamic-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    if (currentPath.startsWith('/docs') && activeArticle) {
      const script = document.createElement('script');
      script.id = 'dynamic-jsonld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: activeArticle.title,
        description: description,
        url: canonicalUrl,
        dateModified: '2026-08-12',
        author: {
          '@type': 'Organization',
          name: 'Spinx Framework Team',
          url: 'https://spinx.dev',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Spinx Framework',
          logo: {
            '@type': 'ImageObject',
            url: 'https://spinx.dev/assets/logo.png',
          },
        },
      });
      document.head.appendChild(script);
    }
  }, [currentPath, activeArticle]);

  return null;
};
