import { useEffect } from 'react';

interface MetaTags {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

export function useMetaTags({ title, description, image, url }: MetaTags) {
    useEffect(() => {
        if (title) {
            document.title = title;
            updateMetaTag('og:title', title);
            updateMetaTag('twitter:title', title);
        }
        if (description) {
            updateMetaTag('description', description);
            updateMetaTag('og:description', description);
            updateMetaTag('twitter:description', description);
        }
        if (image) {
            updateMetaTag('og:image', image);
            updateMetaTag('twitter:image', image);
        }
        if (url) {
            updateMetaTag('og:url', url);
        }
        updateMetaTag('og:type', 'article');
    }, [title, description, image, url]);
}

function updateMetaTag(name: string, content: string) {
    let element = document.querySelector(`meta[property="${name}"]`) ||
        document.querySelector(`meta[name="${name}"]`);

    if (!element) {
        element = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
            element.setAttribute('property', name);
        } else {
            element.setAttribute('name', name);
        }
        document.head.appendChild(element);
    }
    element.setAttribute('content', content);
}
