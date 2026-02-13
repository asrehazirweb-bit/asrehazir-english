import type { ReactNode } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    // STRICT RULE: Single entry layout wrapper. layout-shift safety.
    // Header and Footer are part of the global layout.
    return (
        <div className="mx-auto w-full min-h-screen bg-white dark:bg-[#120f0e] shadow-sm border-x border-gray-100 dark:border-white/5 relative flex flex-col transition-colors duration-300">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}
