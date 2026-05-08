import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import RPGPanel from '../../components/ui/RPGPanel';
import RPGButton from '../../components/ui/RPGButton';
import RPGInput from '../../components/ui/RPGInput';
import Gems from '../../components/ui/Gems';
import Maestro from '../../components/rpg/Maestro';
import { useUIStore } from '../../store/useUIStore';
import { AVATAR_OPTIONS } from '../../config/constants';

const STEPS = [
  { num: 1, title: 'Bienvenido al Templo', subtitle: 'Un nuevo camino te espera' },
  { num: 2, title: 'Tu Identidad', subtitle: '¿Quién eres en este reino?' },
  { num: 3, title: 'Elige tu Avatar', subtitle: 'Tu símbolo entre los Templarios' },
  { num: 4, title: 'Confirma tus Datos', subtitle: 'Revisa antes de continuar' },
  { num: 5, title: '¡Registro Completo!', subtitle: 'El Templo te recibe' },
];

export default function RegisterPage() {
  const { registerStep, registerData, setRegisterStep, setRegisterData, resetRegister } = useUIStore();
  const [step, setStep] = useState(registerStep || 1);
  const [email, setEmail] = useState(registerData.email || '');
  const [skoolName, setSkoolName] = useState(registerData.skoolName || '');
  const [templarioName, setTemplarioName] = useState(registerData.templarioName || '');
  const [avatar, setAvatar] = useState(registerData.avatar || '');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setRegisterStep(step);
  }, [step, setRegisterStep]);

  const nextStep = () => {
    if (step === 2) {
      const newErrors = {};
      if (!email.includes('@')) newErrors.email = 'Email inválido';
      if (skoolName.length < 3) newErrors.skool = 'Mínimo 3 caracteres';
      if (templarioName.length < 3) newErrors.templario = 'Mínimo 3 caracteres';
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }
    if (step === 3 && !avatar) return;
    setErrors({});
    setStep((s) => Math.min(s + 1, STEPS.length));
  };

  const prevStep = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  };

  useEffect(() => {
    setRegisterData({ email, skoolName, templarioName, avatar });
  }, [email, skoolName, templarioName, avatar, setRegisterData]);

  const handleComplete = () => {
    // In production: call Supabase to create user
    // For now: redirect to login
    resetRegister();
    navigate('/login');
  };

  const progress = (step / STEPS.length) * 100;

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-dark-900">
      {/* Header */}
      <div className="flex items-center justify-between px-[18px] py-2.5 flex-shrink-0">
        <div className="font-cinzel text-[13px] font-black tracking-[4px] text-gold-gradient">
          T-STORE
        </div>
        <div className="font-cinzel text-[9px] tracking-[2px] text-purple-muted">
          PASO {step} DE {STEPS.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-[3px] mx-[18px] mb-0 bg-white/[0.06] rounded-[3px] overflow-hidden flex-shrink-0">
        <div
          className="h-full rounded-[3px] bg-gradient-to-r from-gold-dark to-gold-light 
            shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all duration-500 ease-[cubic-bezier(.34,1.56,.64,1)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Content Area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {/* ── STEP 1: Welcome ── */}
          {step === 1 && (
            <motion.div
              key="step1"
              className="absolute inset-0 flex flex-col"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.45 }}
            >
              {/* Maestro Zone */}
              <div className="relative flex-0 h-[50vh] min-h-[240px] max-h-[380px] flex items-end justify-center overflow-hidden">
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] 
                    bg-radial-gradient from-purple/25 to-transparent z-1"
                  style={{ animation: 'auraPulse 3s ease-in-out infinite' }}
                />
                <Maestro size="entrance" />
                {/* Fade gradient at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[60%] z-2"
                  style={{ background: 'linear-gradient(to top, rgba(6,3,16,0.98) 0%, rgba(6,3,16,0.4) 60%, transparent 100%)' }}
                />
              </div>

              {/* Panel */}
              <div className="flex-1 overflow-y-auto px-3 pb-5" style={{ scrollbarWidth: 'none' }}>
                <RPGPanel className="mt-[-24px]">
                  <div className="flex items-center gap-2.5 mb-3 pb-2.5 border-b border-gold/10">
                    <div className="w-9 h-9 bg-gradient-to-br from-purple-deep to-purple border-2 border-gold 
                      rounded-lg flex items-center justify-center font-cinzel text-lg font-black text-gold-light
                      shadow-[0_0_20px_rgba(212,175,55,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]">
                      1
                    </div>
                    <div>
                      <div className="font-cinzel text-[11px] tracking-[2px] text-gold/90 uppercase">
                        {STEPS[0].title}
                      </div>
                      <div className="font-crimson text-[12px] text-purple-muted/55 italic">
                        {STEPS[0].subtitle}
                      </div>
                    </div>
                  </div>

                  <p className="text-purple-light/80 text-[13px] leading-relaxed mb-4">
                    Bienvenido al <strong className="text-gold-light">Templo del Propósito</strong>.
                    Aquí comenzarás tu camino como <b className="text-gold-dark">Templario</b>.
                    Prepárate para una experiencia única.
                  </p>

                  <div className="flex items-center gap-1.5 mb-3 text-purple-muted/40 font-cinzel text-[9px] tracking-[1px]">
                    <span className="text-[15px]" style={{ animation: 'handBounce 1.5s ease-in-out infinite' }}>
                      👇
                    </span>
                    Continúa para comenzar tu registro
                  </div>

                  <RPGButton fullWidth onClick={nextStep}>
                    Comenzar el Camino
                  </RPGButton>
                </RPGPanel>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Identity ── */}
          {step === 2 && (
            <motion.div
              key="step2"
              className="absolute inset-0 flex flex-col"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.45 }}
            >
              {/* Maestro Zone (smaller) */}
              <div className="relative h-[42vh] min-h-[200px] max-h-[320px] flex items-end justify-center overflow-hidden">
                <Maestro size="large" />
                <div
                  className="absolute bottom-0 left-0 right-0 h-[60%] z-2"
                  style={{ background: 'linear-gradient(to top, rgba(6,3,16,0.98) 0%, rgba(6,3,16,0.4) 60%, transparent 100%)' }}
                />
              </div>

              <div className="flex-1 overflow-y-auto px-3 pb-5" style={{ scrollbarWidth: 'none' }}>
                <RPGPanel className="mt-[-24px]">
                  <div className="flex items-center gap-2.5 mb-4 pb-2.5 border-b border-gold/10">
                    <div className="w-9 h-9 bg-gradient-to-br from-purple-deep to-purple border-2 border-gold 
                      rounded-lg flex items-center justify-center font-cinzel text-lg font-black text-gold-light
                      shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                      2
                    </div>
                    <div>
                      <div className="font-cinzel text-[11px] tracking-[2px] text-gold/90 uppercase">
                        Tu Identidad
                      </div>
                      <div className="font-crimson text-[12px] text-purple-muted/55 italic">
                        ¿Quién eres en este reino?
                      </div>
                    </div>
                  </div>

                  <RPGInput
                    label="Email"
                    icon="📧"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    error={errors.email}
                  />
                  <RPGInput
                    label="Nombre en Skool"
                    icon="👤"
                    value={skoolName}
                    onChange={(e) => setSkoolName(e.target.value)}
                    placeholder="Tu nombre en la comunidad"
                    error={errors.skool}
                  />
                  <RPGInput
                    label="Nombre de Templario"
                    icon="⚔️"
                    value={templarioName}
                    onChange={(e) => setTemplarioName(e.target.value)}
                    placeholder="TemplarioFuego"
                    error={errors.templario}
                  />

                  <div className="flex gap-2 mt-4">
                    <RPGButton variant="ghost" onClick={prevStep} className="flex-1">
                      Atrás
                    </RPGButton>
                    <RPGButton onClick={nextStep} className="flex-[2]">
                      Siguiente
                    </RPGButton>
                  </div>
                </RPGPanel>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Avatar ── */}
          {step === 3 && (
            <motion.div
              key="step3"
              className="absolute inset-0 flex flex-col"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.45 }}
            >
              <div className="relative h-[42vh] min-h-[200px] max-h-[320px] flex items-end justify-center overflow-hidden">
                <Maestro size="large" />
                <div
                  className="absolute bottom-0 left-0 right-0 h-[60%] z-2"
                  style={{ background: 'linear-gradient(to top, rgba(6,3,16,0.98) 0%, rgba(6,3,16,0.4) 60%, transparent 100%)' }}
                />
              </div>

              <div className="flex-1 overflow-y-auto px-3 pb-5" style={{ scrollbarWidth: 'none' }}>
                <RPGPanel className="mt-[-24px]">
                  <div className="flex items-center gap-2.5 mb-4 pb-2.5 border-b border-gold/10">
                    <div className="w-9 h-9 bg-gradient-to-br from-purple-deep to-purple border-2 border-gold 
                      rounded-lg flex items-center justify-center font-cinzel text-lg font-black text-gold-light
                      shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                      3
                    </div>
                    <div>
                      <div className="font-cinzel text-[11px] tracking-[2px] text-gold/90 uppercase">
                        Elige tu Avatar
                      </div>
                      <div className="font-crimson text-[12px] text-purple-muted/55 italic">
                        Tu símbolo entre los Templarios
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2.5 flex-wrap justify-center mb-5">
                    {AVATAR_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setAvatar(opt)}
                        className={`w-[52px] h-[52px] rounded-xl flex items-center justify-center text-2xl
                          transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)]
                          ${avatar === opt
                            ? 'border-gold-light bg-gold/14 shadow-[0_0_18px_rgba(212,175,55,0.4)] scale-110 relative'
                            : 'border-purple/20 bg-purple/[0.08] hover:scale-105 active:scale-95'
                          } border-2`}
                      >
                        {opt}
                        {avatar === opt && (
                          <span className="absolute -bottom-[5px] -right-[5px] w-[18px] h-[18px] 
                            bg-green-500 rounded-full text-[10px] text-white flex items-center justify-center font-cinzel">
                            ✓
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <RPGButton variant="ghost" onClick={prevStep} className="flex-1">
                      Atrás
                    </RPGButton>
                    <RPGButton onClick={nextStep} className="flex-[2]" disabled={!avatar}>
                      Elegir este Avatar
                    </RPGButton>
                  </div>
                </RPGPanel>
              </div>
            </motion.div>
          )}

          {/* ── STEP 4: Confirm ── */}
          {step === 4 && (
            <motion.div
              key="step4"
              className="absolute inset-0 flex flex-col"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.45 }}
            >
              <div className="flex-1 overflow-y-auto px-3 py-5" style={{ scrollbarWidth: 'none' }}>
                <RPGPanel>
                  <div className="flex items-center gap-2.5 mb-4 pb-2.5 border-b border-gold/10">
                    <div className="w-9 h-9 bg-gradient-to-br from-purple-deep to-purple border-2 border-gold 
                      rounded-lg flex items-center justify-center font-cinzel text-lg font-black text-gold-light
                      shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                      4
                    </div>
                    <div>
                      <div className="font-cinzel text-[11px] tracking-[2px] text-gold/90 uppercase">
                        Confirma tus Datos
                      </div>
                      <div className="font-crimson text-[12px] text-purple-muted/55 italic">
                        Revisa antes de continuar
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg overflow-hidden border border-gold/15 mb-5">
                    {[
                      { key: 'Email', val: email },
                      { key: 'Skool', val: skoolName },
                      { key: 'Templario', val: templarioName },
                      { key: 'Avatar', val: avatar },
                    ].map((row) => (
                      <div key={row.key} className="flex items-center gap-2 px-3 py-2 
                        bg-gold/[0.03] border-b border-gold/[0.07] last:border-b-0">
                        <span className="font-cinzel text-[9px] tracking-[1px] text-purple-muted/60 
                          min-w-[68px]">
                          {row.key}
                        </span>
                        <span className="font-cinzel text-[11px] text-gold-light flex-1 truncate">
                          {row.key === 'Avatar' ? (
                            <span className="text-2xl">{row.val}</span>
                          ) : (
                            row.val
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <ul className="space-y-1.5 mb-5">
                    {[
                      'Recibirás un código de acceso por email',
                      'Úsalo para entrar al Templo',
                      'Tu avatar te identificará entre Templarios',
                    ].map((text, i) => (
                      <li key={i} className="flex items-start gap-2 px-2.5 py-2 
                        bg-green-500/[0.04] border border-green-500/12 rounded-lg
                        text-purple-light/85 text-[12px]">
                        <span className="text-green-500 text-sm flex-shrink-0">✓</span>
                        {text}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-2">
                    <RPGButton variant="ghost" onClick={prevStep} className="flex-1">
                      Editar
                    </RPGButton>
                    <RPGButton onClick={nextStep} className="flex-[2]">
                      Confirmar Registro
                    </RPGButton>
                  </div>
                </RPGPanel>
              </div>
            </motion.div>
          )}

          {/* ── STEP 5: Success ── */}
          {step === 5 && (
            <motion.div
              key="step5"
              className="absolute inset-0 flex flex-col"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.45 }}
            >
              <div className="flex-1 overflow-y-auto px-3 py-5" style={{ scrollbarWidth: 'none' }}>
                <RPGPanel>
                  <div className="text-center">
                    <div className="text-[48px] mb-2"
                      style={{ animation: 'xSpin 2s ease-in-out infinite' }}>
                      ✨
                    </div>
                    <h2 className="font-cinzel text-xl font-black text-gold-gradient mb-2">
                      ¡Registro Completado!
                    </h2>
                    <p className="text-purple-light/80 text-[13px] mb-5">
                      <strong className="text-gold-light">{templarioName}</strong>, 
                      el Templo te ha aceptado. Tu avatar te representa.
                    </p>

                    <div className="mb-5">
                      <div className="w-[120px] h-[120px] mx-auto rounded-2xl bg-purple/10 
                        border-2 border-gold/30 flex items-center justify-center text-6xl
                        shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                        {avatar}
                      </div>
                    </div>

                    <p className="text-purple-muted/60 text-[12px] italic mb-5">
                      Revisa tu email para obtener tu código de acceso
                    </p>

                    <RPGButton variant="purple" fullWidth onClick={handleComplete}>
                      Ir al Login
                    </RPGButton>
                  </div>
                </RPGPanel>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gems footer */}
      <div className="flex justify-center pb-4 flex-shrink-0">
        <Gems size="sm" />
      </div>
    </div>
  );
}
