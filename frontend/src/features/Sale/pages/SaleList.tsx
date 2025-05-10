import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Container from "@/layouts/Dashboard/Container";
import { CardLayout } from "@/layouts/System";
import { TableProvider } from "@/components/table";
import TableSkeletonLoader from "@/components/ui/table-skeleton-loader";
import { Footer, Header, HeaderList } from "../components/list";
import errorLoadData, { resetQuery } from "@/components/error/errorLoadData";

const SaleTable = lazy(() =>
  import("../components/list").then((mod) => ({
    default: mod.SaleTable,
  })),
);

const SaleList = () => {
  return (
    <Container>
      <TableProvider pathKey="_id">
        <CardLayout footer={<Footer />} header={<Header />}>
          <HeaderList />
          <ErrorBoundary
            onReset={resetQuery("sales")}
            fallbackRender={errorLoadData}
          >
            <Suspense fallback={<TableSkeletonLoader />}>
              <SaleTable />
            </Suspense>
          </ErrorBoundary>
        </CardLayout>
      </TableProvider>
    </Container>
  );
};

export { SaleList };
