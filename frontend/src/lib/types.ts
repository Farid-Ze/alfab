export type Audience = "SALON" | "BARBER";

export type Product = {
  slug: string;
  name: string;
  brand: string;
  audience: Audience[];
  functions: string[];
  summary: string;
  benefits: string[];
  howToUse: string;
};
