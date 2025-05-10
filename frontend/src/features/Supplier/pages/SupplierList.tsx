import { lazy, Suspense } from "react";
import Container from "@/layouts/Dashboard/Container";
import { CardLayout } from "@/layouts/System";
import { TableProvider } from "@/components/table";
import TableSkeletonLoader from "@/components/ui/table-skeleton-loader";
import { Footer, Header, HeaderList } from "../components/list";
import { ErrorBoundary } from "react-error-boundary";
import errorLoadData, { resetQuery } from "@/components/error/errorLoadData";

const SupplierTable = lazy(() =>
  import("../components/list").then((mod) => ({
    default: mod.SupplierTable,
  })),
);

const SupplierList = () => {
  return (
    <Container>
      <TableProvider pathKey="_id">
        <CardLayout footer={<Footer />} header={<Header />}>
          <HeaderList />
          <ErrorBoundary
            fallbackRender={errorLoadData}
            onReset={resetQuery("suppliers")}
          >
            <Suspense fallback={<TableSkeletonLoader />}>
              <SupplierTable />
            </Suspense>
          </ErrorBoundary>
        </CardLayout>
      </TableProvider>
    </Container>
  );
};

export { SupplierList };
