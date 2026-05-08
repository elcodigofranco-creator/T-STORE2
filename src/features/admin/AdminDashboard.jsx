import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUIStore } from '../../store/useUIStore';
import { useSupabaseQuery } from '../../hooks/useSupabaseQuery';
import { adminService } from '../../services/admin.service';

export default function AdminDashboard() {
  const pushToast = useUIStore((s) => s.pushToast);

  // ── Stats ──
  const { data: stats } = useSupabaseQuery(() => adminService.getDashboardStats(), []);

  // ── Users ──
  const { data: users, refetch: refetchUsers } = useSupabaseQuery(() => adminService.getAllUsers(), []);

  // ── Missions ──
  const { data: missions, refetch: refetchMissions } = useSupabaseQuery(() => adminService.getActiveMissions(), []);

  // ── Deposit Form ──
  const [depUser, setDepUser] = useState('');
  const [depAmt, setDepAmt] = useState('');
  const [depMotivo, setDepMotivo] = useState('mision');

  const handleDeposit = async () => {
    if (!depUser || !depAmt) return;
    // Find user by email or name
    const user = users?.find(
      (u) => u.email === depUser || u.templario_name === depUser
    );
    if (!user) {
      pushToast('Usuario no encontrado', 'error');
      return;
    }
    await adminService.depositCristales(user.id, parseInt(depAmt), depMotivo);
    pushToast(`+${depAmt} cristales a ${user.templario_name}`);
    setDepUser('');
    setDepAmt('');
    refetchUsers();
  };

  // ── Mission Toggle ──
  const toggleMission = async (id, currentActive) => {
    await adminService.toggleMission(id, !currentActive);
    refetchMissions();
  };

  // ── Generate Codes ──
  const [codeCount, setCodeCount] = useState(5);
  const [generatedCodes, setGeneratedCodes] = useState([]);

  const handleGenerateCodes = async () => {
    const codes = await adminService.generateCodes(codeCount);
    setGeneratedCodes(codes);
    pushToast(`${codes.length} códigos generados`);
  };

  return (
    <div>
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-7">
        {[
          { icon: '👥', label: 'Templarios Activos', value: stats?.totalUsers ?? 0, color: 'rgba(212,175,55,0.6)' },
          { icon: '💜', label: 'Cristales en Circulación', value: stats?.totalCristales ?? 0, color: 'rgba(168,85,247,0.6)' },
          { icon: '🛒', label: 'Compras Realizadas', value: stats?.totalOrders ?? 0, color: 'rgba(34,197,94,0.6)' },
          { icon: '⚔️', label: 'Misiones Activas', value: stats?.totalMissions ?? 0, color: 'rgba(96,165,250,0.6)' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-gradient-to-br from-dark-400/90 to-dark-800/90 
              border border-gold/20 rounded-xl p-5 relative overflow-hidden"
            style={{ '--c': stat.color }}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent" 
              style={{ backgroundImage: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }} />
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="font-cinzel text-2xl font-black text-gold-light">{stat.value}</div>
            <div className="font-cinzel text-[11px] tracking-[2px] text-purple-muted uppercase mt-1">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Deposit Cristales */}
      <div className="bg-gradient-to-br from-dark-400/90 to-dark-800/90 
        border border-gold/15 rounded-xl p-5 mb-6">
        <h2 className="font-cinzel text-[13px] tracking-[3px] text-gold/90 uppercase mb-4 pb-3 
          border-b border-gold/10">
          💜 Depositar Cristales a Templario
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
          <div>
            <label className="block font-cinzel text-[9px] tracking-[2px] text-purple-muted/70 uppercase mb-1.5">
              Templario (correo o nombre)
            </label>
            <input
              type="text"
              value={depUser}
              onChange={(e) => setDepUser(e.target.value)}
              placeholder="ej: juan@email.com"
              className="w-full px-3.5 py-3 bg-dark-900/90 border border-gold/20 rounded-lg 
                text-gold-light font-cinzel text-[13px] outline-none transition-all
                focus:border-gold/60 focus:shadow-[0_0_14px_rgba(212,175,55,0.1)]"
            />
          </div>
          <div>
            <label className="block font-cinzel text-[9px] tracking-[2px] text-purple-muted/70 uppercase mb-1.5">
              Motivo
            </label>
            <select
              value={depMotivo}
              onChange={(e) => setDepMotivo(e.target.value)}
              className="w-full px-3.5 py-3 bg-dark-900/90 border border-gold/20 rounded-lg 
                text-gold-light font-cinzel text-[13px] outline-none cursor-pointer"
            >
              <option value="mision">Misión completada</option>
              <option value="ranking">Top en 100 Templarios</option>
              <option value="dinamica">Dinámica participación</option>
              <option value="bono">Bono especial</option>
              <option value="manual">Manual (admin)</option>
            </select>
          </div>
          <div>
            <label className="block font-cinzel text-[9px] tracking-[2px] text-purple-muted/70 uppercase mb-1.5">
              Cantidad
            </label>
            <input
              type="number"
              value={depAmt}
              onChange={(e) => setDepAmt(e.target.value)}
              placeholder="500"
              min="1"
              className="w-[120px] px-3.5 py-3 bg-dark-900/90 border border-gold/20 rounded-lg 
                text-gold-light font-cinzel text-[13px] outline-none transition-all
                focus:border-gold/60"
            />
          </div>
        </div>
        <button
          onClick={handleDeposit}
          className="mt-3 px-5 py-3 bg-gradient-to-br from-gold-dark via-gold-bright to-gold-dark 
            border-none rounded-lg text-dark-900 font-cinzel text-[11px] font-black tracking-[3px] uppercase 
            cursor-pointer shadow-[0_4px_16px_rgba(212,175,55,0.3)]
            hover:shadow-[0_8px_24px_rgba(212,175,55,0.5)] hover:-translate-y-[2px] transition-all"
        >
          💜 Depositar
        </button>
        <p className="text-[12px] text-purple-muted/50 italic mt-2">
          * El saldo se reflejará inmediatamente en la cuenta del Templario
        </p>
      </div>

      {/* Users Table */}
      <div className="bg-gradient-to-br from-dark-400/90 to-dark-800/90 
        border border-gold/15 rounded-xl p-5 mb-6">
        <h2 className="font-cinzel text-[13px] tracking-[3px] text-gold/90 uppercase mb-4 pb-3 
          border-b border-gold/10">
          👥 Templarios Registrados
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['Estado', 'Nombre Skool', 'Templario', 'Email', 'Cristales', 'Ingreso', 'Acciones'].map((h) => (
                  <th key={h} className="font-cinzel text-[9px] tracking-[2px] text-purple-muted/70 
                    uppercase py-2.5 px-3.5 text-left border-b border-gold/10">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users?.map((u) => (
                <tr key={u.id} className="hover:bg-gold/[0.03] transition-colors">
                  <td className="py-3 px-3.5">
                    <span className={`inline-block w-2 h-2 rounded-full ${u.is_active !== false ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-white/20'}`} />
                  </td>
                  <td className="py-3 px-3.5 font-cinzel text-[12px]">{u.skool_name}</td>
                  <td className="py-3 px-3.5 text-gold-light text-[12px]">{u.templario_name}</td>
                  <td className="py-3 px-3.5 text-purple-muted/70 text-[12px]">{u.email}</td>
                  <td className="py-3 px-3.5">
                    <span className="inline-flex items-center gap-1 bg-purple/12 border border-purple/30 
                      rounded-full px-2.5 py-0.5 font-cinzel text-[12px] text-purple-light">
                      💜 {u.cristales?.toLocaleString() || 0}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-purple-muted/50 text-[11px]">
                    {u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}
                  </td>
                  <td className="py-3 px-3.5 flex gap-1.5 flex-wrap">
                    <button className="px-3 py-1 bg-gold/8 border border-gold/20 rounded-md 
                      text-gold/80 font-cinzel text-[9px] tracking-[1px] uppercase
                      hover:bg-gold/18 hover:text-gold-light transition-all">
                      + Cristales
                    </button>
                    <button className="px-3 py-1 border border-red-500/20 rounded-md 
                      text-red-400/60 font-cinzel text-[9px] tracking-[1px] uppercase
                      hover:bg-red-500/10 hover:text-red-400 transition-all">
                      Revocar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!users || users.length === 0 ? (
          <div className="text-center py-8 text-purple-muted">No hay usuarios registrados aún.</div>
        ) : null}
      </div>

      {/* Missions Management */}
      <div className="bg-gradient-to-br from-dark-400/90 to-dark-800/90 
        border border-gold/15 rounded-xl p-5 mb-6">
        <h2 className="font-cinzel text-[13px] tracking-[3px] text-gold/90 uppercase mb-4 pb-3 
          border-b border-gold/10">
          ⚔️ Gestión de Misiones
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {missions?.map((m) => (
            <div key={m.id} className="bg-dark-900/80 border border-purple/20 rounded-xl p-4">
              <button
                onClick={() => toggleMission(m.id, m.is_active)}
                className={`float-right w-9 h-5 rounded-full transition-all duration-300 relative border-none
                  ${m.is_active ? 'bg-green-500' : 'bg-white/10'}`}
              >
                <span className={`absolute w-[14px] h-[14px] bg-white rounded-full top-[3px] transition-all duration-300
                  ${m.is_active ? 'left-[19px]' : 'left-[3px]'}`} />
              </button>
              <h3 className="font-cinzel text-[12px] text-gold-light mb-1.5 pr-10">{m.title}</h3>
              <p className="text-[12px] text-purple-light/70 leading-relaxed mb-2.5">{m.description}</p>
              <span className="font-cinzel text-[13px] text-purple-light">
                💜 {m.coin_reward || 0} cristales
              </span>
            </div>
          ))}
        </div>
        {!missions || missions.length === 0 ? (
          <div className="text-center py-8 text-purple-muted">No hay misiones creadas aún.</div>
        ) : null}
      </div>

      {/* Generate Access Codes */}
      <div className="bg-gradient-to-br from-dark-400/90 to-dark-800/90 
        border border-gold/15 rounded-xl p-5 mb-6">
        <h2 className="font-cinzel text-[13px] tracking-[3px] text-gold/90 uppercase mb-4 pb-3 
          border-b border-gold/10">
          🔑 Generar Códigos de Acceso
        </h2>
        <div className="flex items-end gap-3">
          <div>
            <label className="block font-cinzel text-[9px] tracking-[2px] text-purple-muted/70 uppercase mb-1.5">
              Cantidad
            </label>
            <input
              type="number"
              value={codeCount}
              onChange={(e) => setCodeCount(parseInt(e.target.value))}
              min="1"
              max="100"
              className="w-[100px] px-3.5 py-3 bg-dark-900/90 border border-gold/20 rounded-lg 
                text-gold-light font-cinzel text-[13px] outline-none"
            />
          </div>
          <button
            onClick={handleGenerateCodes}
            className="px-5 py-3 bg-gradient-to-br from-purple-deep to-purple 
              border border-purple/30 rounded-lg text-purple-light font-cinzel 
              text-[11px] font-black tracking-[3px] uppercase cursor-pointer
              shadow-[0_4px_16px_rgba(168,85,247,0.3)]
              hover:shadow-[0_8px_24px_rgba(168,85,247,0.5)] hover:-translate-y-[2px] transition-all"
          >
            Generar
          </button>
        </div>

        {generatedCodes.length > 0 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {generatedCodes.map((c) => (
              <div key={c.id} className="bg-dark-900/90 border border-gold/20 rounded-lg px-3 py-2 
                font-cinzel text-xs text-gold-light tracking-[2px] text-center">
                {c.code}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
