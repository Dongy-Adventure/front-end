'use client';
import { Icon } from '@iconify/react/dist/iconify.js';
import { AnimatePresence, motion } from 'framer-motion';
import { createContext, ReactNode, useContext, useState } from 'react';
import { cn } from '@/lib/utils';

interface IToastContext {
  setToast: (type: 'error' | 'success', message: string) => void;
  data: { message: string; type: 'error' | 'success' } | null;
}

const ToastContext = createContext<IToastContext | null>(null);

export const useToast = () => {
  return useContext(ToastContext);
};

function getStyle(type: 'error' | 'success') {
  switch (type) {
    case 'error':
      return 'bg-red-500 border border-red-700 text-white shadow-lg';
    case 'success':
      return 'bg-green-500 !important border border-green-700 text-white shadow-lg';
    default:
      return 'bg-blue-500 border border-blue-700 text-white shadow-lg';
  }
}

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const toast = useProvideToast();

  return (
    <ToastContext.Provider value={toast}>
      {toast.data?.message && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -300, x: '-50%' }}
            animate={{ opacity: 1, y: 25, x: '-50%' }}
            exit={{ opacity: 0, y: -300, x: '-50%' }}
            className={cn(
              getStyle(toast.data?.type),
              'fixed left-1/2 z-50 rounded-xl px-4 py-2'
            )}
          >
            <div className="flex items-center space-x-2 gap-1">
              {toast.data?.type === 'error' && (
                <Icon
                  icon="mdi:alert-circle"
                  className="h-5 w-5"
                />
              )}
              {toast.data?.type === 'success' && (
                <Icon
                  icon="mdi:check-circle"
                  className="h-5 w-5"
                />
              )}
              <span className="font-display text-sm">
                {toast.data?.message}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      {children}
    </ToastContext.Provider>
  );
};

const TOAST_TIMEOUT = 3000;

function useProvideToast() {
  const [toast, setToast] = useState<null | {
    message: string;
    type: 'error' | 'success';
  }>(null);

  const setToastDisplay = (type: 'error' | 'success', message: string) => {
    setToast({ type, message });

    window.setTimeout(() => {
      setToast(null);
    }, TOAST_TIMEOUT);
  };

  return { setToast: setToastDisplay, data: toast };
}
