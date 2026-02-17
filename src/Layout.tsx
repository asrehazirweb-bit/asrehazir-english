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
        <div className="mx-auto w-full max-w-full min-h-screen bg-white dark:bg-[#120f0e] relative flex flex-col transition-colors duration-300 overflow-x-hidden">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}
