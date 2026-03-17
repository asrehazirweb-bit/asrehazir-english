

import { useAds } from '../../hooks/useAds';

interface AdBlockProps {
    className?: string;
    label?: string;
    placement?: string;
    customImage?: string;
    customLink?: string;
}

export function AdBlock({
    className = "",
    label = "Advertisement",
    placement = "between_news",
    customImage,
    customLink
}: AdBlockProps) {
    const { ad: fetchedAd, loading } = useAds(placement);

    // Prioritize custom ad if provided
    const ad = customImage ? { imageUrl: customImage, link: customLink || '#' } : fetchedAd;

    // Define fixed sizes based on placement
    const getPlacementClasses = () => {
        switch (placement) {
            case 'sidebar':
                return "w-[300px] h-[250px]";
            case 'header':
                return "w-full max-w-[728px] h-[90px]";
            case 'between_news':
            case 'custom':
            default:
                return "w-full max-w-[728px] h-[90px] md:h-[250px]";
        }
    };

    const placementClasses = getPlacementClasses();

    // Only show loading if we don't have a custom image and we are still fetching the generic ad
    if (loading && !customImage) {
        return <div className={`mx-auto bg-gray-50 animate-pulse rounded-xl my-8 ${placementClasses} ${className}`} />;
    }

    if (!ad) {
        return (
            <div className={`mx-auto bg-gray-100 border border-dashed border-gray-300 flex flex-col justify-center items-center my-8 transition-colors rounded-xl px-4 text-center ${placementClasses} ${className}`}>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-sans mb-1">Sponsored Section</span>
                <div className="text-gray-300 font-black text-lg md:text-xl uppercase tracking-widest leading-tight">{label}</div>
            </div>
        );
    }

    return (
        <div className={`w-full flex justify-center my-8 ${className}`}>
            <a
                href={ad.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block overflow-hidden rounded-xl border border-gray-100 hover:opacity-95 transition-all shadow-md hover:shadow-lg ${placementClasses}`}
            >
                <div className="relative h-full w-full bg-gray-50 flex items-center justify-center">
                    <img
                        src={ad.imageUrl}
                        alt="Advertisement"
                        className="w-full h-full object-cover block"
                    />
                    <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-[8px] text-white uppercase font-black tracking-widest">Ad</div>
                </div>
            </a>
        </div>
    );
}
