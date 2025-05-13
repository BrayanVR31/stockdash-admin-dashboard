export type WeeklySales = {
  _id: Date;
  count: number;
};

type ProductsByWeek = {
  date: string;
  value: number;
};

export type WeeklyStatusProducts = {
  active: {
    count: number;
    productsByWeek: ProductsByWeek[];
  };
  inactive: {
    count: number;
    productsByWeek: ProductsByWeek[];
  };
};

export type GroupedProductsByCategory = {
  count: number;
  category: string;
};
