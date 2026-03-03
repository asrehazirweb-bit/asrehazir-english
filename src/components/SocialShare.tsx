import React from 'react';
import { Facebook, Send, MessageCircle, Share2, X as XIcon } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants/socialLinks';

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
            icon: <MessageCircle size={20} />,
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
                        <Share2 size={20} />
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
