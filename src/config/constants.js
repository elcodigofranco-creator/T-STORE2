// ── App Constants ──

export const APP_NAME = 'T-STORE';
export const APP_SUBTITLE = 'Templo del Propósito';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  HUB: '/hub',
  STORE: '/store',
  STORE_PRODUCT: '/store/:id',
  LIBRARY: '/library',
  INVENTORY: '/inventory',
  MISSIONS: '/missions',
  PROFILE: '/profile',
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_MISSIONS: '/admin/missions',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_ASSETS: '/admin/assets',
};

export const ROLES = {
  USER: 'templario',
  ADMIN: 'administrador',
};

export const AVATAR_OPTIONS = ['⚔️', '🛡️', '🏹', '🔮', '📜', '👁️', '🗡️', '🦅'];

export const MISSION_TYPES = ['daily', 'weekly', 'story', 'event'];

export const PRODUCT_CATEGORIES = ['skin', 'weapon', 'consumable', 'mount', 'spell', 'armor'];

export const RARITY_LEVELS = ['common', 'rare', 'epic', 'legendary'];

export const RARITY_COLORS = {
  common: { text: 'text-gray-300', border: 'border-gray-500', bg: 'bg-gray-500/10', label: 'Común' },
  rare: { text: 'text-blue-400', border: 'border-blue-500', bg: 'bg-blue-500/10', label: 'Raro' },
  epic: { text: 'text-purple-400', border: 'border-purple-500', bg: 'bg-purple-500/10', label: 'Épico' },
  legendary: { text: 'text-gold', border: 'border-gold', bg: 'bg-gold/10', label: 'Legendario' },
};
