import { Grid, GridItem, VStack, Flex, Box } from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { SkeletonOverview } from "../components/overview";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import AnnualSaleSkeleton from "../components/AnnualSaleSkeleton";
import { ErrorBoundary } from "react-error-boundary";

const WeeklySales = lazy(() => import("../components/WeeklySales"));
const ActiveProducts = lazy(() => import("../components/ActiveProducts"));
const OverviewProducts = lazy(() =>
  import("../components/overview").then((mod) => ({
    default: mod.OverviewProducts,
  }))
);
const OverviewCategories = lazy(() =>
  import("../components/overview").then((mod) => ({
    default: mod.OverviewCategories,
  }))
);
const OverviewSales = lazy(() =>
  import("../components/overview").then((mod) => ({
    default: mod.OverviewSales,
  }))
);
const OverviewSuppliers = lazy(() =>
  import("../components/overview").then((mod) => ({
    default: mod.OverviewSuppliers,
  }))
);
const OverviewPurchases = lazy(() =>
  import("../components/overview").then((mod) => ({
    default: mod.OverviewPurchases,
  }))
);
const OverviewUsers = lazy(() =>
  import("../components/overview").then((mod) => ({
    default: mod.OverviewUsers,
  }))
);
const SaleChartByYear = lazy(() => import("../components/SaleChartByYear"));
const ProductGroupByCategories = lazy(
  () => import("../components/ProductGroupByCategories")
);
const PurchasePricesDonut = lazy(
  () => import("../components/PurchasePricesDonut")
);

const Dashboard = () => {
  return (
    <>
      <ErrorBoundary fallback="error to load">
        <Box px="6">
          <Breadcrumbs />
        </Box>
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
          <GridItem h="100%" colSpan={2}>
            <Suspense fallback={<AnnualSaleSkeleton />}>
              <SaleChartByYear />
            </Suspense>
          </GridItem>
          <Flex direction="column" gap={4} h="100%">
            <Suspense fallback={<SkeletonOverview />}>
              <ActiveProducts />
            </Suspense>
            <Suspense fallback={<SkeletonOverview />}>
              <WeeklySales />
            </Suspense>
            <Suspense fallback={<SkeletonOverview />}>
              <PurchasePricesDonut />
            </Suspense>
          </Flex>
          <GridItem colSpan={3}>
            <Suspense fallback={<SkeletonOverview />}>
              <ProductGroupByCategories />
            </Suspense>
          </GridItem>
        </Grid>
      </ErrorBoundary>
    </>
  );
};

export default Dashboard;
