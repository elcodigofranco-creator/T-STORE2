import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

export default function AdminLayout() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Top Bar */}
      <header className="sticky top-0 z-100 bg-gradient-to-r from-dark-200 to-dark-100 
        border-b border-gold/15 px-6 py-3.5 flex items-center justify-between">
        <div className="font-cinzel text-base font-black tracking-[4px] text-gold-gradient">
          T-STORE ADMIN
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-purple/15 border border-purple/30 rounded-md px-3 py-1 
            font-cinzel text-[10px] tracking-[2px] text-purple-light">
            🛡️ ADMINISTRADOR
          </span>
          <button
            onClick={() => logout()}
            className="border border-red-500/30 rounded-md px-3.5 py-1.5 
              text-[10px] font-cinzel tracking-[2px] text-red-400/70 
              hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-5 py-7">
        <Outlet />
      </div>
    </div>
  );
}
