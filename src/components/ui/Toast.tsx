import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border animate-in slide-in-from-bottom-5 duration-300 ${type === 'success'
                ? 'bg-white dark:bg-zinc-900 border-green-100 dark:border-green-900/30'
                : 'bg-white dark:bg-zinc-900 border-red-100 dark:border-red-900/30'
            }`}>
            <div className={`p-2 rounded-full ${type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
            </div>
            <div>
                <h4 className={`text-sm font-bold ${type === 'success' ? 'text-green-900 dark:text-green-400' : 'text-red-900 dark:text-red-400'}`}>
                    {type === 'success' ? 'Success' : 'Error'}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{message}</p>
            </div>
            <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X size={16} />
            </button>
        </div>
    );
};

export default Toast;
