import { usePlayerStore } from '../../store/usePlayerStore';

export default function ProfilePage() {
  const { templarioName, level, xp, xpToNextLevel, cristales, avatar, playerClass, rank, skoolName } = usePlayerStore();
  const xpPercent = Math.round((xp / xpToNextLevel) * 100);

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h1 className="font-cinzel text-2xl font-black text-gold-gradient mb-6">
        📜 Perfil del Templario
      </h1>

      {/* Avatar Card */}
      <div className="bg-gradient-to-br from-dark-400/90 to-dark-800/90 
        border border-gold/15 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-purple/10 border-2 border-gold/30 
            flex items-center justify-center text-5xl
            shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            {avatar || '⚔️'}
          </div>
          <div>
            <h2 className="font-cinzel text-xl font-black text-gold-light">
              {templarioName || 'Templario'}
            </h2>
            {skoolName && (
              <p className="text-purple-muted text-sm">
                Skool: {skoolName}
              </p>
            )}
            <div className="flex items-center gap-3 mt-2">
              <span className="font-cinzel text-xs text-gold-light">
                Nivel {level}
              </span>
              <span className="text-purple-muted">·</span>
              <span className="font-cinzel text-xs text-purple-light">
                {rank || 'Bronce'}
              </span>
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-cinzel text-[10px] tracking-[2px] text-purple-muted uppercase">
              Experiencia
            </span>
            <span className="font-cinzel text-xs text-gold-light">
              {xp} / {xpToNextLevel} XP
            </span>
          </div>
          <div className="h-3 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-dark to-gold-light 
                shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all duration-700"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-dark-400/90 to-dark-800/90 
          border border-gold/15 rounded-xl p-4">
          <div className="font-cinzel text-[10px] tracking-[2px] text-purple-muted uppercase mb-1">
            Cristales
          </div>
          <div className="font-cinzel text-2xl font-black text-purple-light">
            💜 {cristales}
          </div>
        </div>
        <div className="bg-gradient-to-br from-dark-400/90 to-dark-800/90 
          border border-gold/15 rounded-xl p-4">
          <div className="font-cinzel text-[10px] tracking-[2px] text-purple-muted uppercase mb-1">
            Clase
          </div>
          <div className="font-cinzel text-2xl font-black text-gold-light">
            {playerClass || '—'}
          </div>
        </div>
      </div>
    </div>
  );
}
