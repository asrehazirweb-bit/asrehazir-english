import { useEffect } from 'react';

export function useDarkMode() {
    const isDark = false;
    const toggle = () => { };

    useEffect(() => {
        window.document.documentElement.classList.remove('dark');
    }, []);

    return { isDark, toggle };
}
