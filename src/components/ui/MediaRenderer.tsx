import React from 'react';
import { Play } from 'lucide-react';

interface MediaRendererProps {
    type?: 'image' | 'video';
    mediaUrl?: string;
    imageUrl?: string;
    videoUrl?: string;
    alt: string;
    className?: string;
    showVideoIcon?: boolean;
    videoClassName?: string;
}

/**
 * MediaRenderer - Renders either image or video based on content type
 * Supports both new (type + mediaUrl) and legacy (imageUrl + videoUrl) formats
 */
const MediaRenderer: React.FC<MediaRendererProps> = ({
    type,
    mediaUrl,
    imageUrl,
    videoUrl,
    alt,
    className = '',
    showVideoIcon = false,
    videoClassName = ''
}) => {
    // Determine if content is video
    const isVideo = type === 'video' || videoUrl;
    const finalMediaUrl = mediaUrl || (isVideo ? videoUrl : imageUrl);

    if (!finalMediaUrl) {
        // Fallback for missing media
        return (
            <div className={`flex items-center justify-center bg-gray-200 dark:bg-gray-800 ${className}`}>
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center p-4">
                    Media unavailable
                </p>
            </div>
        );
    }

    if (isVideo) {
        return (
            <div className="relative group">
                <video
                    src={finalMediaUrl}
                    className={`${className} ${videoClassName}`}
                    style={{ maxWidth: '100%', height: 'auto' }}
                    preload="metadata"
                    controls={!showVideoIcon} // Hide controls if we're showing icon overlay
                    poster={imageUrl} // Use imageUrl as poster if available
                >
                    <source src={finalMediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {showVideoIcon && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-14 h-14 bg-white/90 dark:bg-black/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play size={24} className="text-red-600 fill-current ml-1" />
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Render image
    return (
        <img
            src={finalMediaUrl}
            alt={alt}
            className={className}
            loading="lazy"
        />
    );
};

export default MediaRenderer;
