import { Grid } from "@chakra-ui/react";
import { lazy, Suspense } from "react";

const WeeklySales = lazy(() => import("../components/WeeklySales"));
const ActiveProducts = lazy(() => import("../components/ActiveProducts"));
const GroupProducts = lazy(() => import("../components/GroupProducts"));

const Dashboard = () => {
  return (
    <Grid p="6" templateColumns="repeat(3, 1fr)" alignItems="start" gap={14}>
      <Suspense fallback={"loading..."}>
        <GroupProducts />
      </Suspense>
      <Suspense fallback={"loading..."}>
        <WeeklySales />
      </Suspense>
      <Suspense fallback={"loading..."}>
        <ActiveProducts />
      </Suspense>
    </Grid>
  );
};

export default Dashboard;
