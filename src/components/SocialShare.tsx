import React from 'react';
import { Facebook, Send, Share2, X as XIcon } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants/socialLinks';

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.877 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.445 0 .081 5.363.079 11.969c0 2.112.551 4.172 1.597 6.01L0 24l6.149-1.613a11.893 11.893 0 005.9 1.554h.005c6.605 0 11.97-5.364 11.972-11.97 0-3.202-1.244-6.216-3.504-8.474z" />
    </svg>
);

interface SocialShareProps {
    url: string;
    title: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title }) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: 'Facebook',
            icon: <Facebook size={20} />,
            color: 'bg-[#1877F2]',
            link: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        },
        {
            name: 'X',
            icon: <XIcon size={20} />,
            color: 'bg-[#000000]',
            link: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
        },
        {
            name: 'Telegram',
            icon: <Send size={20} />,
            color: 'bg-[#0088cc]',
            link: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
        },
        {
            name: 'WhatsApp Share',
            icon: <WhatsAppIcon size={20} />,
            color: 'bg-[#25D366]',
            link: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`
        }
    ];

    return (
        <div className="mt-12 py-8 border-y border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight mb-1">Spread the Word</h3>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Share this story with your community</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    {shareLinks.map((share) => (
                        <a
                            key={share.name}
                            href={share.link}
                            target="_blank"
                            rel="noreferrer"
                            className={`flex items-center gap-2 ${share.color} text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-gray-200 active:scale-95`}
                            title={`Share on ${share.name}`}
                        >
                            {share.icon}
                            <span className="hidden sm:inline">{share.name}</span>
                        </a>
                    ))}

                    {/* WhatsApp Channel Join Button */}
                    <a
                        href={SOCIAL_LINKS.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-primary/20 active:scale-95"
                        title="Follow our WhatsApp Channel"
                    >
                        <WhatsAppIcon size={20} />
                        <span className="hidden sm:inline">Join our WhatsApp Channel</span>
                    </a>
                </div>
            </div>

            <div className="mt-8 p-6 bg-zinc-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Share2 size={20} />
                    </div>
                    <div>
                        <p className="text-sm font-black text-gray-900 uppercase tracking-tight">Stay Connected</p>
                        <p className="text-xs text-gray-500 font-bold">Follow @asrehazirportal for more real-time updates</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <a href={SOCIAL_LINKS.x} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm">
                        <XIcon size={16} />
                    </a>
                    <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all shadow-sm">
                        <Send size={16} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SocialShare;
