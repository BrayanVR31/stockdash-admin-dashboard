import { Table } from "@chakra-ui/react";
import { HeadingCol } from "./Table";
import { memo } from "react";

interface Props {
  fields: HeadingCol[];
}

const HeaderList = memo(({ fields }: Props) => {
  return (
    <>
      {fields.map(({ path, content }) => (
        <Table.ColumnHeader key={path}>{content}</Table.ColumnHeader>
      ))}
    </>
  );
});

export default HeaderList;
