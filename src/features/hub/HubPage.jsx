import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/useAuthStore';
import { usePlayerStore } from '../../store/usePlayerStore';

export default function HubPage() {
  const { templarioName, level, xp, xpToNextLevel, cristales, avatar, playerClass, rank } = usePlayerStore();
  const xpPercent = Math.round((xp / xpToNextLevel) * 100);

  const quickActions = [
    { path: '/store', icon: '🛒', label: 'Tienda', desc: 'Adquiere poder' },
    { path: '/missions', icon: '⚔️', label: 'Misiones', desc: 'Acepta retos' },
    { path: '/inventory', icon: '🎒', label: 'Inventario', desc: 'Tu arsenal' },
    { path: '/library', icon: '📚', label: 'Biblioteca', desc: 'Sabiduría' },
  ];

  return (
    <div className="p-5 max-w-4xl mx-auto">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-cinzel text-2xl font-black text-gold-gradient mb-1">
          Bienvenido, {templarioName || 'Templario'}
        </h1>
        <p className="text-purple-muted text-sm">
          Tu templo te espera. ¿Qué harás hoy?
        </p>
      </motion.div>

      {/* Player Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
      >
        {[
          { label: 'Nivel', value: level, icon: '⭐' },
          { label: 'Cristales', value: cristales, icon: '💜' },
          { label: 'Clase', value: playerClass || '—', icon: '🎭' },
          { label: 'Rango', value: rank, icon: '🏅' },
        ].map((stat, i) => (
          <div key={i} className="bg-gradient-to-br from-dark-400/90 to-dark-800/90 
            border border-gold/15 rounded-xl p-4">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="font-cinzel text-xl font-black text-gold-light">{stat.value}</div>
            <div className="font-cinzel text-[9px] tracking-[2px] text-purple-muted uppercase mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* XP Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-dark-400/90 to-dark-800/90 
          border border-gold/15 rounded-xl p-4 mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-cinzel text-[10px] tracking-[2px] text-purple-muted uppercase">
            Progreso — Nivel {level}
          </span>
          <span className="font-cinzel text-xs text-gold-light">{xpPercent}%</span>
        </div>
        <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-dark to-gold-light 
              shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all duration-700"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {quickActions.map((action, i) => (
          <a
            key={action.path}
            href={action.path}
            className="bg-gradient-to-br from-dark-400/90 to-dark-800/90 
              border border-gold/15 rounded-xl p-5 text-center
              hover:border-gold/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] 
              transition-all duration-300 group cursor-pointer"
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
              {action.icon}
            </div>
            <div className="font-cinzel text-xs text-gold-light tracking-[1px]">
              {action.label}
            </div>
            <div className="font-crimson text-[11px] text-purple-muted/60 mt-0.5">
              {action.desc}
            </div>
          </a>
        ))}
      </motion.div>
    </div>
  );
}
