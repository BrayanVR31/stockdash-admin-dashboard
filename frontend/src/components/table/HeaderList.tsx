import { Table, Flex } from "@chakra-ui/react";
import { HeadCol } from "@/types/table";
import { memo } from "react";

interface Props {
  fields: HeadCol[];
}

const HeaderList = memo(({ fields }: Props) => {
  return (
    <>
      {fields.map(({ path, title, type }) => {
        const keyPath = type === "avatar" ? path.join("_") : path;
        return (
          <Table.ColumnHeader border="none" flex="1" key={keyPath!}>
            {title}
          </Table.ColumnHeader>
        );
      })}
    </>
  );
});

export default HeaderList;
