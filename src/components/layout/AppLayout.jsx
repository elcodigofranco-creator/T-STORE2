import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/useAuthStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useUIStore } from '../../store/useUIStore';
import ToastLayer from '../ui/ToastLayer';

const NAV_ITEMS = [
  { path: '/hub', icon: '🏰', label: 'Lobby' },
  { path: '/store', icon: '🛒', label: 'Tienda' },
  { path: '/library', icon: '📚', label: 'Biblioteca' },
  { path: '/inventory', icon: '🎒', label: 'Inventario' },
  { path: '/missions', icon: '⚔️', label: 'Misiones' },
];

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAdmin } = useAuthStore();
  const { templarioName, level, cristales, avatar } = usePlayerStore();
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  return (
    <div className="relative w-full h-full bg-dark-900 flex overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed left-0 top-0 bottom-0 w-[280px] z-50 
              bg-gradient-to-b from-dark-200 to-dark-800
              border-r border-gold/15 flex flex-col"
          >
            {/* Sidebar Header */}
            <div className="p-5 border-b border-gold/10">
              <div className="font-cinzel text-lg font-black tracking-[4px] text-gold-gradient">
                T-STORE
              </div>
              <div className="text-[10px] font-cinzel tracking-[3px] text-purple-muted mt-1">
                Templo del Propósito
              </div>
            </div>

            {/* Player Info */}
            <div className="p-4 border-b border-gold/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple/10 border border-purple/20 
                  flex items-center justify-center text-xl">
                  {avatar || '⚔️'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-cinzel text-xs text-gold-light truncate">
                    {templarioName || 'Templario'}
                  </div>
                  <div className="text-[9px] font-cinzel text-purple-muted tracking-[1px]">
                    Nivel {level} · {cristales} 💜
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      toggleSidebar();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm 
                      font-cinzel tracking-[1px] transition-all duration-200
                      ${isActive
                        ? 'bg-gold/10 text-gold-light border border-gold/20'
                        : 'text-purple-muted hover:bg-white/5 hover:text-gold-light'
                      }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Admin Link */}
            {isAdmin && (
              <div className="p-3 border-t border-gold/10">
                <button
                  onClick={() => { navigate('/admin'); toggleSidebar(); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm 
                    font-cinzel tracking-[1px] text-purple-light 
                    bg-purple/10 border border-purple/20 hover:bg-purple/20 transition-all"
                >
                  <span>🛡️</span> Admin Panel
                </button>
              </div>
            )}

            {/* Logout */}
            <div className="p-3 border-t border-gold/10">
              <button
                onClick={() => logout()}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs 
                  font-cinzel tracking-[2px] text-red-400/60 
                  hover:bg-red-500/10 hover:text-red-400 transition-all"
              >
                <span>🚪</span> Cerrar Sesión
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 
        bg-gradient-to-r from-dark-200 to-dark-100 
        border-b border-gold/15 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="text-2xl hover:scale-110 transition-transform"
          >
            {sidebarOpen ? '✕' : '☰'}
          </button>
          <div className="font-cinzel font-black tracking-[4px] text-gold-gradient text-sm">
            T-STORE
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-cinzel text-xs text-gold-light">
            💜 {cristales}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-lg">{avatar || '⚔️'}</span>
            <span className="font-cinzel text-[10px] text-purple-muted">
              Lv.{level}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mt-[52px] overflow-auto">
        <Outlet />
      </main>

      <ToastLayer />
    </div>
  );
}
