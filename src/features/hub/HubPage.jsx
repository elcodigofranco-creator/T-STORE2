import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { usePlayerStore } from '../../store/usePlayerStore';

/* ============================================================
   HUB PAGE — Exact replica of tstore_HUB_PANTALLA4.html
   ============================================================ */

export default function HubPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { templarioName, level, xp, xpToNextLevel, cristales } = usePlayerStore();
  const xpPercent = Math.min(100, Math.round((xp / xpToNextLevel) * 100));

  return (
    <div style={{
      width: '100vw', height: '100vh',
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
      fontFamily: "'Crimson Text', serif",
    }}>

      {/* ═══════ FONDO MÁGICO ═══════ */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse at 50% 30%, rgba(30,15,60,0.9) 0%, transparent 60%),
          radial-gradient(ellipse at 20% 80%, rgba(10,30,60,0.7) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 70%, rgba(20,10,50,0.7) 0%, transparent 50%),
          linear-gradient(180deg, #050215 0%, #08031a 30%, #060215 70%, #030110 100%)
        `,
      }} />

      {/* Niebla inferior */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', zIndex: 1,
        background: 'linear-gradient(to top, rgba(4,2,14,0.95) 0%, rgba(4,2,14,0.5) 50%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* ═══════ TOP BAR ═══════ */}
      <div style={{
        position: 'relative', zIndex: 20,
        display: 'flex', alignItems: 'center',
        padding: '8px 16px',
        background: 'linear-gradient(180deg, rgba(4,2,14,0.97) 0%, rgba(4,2,14,0.85) 100%)',
        borderBottom: '1px solid rgba(212,175,55,0.12)',
        flexShrink: 0, gap: 10,
      }}>

        {/* ── USER BLOCK (izquierda) ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(6,3,16,0.85)',
          border: '1px solid rgba(212,175,55,0.2)',
          borderRadius: 10, padding: '6px 10px',
          flexShrink: 0, minWidth: 200,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            border: '2px solid #d4af37',
            background: 'rgba(168,85,247,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, position: 'relative', flexShrink: 0,
          }}>
            ⚔️
            <div style={{
              position: 'absolute', bottom: -4, right: -4,
              width: 18, height: 18,
              background: 'linear-gradient(135deg, #6b21a8, #a855f7)',
              border: '1px solid #d4af37', borderRadius: 4,
              fontFamily: "'Cinzel', serif", fontSize: 9, fontWeight: 900,
              color: '#f5d06e', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {level}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 12, fontWeight: 700,
              color: '#f5d06e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {templarioName || 'Templario'}
            </div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 2,
              color: 'rgba(160,130,200,0.6)', textTransform: 'uppercase', marginTop: 1,
            }}>
              Maestro en Formación
            </div>
            <div style={{ marginTop: 4 }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 7,
                color: 'rgba(160,130,200,0.5)', letterSpacing: 1,
              }}>
                {xp?.toLocaleString() || '0'} / {xpToNextLevel?.toLocaleString() || '4,000'} XP
              </div>
              <div style={{
                height: 4, background: 'rgba(255,255,255,0.06)',
                borderRadius: 2, marginTop: 2, overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #22c55e, #4ade80)',
                  borderRadius: 2,
                  boxShadow: '0 0 6px rgba(34,197,94,0.6)',
                  width: `${xpPercent}%`,
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── LOGO CENTER ── */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        }}>
          <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{
              width: 48, height: 48, marginBottom: 2,
              filter: 'drop-shadow(0 0 12px rgba(212,175,55,0.8))',
              animation: 'logoCrestGlow 2.5s ease-in-out infinite alternate',
            }}
          >
            <polygon points="30,4 44,16 44,30 30,36 16,30 16,16" fill="rgba(212,175,55,0.12)" stroke="#d4af37" strokeWidth="1.5"/>
            <rect x="22" y="34" width="16" height="20" rx="2" fill="rgba(212,175,55,0.08)" stroke="#d4af37" strokeWidth="1.5"/>
            <rect x="18" y="52" width="24" height="5" rx="2" fill="rgba(212,175,55,0.18)" stroke="#d4af37" strokeWidth="1.5"/>
            <line x1="26" y1="16" x2="26" y2="34" stroke="#d4af37" strokeWidth="0.8"/>
            <line x1="34" y1="16" x2="34" y2="34" stroke="#d4af37" strokeWidth="0.8"/>
            <circle cx="30" cy="4" r="2.5" fill="#d4af37"/>
            <text x="30" y="30" textAnchor="middle" fill="#d4af37" fontFamily="Cinzel" fontSize="10" fontWeight="900">T</text>
          </svg>
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 28, fontWeight: 900,
            letterSpacing: 6, lineHeight: 1,
            background: 'linear-gradient(135deg, #c8922a 0%, #f5d06e 40%, #d4af37 60%, #c8922a 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            animation: 'logoShine 4s ease-in-out infinite',
          }}>
            T-STORE
          </div>
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 3,
            color: 'rgba(212,175,55,0.5)', textTransform: 'uppercase', marginTop: 1,
          }}>
            Tu Camino. Tu Templo. Tu Legado.
          </div>
        </div>

        {/* ── CURRENCIES + ICONS (derecha) ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'rgba(6,3,16,0.85)', border: '1px solid rgba(212,175,55,0.25)',
            borderRadius: 20, padding: '5px 10px',
          }}>
            <span style={{ fontSize: 16 }}>💜</span>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 900, color: '#f5d06e' }}>
              {cristales?.toLocaleString() || '2,850'}
            </span>
            <button style={{
              width: 22, height: 22, background: 'rgba(212,175,55,0.15)',
              border: '1px solid rgba(212,175,55,0.3)', borderRadius: '50%',
              color: '#f5d06e', fontSize: 14, fontWeight: 900, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>+</button>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'rgba(6,3,16,0.85)', border: '1px solid rgba(251,191,36,0.25)',
            borderRadius: 20, padding: '5px 10px',
          }}>
            <span style={{ fontSize: 16 }}>🪙</span>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 900, color: '#fbbf24' }}>
              12,450
            </span>
            <button style={{
              width: 22, height: 22, background: 'rgba(212,175,55,0.15)',
              border: '1px solid rgba(251,191,36,0.3)', borderRadius: '50%',
              color: '#fbbf24', fontSize: 14, fontWeight: 900, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>+</button>
          </div>
          {['✉️', '🔔', '⚙️', '☰'].map((icon, i) => (
            <button key={i} style={{
              width: 32, height: 32, background: 'rgba(6,3,16,0.8)',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, cursor: 'pointer', color: 'rgba(180,160,220,0.7)',
            }}>{icon}</button>
          ))}
        </div>
      </div>

      {/* ═══════ PORTALES AREA ═══════ */}
      <div style={{
        flex: 1, position: 'relative', zIndex: 10,
        display: 'flex', alignItems: 'flex-end',
        padding: '0 0 8px', overflow: 'hidden',
      }}>

        {/* ── MAESTRO (izquierda, fijo) ── */}
        <div style={{
          position: 'absolute', left: 8, bottom: 0, width: 120, zIndex: 15,
          display: 'flex', alignItems: 'flex-end',
        }}>
          <svg viewBox="0 0 150 200" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{
              width: '100%', height: 'auto',
              filter: 'drop-shadow(0 0 20px rgba(160,100,255,0.5)) drop-shadow(0 20px 40px rgba(0,0,0,0.9))',
              animation: 'maestroFloat 3.5s ease-in-out infinite',
            }}
          >
            {/* Silueta del Maestro */}
            <circle cx="75" cy="50" r="32" fill="rgba(160,100,255,0.15)" stroke="#a855f7" strokeWidth="1.5"/>
            <rect x="45" y="85" width="60" height="85" rx="10" fill="rgba(160,100,255,0.12)" stroke="#a855f7" strokeWidth="1.5"/>
            <path d="M45 85 L75 65 L105 85" fill="none" stroke="#a855f7" strokeWidth="1.5"/>
            <circle cx="65" cy="48" r="3" fill="#a855f7"/>
            <circle cx="85" cy="48" r="3" fill="#a855f7"/>
            <path d="M67 60 Q75 68 83 60" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round"/>
            {/* Bastón */}
            <line x1="110" y1="60" x2="110" y2="190" stroke="#a855f7" strokeWidth="2"/>
            <circle cx="110" cy="55" r="10" fill="rgba(160,100,255,0.3)" stroke="#a855f7" strokeWidth="1.5"/>
            <circle cx="110" cy="55" r="5" fill="#a855f7"/>
            {/* Capa */}
            <path d="M45 85 Q30 120 35 170 L115 170 Q120 120 105 85" fill="rgba(88,28,135,0.2)" stroke="rgba(168,85,247,0.3)" strokeWidth="1"/>
          </svg>
        </div>

        {/* ── PORTALES GRID ── */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          gap: 6, width: '100%', padding: '0 140px 0 135px', height: '100%',
        }}>
          {[
            {
              route: '/store',
              name: 'Tienda', desc: 'Adquiere poder',
              icon: '🛒', iconSize: 28,
              color: '#3b82f6', colorDim: 'rgba(59,130,246,0.3)',
              glow: 'rgba(59,130,246,0.15)', glowTop: 'rgba(59,130,246,0.25)',
            },
            {
              route: '/missions',
              name: 'Misiones', desc: 'Acepta retos',
              icon: '⚔️', iconSize: 28,
              color: '#22c55e', colorDim: 'rgba(34,197,94,0.3)',
              glow: 'rgba(34,197,94,0.15)', glowTop: 'rgba(34,197,94,0.25)',
            },
            {
              route: '/hub',
              name: 'Principal', desc: 'Tu templo',
              icon: '👑', iconSize: 36,
              isCenter: true,
              color: '#d4af37', colorDim: 'rgba(212,175,55,0.3)',
              glow: 'rgba(212,175,55,0.15)', glowTop: 'rgba(212,175,55,0.25)',
              figure: '🏰',
            },
            {
              route: '/library',
              name: 'Biblioteca', desc: 'Sabiduría',
              icon: '📚', iconSize: 28,
              color: '#a855f7', colorDim: 'rgba(168,85,247,0.3)',
              glow: 'rgba(168,85,247,0.15)', glowTop: 'rgba(168,85,247,0.25)',
            },
            {
              route: '/inventory',
              name: 'Inventario', desc: 'Tu arsenal',
              icon: '🎒', iconSize: 28,
              color: '#ef4444', colorDim: 'rgba(239,68,68,0.3)',
              glow: 'rgba(239,68,68,0.15)', glowTop: 'rgba(239,68,68,0.25)',
            },
          ].map((p, i) => (
            <div
              key={i}
              onClick={() => navigate(p.route)}
              style={{
                flex: p.isCenter ? 1.6 : 1,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
                cursor: 'pointer', position: 'relative', height: '100%', minWidth: 0,
                transition: 'transform 0.3s cubic-bezier(.34,1.56,.64,1)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
            >
              {/* Arco del portal */}
              <div style={{
                position: 'relative', width: '100%',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                borderRadius: '60px 60px 12px 12px',
                border: `${p.isCenter ? 3 : 2}px solid ${p.color}`,
                overflow: 'hidden', flex: 1, minHeight: 0,
                padding: '12px 8px 8px',
              }}>
                {/* Glow interior */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(ellipse at 50% 80%, ${p.glow} 0%, transparent 70%)`,
                  animation: 'archPulse 3s ease-in-out infinite', opacity: 0.4,
                }} />
                {/* Parte superior del arco */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
                  borderRadius: '60px 60px 0 0',
                  background: `linear-gradient(180deg, ${p.glowTop} 0%, transparent 100%)`,
                  opacity: 0.15,
                }} />

                {/* Ícono del portal */}
                <div style={{
                  position: 'relative', zIndex: 5,
                  width: p.isCenter ? 80 : 60, height: p.isCenter ? 80 : 60,
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: p.iconSize, border: `2px solid ${p.color}`,
                  marginBottom: 6, flexShrink: 0,
                  background: 'rgba(0,0,0,0.4)',
                  animation: 'iconGlow 2.5s ease-in-out infinite alternate',
                  boxShadow: `0 0 10px ${p.color}, inset 0 0 10px rgba(0,0,0,0.5)`,
                }}>
                  {p.icon}
                </div>

                {/* Figura central (solo portal central) */}
                {p.isCenter && p.figure && (
                  <div style={{
                    position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)',
                    fontSize: 48, opacity: 0.9, zIndex: 5,
                    filter: 'drop-shadow(0 0 15px rgba(212,175,55,0.8))',
                    animation: 'figureGlow 3s ease-in-out infinite alternate',
                  }}>
                    {p.figure}
                  </div>
                )}

                {/* Luz de plataforma */}
                <div style={{
                  width: '80%', height: 8, borderRadius: '50%',
                  background: p.color, filter: 'blur(4px)', opacity: 0.6,
                  marginBottom: 8, flexShrink: 0,
                  animation: 'lightPulse 2s ease-in-out infinite alternate',
                }} />

                {/* Nombre */}
                <div style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: p.isCenter ? 14 : 11, fontWeight: 700,
                  color: 'white', textAlign: 'center',
                  textShadow: `0 0 10px ${p.color}`,
                  letterSpacing: 0.5, lineHeight: 1.2,
                  position: 'relative', zIndex: 5, flexShrink: 0, marginBottom: 3,
                }}>
                  {p.name}
                </div>

                {/* Descripción */}
                <div style={{
                  fontFamily: "'Crimson Text', serif", fontSize: 10,
                  color: 'rgba(210,190,240,0.65)', textAlign: 'center',
                  lineHeight: 1.3, position: 'relative', zIndex: 5,
                  flex: 1,
                }}>
                  {p.desc}
                </div>

                {/* Botón */}
                <button style={{
                  position: 'relative', zIndex: 5, width: '90%',
                  padding: p.isCenter ? '8px 0' : '7px 0',
                  borderRadius: 6, border: `1px solid ${p.color}`,
                  fontFamily: "'Cinzel', serif",
                  fontSize: p.isCenter ? 10 : 9, fontWeight: 700,
                  letterSpacing: 2, textTransform: 'uppercase',
                  cursor: 'pointer', marginTop: 6, flexShrink: 0,
                  background: 'rgba(0,0,0,0.5)', color: p.color,
                  transition: 'all 0.25s',
                }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Entrar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════ BOTTOM BAR ═══════ */}
      <div style={{
        position: 'relative', zIndex: 20,
        background: 'linear-gradient(180deg, rgba(4,2,14,0.97) 0%, rgba(6,3,18,1) 100%)',
        borderTop: '1px solid rgba(212,175,55,0.15)',
        flexShrink: 0,
      }}>

        {/* Fila superior: propocoins + banner + ofertas */}
        <div style={{
          display: 'flex', alignItems: 'center', padding: '8px 16px', gap: 12,
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}>

          {/* PropoCoins */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)',
            borderRadius: 10, padding: '8px 12px', flexShrink: 0,
          }}>
            <div style={{
              width: 28, height: 28,
              background: 'linear-gradient(135deg, #6b21a8, #a855f7)',
              borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, border: '1px solid rgba(168,85,247,0.5)',
            }}>🪙</div>
            <div style={{ lineHeight: 1.1 }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 1,
                color: 'rgba(168,85,247,0.7)', textTransform: 'uppercase',
              }}>
                PropoCoins
              </div>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 16, fontWeight: 900, color: '#c084fc',
              }}>
                500
              </div>
            </div>
            <button style={{
              width: 22, height: 22, background: 'rgba(168,85,247,0.2)',
              border: '1px solid rgba(168,85,247,0.4)', borderRadius: '50%',
              color: '#c084fc', fontSize: 14, display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>+</button>
          </div>

          {/* Banner "Continúa" */}
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 10,
            background: 'linear-gradient(135deg, rgba(212,175,55,0.06), rgba(212,175,55,0.02))',
            border: '1px solid rgba(212,175,55,0.15)', borderRadius: 10,
            padding: '10px 14px', cursor: 'pointer',
          }}>
            <span style={{
              fontSize: 22,
              filter: 'drop-shadow(0 0 6px rgba(212,175,55,0.5))',
            }}>⚔️</span>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 700,
                color: '#f5d06e', letterSpacing: 1,
              }}>
                Continúa tu misión
              </div>
              <div style={{
                fontFamily: "'Crimson Text', serif", fontSize: 11,
                color: 'rgba(200,180,240,0.55)', fontStyle: 'italic', marginTop: 1,
              }}>
                El Camino del Guerrero — Paso 3
              </div>
            </div>
            <span style={{ fontSize: 20, color: 'rgba(212,175,55,0.5)' }}>→</span>
          </div>

          {/* Ofertas especiales */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'linear-gradient(135deg, rgba(16,8,36,0.9), rgba(8,4,20,0.95))',
            border: '1px solid rgba(212,175,55,0.2)', borderRadius: 10,
            padding: '8px 12px', flexShrink: 0, cursor: 'pointer',
          }}>
            <span style={{
              fontSize: 28,
              animation: 'chestPulse 2s ease-in-out infinite alternate',
            }}>🎁</span>
            <div>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 11, fontWeight: 700,
                color: '#f5d06e', letterSpacing: 1,
              }}>
                Ofertas Especiales
              </div>
              <div style={{
                fontFamily: "'Crimson Text', serif", fontSize: 10,
                color: 'rgba(200,180,240,0.55)', marginTop: 1,
              }}>
                ¡Solo por tiempo limitado!
              </div>
              <div style={{
                fontFamily: "'Cinzel', serif", fontSize: 10,
                color: 'rgba(212,175,55,0.6)', marginTop: 2, letterSpacing: 1,
              }}>
                ⏰ 23:59:59
              </div>
            </div>
            <button style={{
              width: 26, height: 26,
              background: 'linear-gradient(135deg, #c8922a, #d4af37)',
              border: 'none', borderRadius: 6, color: '#1a0800',
              fontSize: 14, fontWeight: 900, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>→</button>
          </div>
        </div>

        {/* NAV ICONS ROW */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '6px 16px 8px', gap: 4,
        }}>
          {[
            { icon: '🏠', label: 'Hub', active: true },
            { icon: '🛒', label: 'Tienda' },
            { icon: '⚔️', label: 'Misiones' },
            { icon: '📚', label: 'Biblioteca' },
            { icon: '🎒', label: 'Inventario' },
            { icon: '👤', label: 'Perfil' },
          ].map((n, i) => (
            <div
              key={i}
              onClick={() => {
                const routes = { 'Hub': '/hub', 'Tienda': '/store', 'Misiones': '/missions', 'Biblioteca': '/library', 'Inventario': '/inventory', 'Perfil': '/profile' };
                navigate(routes[n.label] || '/hub');
              }}
              style={{
                flex: 1, maxWidth: 80,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                cursor: 'pointer', padding: 4, borderRadius: 8,
                background: n.active ? 'rgba(212,175,55,0.07)' : 'transparent',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { if (!n.active) e.currentTarget.style.background = 'rgba(212,175,55,0.07)'; }}
              onMouseLeave={(e) => { if (!n.active) e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{
                fontSize: 18,
                filter: n.active ? 'drop-shadow(0 0 4px #d4af37)' : 'none',
              }}>{n.icon}</span>
              <span style={{
                fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 1,
                color: n.active ? '#f5d06e' : 'rgba(160,130,200,0.5)',
                textTransform: 'uppercase',
              }}>{n.label}</span>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div style={{
          textAlign: 'center', padding: 3,
          fontFamily: "'Cinzel', serif", fontSize: 8, letterSpacing: 2,
          color: 'rgba(212,175,55,0.2)',
          borderTop: '1px solid rgba(255,255,255,0.03)',
        }}>
          T-STORE · Tu Camino. Tu Templo. Tu Legado.
        </div>
      </div>
    </div>
  );
}
