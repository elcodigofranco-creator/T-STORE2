import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/useAuthStore';
import { useUIStore } from '../../store/useUIStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useUIStore } from '../../store/useUIStore';
import { supabase } from '../../services/supabase';

/* ============================================================
   LOGIN PAGE — Exact replica of tstore_login_PANTALLA1.html
   ============================================================ */

export default function LoginPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const loadProfile = useAuthStore((s) => s.loadProfile);
  const setPlayerData = usePlayerStore((s) => s.setPlayerData);
  const pushToast = useUIStore((s) => s.pushToast);

  // ── Login con código de acceso ──
  const handleLogin = async () => {
    if (!code.trim()) {
      setError('Ingresa tu código de acceso');
      return;
    }
    setError('');
    setLoading(true);

    try {
      // 1. Verificar código en la base de datos
      const { data: codeRow, error: codeErr } = await supabase
        .from('access_codes')
        .select('*')
        .eq('code', code.trim().toUpperCase())
        .single();

      if (codeErr || !codeRow) {
        setError('Código inválido o no encontrado');
        setLoading(false);
        return;
      }

      // 2. Si el código ya fue usado, iniciar sesión con ese usuario
      if (codeRow.is_used && codeRow.used_by) {
        const { data: loginData, error: loginErr } = await supabase.auth.signInWithPassword({
          email: `user_${codeRow.id}@t-store.local`,
          password: code.trim().toUpperCase(),
        });
        if (loginErr) throw loginErr;
        setSession(loginData.session);
        await loadProfile();
        pushToast('¡Bienvenido, Templario!');
        navigate('/hub');
      } else {
        // 3. Código nuevo → crear cuenta
        const email = `user_${codeRow.id}@t-store.local`;
        const password = code.trim().toUpperCase();

        const { data: authData, error: authErr } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { code: code.trim().toUpperCase() } },
        });
        if (authErr) throw authErr;

        // Marcar código como usado
        await supabase
          .from('access_codes')
          .update({ is_used: true, used_by: authData.user.id, used_at: new Date().toISOString() })
          .eq('id', codeRow.id);

        setSession(authData.session);
        await loadProfile();
        pushToast('¡Cuenta creada! Bienvenido al Templo.');
        navigate('/hub');
      }
    } catch (err) {
      console.error(err);
      setError('Error al acceder. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // ── Admin login ──
  const handleAdminLogin = () => {
    if (adminPass === 'Fregon9413') {
      // Set admin flag in store for routing
      useAuthStore.setState({ isAdmin: true, user: { id: 'admin' }, session: { user: { id: 'admin' } } });
      pushToast('Acceso admin concedido');
      navigate('/admin');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      fontFamily: "'Crimson Text', serif",
      background: '#060310',
    }}>

      {/* ═══════════════════════════════════════
           LAYER 1 - FONDO RPG
           ═══════════════════════════════════════ */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse at 50% 0%, #1a0a2e 0%, transparent 60%),
          radial-gradient(ellipse at 20% 80%, #0d1f3c 0%, transparent 50%),
          radial-gradient(ellipse at 80% 60%, #1a0a2e 0%, transparent 50%),
          linear-gradient(180deg, #060310 0%, #0a0820 40%, #080615 100%)
        `,
      }} />

      {/* Castillo de fondo */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
          background: 'linear-gradient(to top, #060310 20%, transparent 100%)', zIndex: 2,
        }} />
        {/* Torres */}
        {[
          { w: 60, h: 120, left: '15%', opacity: 0.6, bottom: '30%' },
          { w: 80, h: 180, left: '30%', opacity: 0.7, bottom: '28%' },
          { w: 100, h: 250, left: '45%', opacity: 0.8, bottom: '25%' },
          { w: 80, h: 160, right: '30%', opacity: 0.7, bottom: '28%' },
          { w: 60, h: 110, right: '15%', opacity: 0.5, bottom: '30%' },
        ].map((t, i) => (
          <div key={i} style={{
            position: 'absolute', bottom: t.bottom, left: t.left || 'auto', right: t.right || 'auto',
            width: t.w, height: t.h, opacity: t.opacity,
            background: 'linear-gradient(180deg, #1a1030 0%, #0d0820 100%)',
            borderRadius: '4px 4px 0 0',
          }}>
            <div style={{
              position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
              borderLeft: '15px solid transparent', borderRight: '15px solid transparent',
              borderBottom: '20px solid #2a1845',
            }} />
          </div>
        ))}
      </div>

      {/* Estrellas */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        {Array.from({ length: 80 }, (_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 70}%`,
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            background: 'white', borderRadius: '50%',
            animation: `twinkle ${Math.random() * 2 + 2}s ease-in-out ${Math.random() * 3}s infinite`,
          }} />
        ))}
      </div>

      {/* Partículas */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            borderRadius: '50%',
            background: ['rgba(212,175,55,0.6)', 'rgba(160,100,255,0.5)', 'rgba(255,255,255,0.3)'][
              Math.floor(Math.random() * 3)
            ],
            animation: `particleFloat ${Math.random() * 8 + 6}s linear ${Math.random() * 6}s infinite`,
          }} />
        ))}
      </div>

      {/* Portal ring */}
      <div style={{
        position: 'fixed', bottom: -200, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(160,100,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 1,
        animation: 'portalPulse 4s ease-in-out infinite',
      }} />

      {/* ═══════════════════════════════════════
           CONTENIDO PRINCIPAL
           ═══════════════════════════════════════ */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: 480, padding: 20,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        minHeight: '100vh', justifyContent: 'center',
      }}>

        {/* ── LOGO T-STORE ── */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: 8 }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* SVG Logo */}
          <div style={{ width: 72, height: 72, margin: '0 auto 8px' }}>
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"
              style={{
                width: '100%', height: '100%',
                filter: 'drop-shadow(0 0 16px rgba(212,175,55,0.8))',
                animation: 'logoGlow 2s ease-in-out infinite alternate',
              }}
            >
              <polygon points="40,8 52,20 52,35 40,40 28,35 28,20" fill="rgba(212,175,55,0.15)" stroke="#d4af37" strokeWidth="1.5"/>
              <rect x="30" y="38" width="20" height="28" rx="2" fill="rgba(212,175,55,0.1)" stroke="#d4af37" strokeWidth="1.5"/>
              <rect x="26" y="64" width="28" height="6" rx="2" fill="rgba(212,175,55,0.2)" stroke="#d4af37" strokeWidth="1.5"/>
              <circle cx="40" cy="8" r="3" fill="#d4af37"/>
              <circle cx="40" cy="8" r="5" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="1"/>
            </svg>
          </div>
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 38, fontWeight: 900,
            letterSpacing: 6, lineHeight: 1,
            background: 'linear-gradient(135deg, #c8922a 0%, #f5d06e 40%, #d4af37 60%, #8b5e0a 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            T-STORE
          </div>
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 4,
            color: '#9b7fc7', marginTop: 4, textTransform: 'uppercase',
          }}>
            Templo del Propósito
          </div>
        </motion.div>

        {/* ── MAESTRO PLACEHOLDER ── */}
        <motion.div
          style={{
            position: 'relative', margin: '-10px auto 10px', zIndex: 20,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div style={{
            width: 200, height: 260, position: 'relative', margin: '0 auto',
          }}>
            <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg"
              style={{
                width: '100%', height: '100%',
                filter: 'drop-shadow(0 0 20px rgba(160,100,255,0.5))',
                animation: 'maestroFloat 3s ease-in-out infinite',
              }}
            >
              {/* Silueta del Maestro */}
              <circle cx="60" cy="40" r="25" fill="rgba(160,100,255,0.2)" stroke="#a855f7" strokeWidth="1.5"/>
              <rect x="35" y="70" width="50" height="70" rx="8" fill="rgba(160,100,255,0.15)" stroke="#a855f7" strokeWidth="1.5"/>
              <path d="M35 70 L60 55 L85 70" fill="none" stroke="#a855f7" strokeWidth="1.5"/>
              <circle cx="50" cy="38" r="3" fill="#a855f7"/>
              <circle cx="70" cy="38" r="3" fill="#a855f7"/>
              <path d="M52 48 Q60 55 68 48" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round"/>
              {/* Bastón */}
              <line x1="85" y1="50" x2="85" y2="150" stroke="#a855f7" strokeWidth="2"/>
              <circle cx="85" cy="45" r="8" fill="rgba(160,100,255,0.3)" stroke="#a855f7" strokeWidth="1.5"/>
              <circle cx="85" cy="45" r="4" fill="#a855f7"/>
            </svg>
          </div>
        </motion.div>

        {/* ── PANEL DE LOGIN ── */}
        <motion.div
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, rgba(26,10,46,0.95) 0%, rgba(15,8,32,0.98) 100%)',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: 16, padding: '28px 24px',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 0 40px rgba(160,100,255,0.15), 0 0 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.2)',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Esquinas ornamentales */}
          {[
            { top: 8, left: 8, borderWidth: '2px 0 0 2px', borderRadius: '4px 0 0 0' },
            { top: 8, right: 8, borderWidth: '2px 2px 0 0', borderRadius: '0 4px 0 0' },
            { bottom: 8, left: 8, borderWidth: '0 0 2px 2px', borderRadius: '0 0 0 4px' },
            { bottom: 8, right: 8, borderWidth: '0 2px 2px 0', borderRadius: '0 0 4px 0' },
          ].map((c, i) => (
            <div key={i} style={{
              position: 'absolute', width: 20, height: 20,
              borderColor: '#d4af37', borderStyle: 'solid',
              opacity: 0.6, ...c, borderWidth: c.borderWidth, borderRadius: c.borderRadius,
            }} />
          ))}

          {/* Panel glow */}
          <div style={{
            position: 'absolute', top: '-50%', left: '50%', transform: 'translateX(-50%)',
            width: 200, height: 200,
            background: 'radial-gradient(circle, rgba(160,100,255,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Panel title */}
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: 3,
            color: '#c8922a', textAlign: 'center', marginBottom: 20, textTransform: 'uppercase',
          }}>
            Portal de Acceso
          </div>

          {/* Gems */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
            {[
              { bg: 'radial-gradient(circle at 35% 35%, #ff6b9d, #8b0038)', shadow: '0 0 12px rgba(255,50,100,0.6)', delay: '0s' },
              { bg: 'radial-gradient(circle at 35% 35%, #5dbb6b, #1a5e1a)', shadow: '0 0 12px rgba(50,200,80,0.6)', delay: '0.3s' },
              { bg: 'radial-gradient(circle at 35% 35%, #a855f7, #4b0082)', shadow: '0 0 12px rgba(168,85,247,0.8)', delay: '0.6s' },
              { bg: 'radial-gradient(circle at 35% 35%, #60a5fa, #1e3a8a)', shadow: '0 0 12px rgba(96,165,250,0.6)', delay: '0.9s' },
              { bg: 'radial-gradient(circle at 35% 35%, #fbbf24, #92400e)', shadow: '0 0 12px rgba(251,191,36,0.6)', delay: '1.2s' },
            ].map((g, i) => (
              <div key={i} style={{
                width: 28, height: 28, borderRadius: '50%', position: 'relative',
                background: g.bg, boxShadow: g.shadow,
                animation: 'gemPulse 2s ease-in-out infinite', animationDelay: g.delay,
              }}>
                <div style={{
                  position: 'absolute', inset: 3, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.3)',
                }} />
              </div>
            ))}
          </div>

          {/* Input label */}
          <label style={{
            fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 2,
            color: '#9b7fc7', textTransform: 'uppercase', marginBottom: 8, display: 'block',
          }}>
            Código de Acceso
          </label>

          {/* Code input */}
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <input
              type="text"
              value={code}
              onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="TU-CÓDIGO"
              style={{
                width: '100%', padding: '14px 16px',
                background: 'rgba(10,6,18,0.8)',
                border: error ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(212,175,55,0.3)',
                borderRadius: 8, color: '#f5d06e',
                fontFamily: "'Cinzel', serif", fontSize: 16, letterSpacing: 4,
                textAlign: 'center', outline: 'none', transition: 'all 0.3s ease',
                textTransform: 'uppercase',
              }}
            />
          </div>

          {/* Error message */}
          {error && (
            <div style={{
              padding: 10, borderRadius: 6, textAlign: 'center',
              fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 1,
              marginTop: 8, marginBottom: 8,
              background: 'rgba(127,29,29,0.5)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#fca5a5',
            }}>
              {error}
            </div>
          )}

          {/* Botón principal */}
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: '100%', padding: 16,
              background: 'linear-gradient(135deg, #c8922a 0%, #d4af37 50%, #c8922a 100%)',
              border: 'none', borderRadius: 8, color: '#1a0a00',
              fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 700,
              letterSpacing: 4, textTransform: 'uppercase', cursor: 'pointer',
              position: 'relative', overflow: 'hidden', transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(212,175,55,0.4)',
              marginBottom: 12, opacity: loading ? 0.8 : 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(212,175,55,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,175,55,0.4)';
            }}
          >
            {loading ? '⏳ Accediendo...' : 'Entrar al Templo'}
          </button>

          {/* Texto debajo */}
          <p style={{
            textAlign: 'center', fontSize: 12,
            color: 'rgba(160,130,200,0.6)', fontStyle: 'italic',
            marginBottom: 16, fontFamily: "'Crimson Text', serif",
          }}>
            Ingresa el código de acceso que recibiste
          </p>

          {/* Opciones / Admin link */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button
              onClick={() => setAdminOpen(!adminOpen)}
              style={{
                background: 'none', border: 'none',
                color: 'rgba(155,127,199,0.4)',
                fontFamily: "'Cinzel', serif", fontSize: 10,
                letterSpacing: 2, cursor: 'pointer', padding: '4px 8px',
                display: 'flex', alignItems: 'center', gap: 6,
                textTransform: 'uppercase', transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(212,175,55,0.7)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(155,127,199,0.4)'}
            >
              Admin
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: adminOpen ? 'rgba(212,175,55,0.7)' : 'rgba(155,127,199,0.4)',
                display: 'inline-block', transition: 'background 0.3s',
              }} />
            </button>
          </div>

          {/* Panel Admin Oculto */}
          {adminOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{
                marginTop: 12, padding: 12,
                background: 'rgba(5,3,12,0.9)',
                border: '1px solid rgba(155,127,199,0.2)',
                borderRadius: 8,
              }}
            >
              <input
                type="password"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                placeholder="Contraseña admin"
                style={{
                  width: '100%', padding: '10px 12px',
                  background: 'rgba(10,6,18,0.8)',
                  border: '1px solid rgba(155,127,199,0.3)',
                  borderRadius: 6, color: '#c084fc',
                  fontFamily: "'Cinzel', serif", fontSize: 13,
                  letterSpacing: 2, outline: 'none', marginBottom: 8,
                  textAlign: 'center',
                }}
              />
              <button
                onClick={handleAdminLogin}
                style={{
                  width: '100%', padding: 10,
                  background: 'linear-gradient(135deg, rgba(88,28,135,0.8), rgba(109,40,217,0.8))',
                  border: '1px solid rgba(167,139,250,0.3)', borderRadius: 6,
                  color: '#e9d5ff', fontFamily: "'Cinzel', serif",
                  fontSize: 11, letterSpacing: 3, cursor: 'pointer',
                  textTransform: 'uppercase', transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(109,40,217,0.9), rgba(124,58,237,0.9))';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(167,139,250,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(88,28,135,0.8), rgba(109,40,217,0.8))';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Acceder al Panel
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <div style={{
          textAlign: 'center', marginTop: 16, opacity: 0.4,
          animation: 'fadeIn 1s ease 1s both',
        }}>
          <span style={{
            fontFamily: "'Cinzel', serif", fontSize: 10,
            letterSpacing: 3, color: '#d4af37',
          }}>
            T-STORE
          </span>
        </div>
      </div>
    </div>
  );
}
