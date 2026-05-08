import { lazy, Suspense } from 'react';
import { useAuthStore } from './store/useAuthStore';
import './styles/globals.css';

const AppRouter = lazy(() => import('./router/AppRouter'));

// Loading fallback
function LoadingScreen() {
  return (
    <div className="w-full h-full bg-dark-900 flex items-center justify-center">
      <div className="text-center">
        <div className="font-cinzel text-2xl font-black text-gold-gradient mb-4">
          T-STORE
        </div>
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full 
          animate-spin mx-auto" />
        <div className="font-cinzel text-[10px] tracking-[3px] text-purple-muted mt-4 uppercase">
          Cargando el Templo...
        </div>
      </div>
    </div>
  );
}

export default function App() {
  // Restore session on mount
  const restored = useAuthStore((s) => s.session);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <AppRouter />
    </Suspense>
  );
}
