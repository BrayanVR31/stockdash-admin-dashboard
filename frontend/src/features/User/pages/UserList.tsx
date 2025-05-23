import { lazy, Suspense } from "react";
import Container from "@/layouts/Dashboard/Container";
import { CardLayout } from "@/layouts/System";
import { TableProvider } from "@/components/table";
import TableSkeletonLoader from "@/components/ui/table-skeleton-loader";
import { Footer, Header, HeaderList } from "../components/list";
import { ErrorBoundary } from "react-error-boundary";
import errorLoadData, { resetQuery } from "@/components/error/errorLoadData";
import useSystemErrorStore from "@/store/systemErrorStore";
import { useLocation } from "react-router";
import { getPrevPath, concatSiblingPaths, extractPaths } from "@/utils/paths";

const UserTable = lazy(() =>
  import("../components/list").then((mod) => ({
    default: mod.UserTable,
  })),
);

const UserList = () => {
  return (
    <Container>
      <TableProvider pathKey="_id">
        <CardLayout footer={<Footer />} header={<Header />}>
          <HeaderList />
          <ErrorBoundary fallbackRender={errorLoadData}>
            <Suspense fallback={<TableSkeletonLoader />}>
              <UserTable />
            </Suspense>
          </ErrorBoundary>
        </CardLayout>
      </TableProvider>
    </Container>
  );
};

/**
<ErrorBoundary
  fallbackRender={errorLoadData}
  onReset={resetQuery("suppliers")}
>
*/
export { UserList };
