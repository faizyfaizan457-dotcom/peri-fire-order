export type FeatureKey = string;

export type FeatureArea = {
  id: string;
  key: string;
  label: string;
  hint: string | null;
  sortOrder: number;
  active: boolean;
};

/** Fallback defaults used when seeding or restoring permission defaults. */
export const DEFAULT_STAFF_ACCESS: Record<string, { view: boolean; manage: boolean }> = {
  orders: { view: true, manage: true },
  menu: { view: true, manage: false },
  deals: { view: true, manage: false },
  delivery: { view: true, manage: false },
  customers: { view: true, manage: false },
  analytics: { view: false, manage: false },
  settings: { view: false, manage: false },
  staff: { view: false, manage: false },
  audit: { view: true, manage: false },
};

export const FEATURE_KEY_PATTERN = /^[a-z][a-z0-9_-]{1,31}$/;
