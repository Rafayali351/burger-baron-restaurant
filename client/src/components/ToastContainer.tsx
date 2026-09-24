import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl border shadow-soft-lg backdrop-blur-xl flex items-start gap-3 animate-slideUp transition-all bg-white ${
              toast.type === 'success'
                ? 'border-crimson/30 text-charcoal'
                : toast.type === 'error'
                ? 'border-red-400 text-charcoal'
                : 'border-blue-400 text-charcoal'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-crimson" />
              ) : toast.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-red-600" />
              ) : (
                <Info className="w-5 h-5 text-blue-600" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-black text-charcoal">{toast.title}</h4>
              {toast.description && (
                <p className="text-xs text-charcoal-muted mt-0.5 leading-snug font-medium">{toast.description}</p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-charcoal-subtle hover:text-charcoal p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
