import { lazy, Suspense } from "react";
import Container from "@/layouts/Dashboard/Container";
import { CardLayout } from "@/layouts/System";
import { TableProvider } from "@/components/table";
import TableSkeletonLoader from "@/components/ui/table-skeleton-loader";
import { Footer, Header, HeaderList } from "../components/list";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "@/layouts/Error/ErrorPage";

const SaleTable = lazy(() =>
  import("../components/list").then((mod) => ({
    default: mod.SaleTable,
  }))
);

const SaleList = () => {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Container>
        <TableProvider pathKey="_id">
          <CardLayout footer={<Footer />} header={<Header />}>
            <HeaderList />
            <Suspense fallback={<TableSkeletonLoader />}>
              <SaleTable />
            </Suspense>
          </CardLayout>
        </TableProvider>
      </Container>
    </ErrorBoundary>
  );
};

export { SaleList };
