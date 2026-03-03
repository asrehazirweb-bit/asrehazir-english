import { MessageCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants/socialLinks';

export function FloatingWhatsApp() {
    return (
        <a
            href={SOCIAL_LINKS.whatsappChat}
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20ba5a] hover:scale-110 transition-all active:scale-95 group"
            aria-label="Chat on WhatsApp"
        >
            <div className="absolute bottom-full right-0 mb-3 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                Chat with us
            </div>
            <MessageCircle size={28} className="fill-current" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        </a>
    );
}
