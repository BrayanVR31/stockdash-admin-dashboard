import { Stack } from "@chakra-ui/react";
import { PerPage, PagingTable } from "@/components/table";

const Footer = () => {
  return (
    <Stack
      direction={{
        base: "column",
        md: "row",
      }}
      w="full"
      justify="space-between"
    >
      <PerPage />
      <PagingTable />
    </Stack>
  );
};

export { Footer };
