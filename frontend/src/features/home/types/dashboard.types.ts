import { ReactNode } from "react";

export interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: string;
  isLoading?: boolean;
}

export interface DashboardData {
  totalUsers: number;
  totalProducts: number;
  totalSuppliers: number;
  totalSales: number;
  salesGrowth: number;
  activeProducts: number;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  helpText: string;
  icon: ReactNode;
  isLoading?: boolean;
}

export interface Product {
  id: string;
  name: string;
  status: "active" | "inactive";
  // Add other product fields as needed
}

export interface Products {
  data: Product[];
  total: number;
  page: number;
  perPage: number;
}

export interface Sales {
  data: any[];
  total: number;
  page: number;
  perPage: number;
}

export interface Suppliers {
  data: any[];
  total: number;
  page: number;
  perPage: number;
}

export interface Users {
  data: any[];
  total: number;
  page: number;
  perPage: number;
}
