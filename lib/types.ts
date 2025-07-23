export type FilterState = {
  category: string;
  price: string;
  deal: string;
  availability: string;
  setCategory: (value: string) => void;
  setPrice: (value: string) => void;
  setDeal: (value: string) => void;
  setAvailability: (value: string) => void;
};
