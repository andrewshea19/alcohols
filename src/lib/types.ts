export type DrinkCategory =
  | "domestic"
  | "craft"
  | "seltzer"
  | "wine"
  | "spirit"
  | "cocktail";

export interface Drink {
  id: string;
  name: string;
  category: DrinkCategory;
  abv: number;
  volumeOz: number;
  alcohols: number;
}

export interface SessionDrink {
  sessionId: string;
  drink: Drink;
  addedAt: number;
}

export const categoryLabels: Record<
  DrinkCategory,
  { abbr: string; name: string }
> = {
  domestic: { abbr: "Be", name: "Beer" },
  craft: { abbr: "Cr", name: "Craft" },
  seltzer: { abbr: "Sz", name: "Seltzer" },
  wine: { abbr: "Wi", name: "Wine" },
  spirit: { abbr: "Sp", name: "Spirit" },
  cocktail: { abbr: "Ct", name: "Cocktail" },
};

export function calculateAlcohols(abv: number, volumeOz: number): number {
  return Math.round(abv * volumeOz * 10) / 10;
}
