import { useSupabaseQuery } from '../../hooks/useSupabaseQuery';
import { missionsService } from '../../services/missions.service';
import { useAuthStore } from '../../store/useAuthStore';
import { RARITY_COLORS } from '../../config/constants';

export default function MissionsPage() {
  const { user } = useAuthStore();
  const { data: missions, loading } = useSupabaseQuery(
    () => missionsService.getActiveMissions(),
    []
  );

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h1 className="font-cinzel text-2xl font-black text-gold-gradient mb-6">
        ⚔️ Misiones Activas
      </h1>

      {loading ? (
        <div className="text-center py-20 text-purple-muted">Cargando misiones...</div>
      ) : (
        <div className="grid gap-4">
          {missions?.map((mission) => (
            <div
              key={mission.id}
              className="bg-gradient-to-br from-dark-400/90 to-dark-800/90 
                border border-purple/20 rounded-xl p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-cinzel text-base text-gold-light mb-1">
                    {mission.title}
                  </h3>
                  <p className="text-purple-muted text-sm leading-relaxed">
                    {mission.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs font-cinzel text-purple-light">
                      💜 {mission.coin_reward || 0} cristales
                    </span>
                    <span className="text-xs font-cinzel text-gold-light">
                      ⭐ {mission.xp_reward || 0} XP
                    </span>
                    {mission.gem_reward > 0 && (
                      <span className="text-xs font-cinzel text-amber-400">
                        💎 {mission.gem_reward} gemas
                      </span>
                    )}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-md font-cinzel text-[9px] tracking-[1px] uppercase
                  ${RARITY_COLORS[mission.type]?.text || 'text-gray-400'}
                  border ${RARITY_COLORS[mission.type]?.border || 'border-gray-500'}
                  ${RARITY_COLORS[mission.type]?.bg || 'bg-gray-500/10'}`}>
                  {mission.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && (!missions || missions.length === 0) && (
        <div className="bg-gradient-to-br from-dark-400/90 to-dark-800/90 
          border border-gold/15 rounded-xl p-8 text-center">
          <div className="text-5xl mb-4">⚔️</div>
          <h2 className="font-cinzel text-lg text-gold-light mb-2">Sin misiones activas</h2>
          <p className="text-purple-muted">
            Vuelve pronto. El Templo preparará nuevos retos para ti.
          </p>
        </div>
      )}
    </div>
  );
}
