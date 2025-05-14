import { Grid, GridItem, VStack } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { SkeletonOverview } from "../components/overview";

const WeeklySales = lazy(() => import("../components/WeeklySales"));
const ActiveProducts = lazy(() => import("../components/ActiveProducts"));
const OverviewProducts = lazy(() =>
  import("../components/overview").then((mod) => ({
    default: mod.OverviewProducts,
  })),
);
const OverviewCategories = lazy(() =>
  import("../components/overview").then((mod) => ({
    default: mod.OverviewCategories,
  })),
);
const OverviewSales = lazy(() =>
  import("../components/overview").then((mod) => ({
    default: mod.OverviewSales,
  })),
);
const OverviewSuppliers = lazy(() =>
  import("../components/overview").then((mod) => ({
    default: mod.OverviewSuppliers,
  })),
);
const OverviewPurchases = lazy(() =>
  import("../components/overview").then((mod) => ({
    default: mod.OverviewPurchases,
  })),
);
const OverviewUsers = lazy(() =>
  import("../components/overview").then((mod) => ({
    default: mod.OverviewUsers,
  })),
);
const SaleChartByYear = lazy(() => import("../components/SaleChartByYear"));

const Dashboard = () => {
  return (
    <Grid p="6" templateColumns="repeat(3, 1fr)" alignItems="start" gap={4}>
      <Suspense fallback={<SkeletonOverview />}>
        <OverviewProducts />
      </Suspense>
      <Suspense fallback={<SkeletonOverview />}>
        <OverviewCategories />
      </Suspense>
      <Suspense fallback={<SkeletonOverview />}>
        <OverviewSales />
      </Suspense>
      <Suspense fallback={<SkeletonOverview />}>
        <OverviewSuppliers />
      </Suspense>
      <Suspense fallback={<SkeletonOverview />}>
        <OverviewPurchases />
      </Suspense>
      <Suspense fallback={<SkeletonOverview />}>
        <OverviewUsers />
      </Suspense>
      <GridItem colSpan={2}>
        <Suspense fallback={<SkeletonOverview />}>
          <SaleChartByYear />
        </Suspense>
      </GridItem>
      <Grid gap={4}>
        <Suspense fallback={<SkeletonOverview />}>
          <ActiveProducts />
        </Suspense>
        <Suspense fallback={<SkeletonOverview />}>
          <WeeklySales />
        </Suspense>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
