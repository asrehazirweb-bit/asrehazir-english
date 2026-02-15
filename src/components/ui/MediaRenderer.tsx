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
 * Production-ready with proper video controls and responsive design
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
    // Determine if content is video - PRIORITY: type field, then videoUrl presence
    const isVideo = type === 'video' || (videoUrl && videoUrl.length > 0);

    // Get final media URL - PRIORITY: mediaUrl, then type-specific URL
    const finalMediaUrl = mediaUrl || (isVideo ? videoUrl : imageUrl);

    // Fallback for missing media - NO PLACEHOLDERS
    if (!finalMediaUrl) {
        return (
            <div className={`flex items-center justify-center bg-gray-200 dark:bg-gray-800 ${className}`}>
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center p-4">
                    Media unavailable
                </p>
            </div>
        );
    }

    // RENDER VIDEO with all production attributes
    if (isVideo) {
        return (
            <div className="relative group w-full h-full">
                <video
                    src={finalMediaUrl}
                    controls
                    playsInline  // CRITICAL: For mobile autoplay
                    preload="metadata"  // Load metadata only
                    className={`w-full h-full rounded-md ${className} ${videoClassName}`}
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        objectFit: 'contain'  // Maintain aspect ratio
                    }}
                    controlsList="nodownload"  // Prevent download
                >
                    <source src={finalMediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {showVideoIcon && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/10">
                        <div className="w-14 h-14 bg-white/95 dark:bg-black/95 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                            <Play size={24} className="text-red-600 fill-current ml-1" />
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // RENDER IMAGE - Standard img tag
    return (
        <img
            src={finalMediaUrl}
            alt={alt}
            className={className}
            loading="lazy"
            style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'cover'
            }}
        />
    );
};

export default MediaRenderer;
