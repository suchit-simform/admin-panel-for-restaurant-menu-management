export const AppActions = {
  CREATE: "create",
  READ: "read",
  UPDATE: "update",
  DELETE: "delete",
  MANAGE: "manage",
} as const;

export const AppSubjects = {
  KPI: "kpi",
  DASHBOARD: "dashboard",
  CATEGORY: "category",
  INGREDIENT: "ingredient",
  MENU: "menu",
  ALL: "all",
} as const;

export type AppActionsType = (typeof AppActions)[keyof typeof AppActions];
export type AppSubjectsType = (typeof AppSubjects)[keyof typeof AppSubjects];
