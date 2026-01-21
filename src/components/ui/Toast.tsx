import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../context/AppContext';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const colors = {
  success: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    icon: 'text-green-400',
  },
  error: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    icon: 'text-red-400',
  },
  info: {
    bg: 'bg-pastel-purple/10',
    border: 'border-pastel-purple/30',
    icon: 'text-pastel-purple',
  },
};

export function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const Icon = icons[toast.type];
          const colorScheme = colors[toast.type];

          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30,
              }}
              className={`
                flex items-center gap-3 px-4 py-3 min-w-[280px] max-w-[400px]
                rounded-xl backdrop-blur-md
                ${colorScheme.bg} ${colorScheme.border} border
                shadow-lg
              `}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${colorScheme.icon}`} />
              <span className="flex-1 text-sm text-white">{toast.message}</span>
              <button
                onClick={() => dismissToast(toast.id)}
                className="p-1 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Progress bar */}
              {toast.duration && toast.duration > 0 && (
                <motion.div
                  className={`absolute bottom-0 left-0 h-0.5 ${colorScheme.icon.replace('text-', 'bg-')}`}
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: toast.duration / 1000, ease: 'linear' }}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
