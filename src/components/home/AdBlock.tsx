

import { useAds } from '../../hooks/useAds';

interface AdBlockProps {
    className?: string;
    label?: string;
    placement?: string;
}

export function AdBlock({ className = "min-h-[120px]", label = "Advertisement", placement = "between_news" }: AdBlockProps) {
    const { ad, loading } = useAds(placement);

    if (loading) {
        return <div className={`w-full bg-gray-50 animate-pulse rounded-xl ${className} my-8`} />;
    }

    if (!ad) {
        return (
            <div className={`w-full bg-gray-100 border border-dashed border-gray-300 flex flex-col justify-center items-center ${className} my-8 transition-colors rounded-xl px-4 text-center`}>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-sans mb-1">Sponsored Section</span>
                <div className="text-gray-300 font-black text-lg md:text-xl uppercase tracking-widest leading-tight">{label}</div>
            </div>
        );
    }

    return (
        <a
            href={ad.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full overflow-hidden rounded-xl ${className} my-8 border border-gray-100 hover:opacity-95 transition-all shadow-md hover:shadow-lg`}
        >
            <div className="relative w-full h-full flex items-center justify-center bg-gray-50">
                <img src={ad.imageUrl} alt="Advertisement" className="max-w-full max-h-full object-contain" />
                <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-[8px] text-white uppercase font-black tracking-widest">Ad</div>
            </div>
        </a>
    );
}
