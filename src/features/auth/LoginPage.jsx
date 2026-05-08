import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import RPGBackground from '../../components/ui/RPGBackground';
import RPGPanel from '../../components/ui/RPGPanel';
import RPGButton from '../../components/ui/RPGButton';
import RPGInput from '../../components/ui/RPGInput';
import Gems from '../../components/ui/Gems';
import Maestro from '../../components/rpg/Maestro';
import { useAuthStore } from '../../store/useAuthStore';
import { usePlayerStore } from '../../store/usePlayerStore';
import { useUIStore } from '../../store/useUIStore';
import { APP_NAME, APP_SUBTITLE } from '../../config/constants';

export default function LoginPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const navigate = useNavigate();
  const loginWithCode = useAuthStore((s) => s.loginWithCode);
  const setPlayerData = usePlayerStore((s) => s.setPlayerData);
  const pushToast = useUIStore((s) => s.pushToast);

  const handleLogin = async () => {
    if (!code.trim()) {
      setError('Ingresa tu código de acceso');
      return;
    }
    setError('');
    try {
      await loginWithCode(code.trim());
      pushToast('¡Bienvenido, Templario!');
      navigate('/hub');
    } catch (err) {
      setError('Código inválido o no encontrado');
    }
  };

  const handleAdminLogin = () => {
    if (adminPass === 'admin123') {
      pushToast('Acceso admin concedido');
      navigate('/admin');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <>
      <RPGBackground />
      <motion.div
        className="relative z-10 w-full flex flex-col items-center min-h-screen justify-center py-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <motion.div
          className="text-center mb-2"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* SVG Logo */}
          <div className="w-[72px] h-[72px] mx-auto mb-2">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              style={{ filter: 'drop-shadow(0 0 16px rgba(212,175,55,0.8))', animation: 'logoGlow 2s ease-in-out infinite alternate' }}
            >
              <polygon points="40,8 52,20 52,35 40,40 28,35 28,20" fill="rgba(212,175,55,0.15)" stroke="#d4af37" strokeWidth="1.5"/>
              <rect x="30" y="38" width="20" height="28" rx="2" fill="rgba(212,175,55,0.1)" stroke="#d4af37" strokeWidth="1.5"/>
              <rect x="26" y="64" width="28" height="6" rx="2" fill="rgba(212,175,55,0.2)" stroke="#d4af37" strokeWidth="1.5"/>
              <circle cx="40" cy="8" r="3" fill="#d4af37"/>
              <circle cx="40" cy="8" r="5" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="1"/>
            </svg>
          </div>
          <h1 className="font-cinzel text-[38px] font-black tracking-[6px] text-gold-gradient leading-none">
            {APP_NAME}
          </h1>
          <p className="font-cinzel text-[11px] tracking-[4px] text-purple-muted mt-1 uppercase">
            {APP_SUBTITLE}
          </p>
        </motion.div>

        {/* Maestro */}
        <motion.div
          className="relative my-[-10px] z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Maestro size="default" />
        </motion.div>

        {/* Login Panel */}
        <RPGPanel className="mt-2" title="Portal de Acceso">
          {/* Gems */}
          <div className="flex justify-center gap-3 mb-5">
            <Gems size="md" />
          </div>

          {/* Code Input */}
          <RPGInput
            label="Código de Acceso"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="TU-CÓDIGO"
            center
            error={error}
          />

          {/* Login Button */}
          <RPGButton fullWidth className="mt-4 text-[15px]" onClick={handleLogin}>
            Entrar al Templo
          </RPGButton>

          {/* Note */}
          <p className="text-center text-[12px] text-purple-muted/60 italic mt-3 mb-4 font-crimson">
            Ingresa el código que recibiste al registrarte
          </p>

          {/* Options */}
          <div className="flex items-center justify-center">
            <Link to="/register" className="text-[10px] font-cinzel tracking-[2px] text-purple-muted/50 
              hover:text-gold-light transition-colors uppercase">
              ¿No tienes código? Regístrate aquí
            </Link>
          </div>

          {/* Admin Toggle */}
          <div className="flex items-center justify-center mt-3">
            <button
              onClick={() => setAdminOpen(!adminOpen)}
              className="flex items-center gap-2 text-[10px] font-cinzel tracking-[2px] 
                text-purple-muted/40 hover:text-gold/70 transition-colors uppercase"
            >
              Admin
              <span className="w-[6px] h-[6px] rounded-full bg-purple-muted/40 
                hover:bg-gold/70 transition-colors" />
            </button>
          </div>

          {/* Admin Panel */}
          {adminOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 p-3 bg-dark-900/90 border border-purple/20 rounded-lg"
            >
              <input
                type="password"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                placeholder="Contraseña admin"
                className="w-full px-3 py-2.5 bg-dark-900/80 border border-purple/30 rounded-md 
                  text-purple-light font-cinzel text-[13px] tracking-[2px] outline-none text-center
                  focus:border-purple/60"
              />
              <button
                onClick={handleAdminLogin}
                className="w-full mt-2 px-3 py-2.5 bg-gradient-to-br from-purple-deep to-purple 
                  border border-purple/30 rounded-md text-purple-light font-cinzel 
                  text-[11px] tracking-[3px] uppercase hover:shadow-[0_0_20px_rgba(167,139,250,0.3)] 
                  transition-all"
              >
                Acceder al Panel
              </button>
            </motion.div>
          )}
        </RPGPanel>

        {/* Footer */}
        <div className="text-center mt-4 opacity-40">
          <span className="font-cinzel text-[10px] tracking-[3px] text-gold">
            {APP_NAME}
          </span>
        </div>
      </motion.div>
    </>
  );
}
