import { Table } from "@chakra-ui/react";
import _ from "lodash";
import { HeadCol, colSizes } from "@/types/table";
import { memo } from "react";

interface Props {
  fields: HeadCol[];
}

const HeaderList = memo(({ fields }: Props) => {
  return (
    <>
      {fields.map(({ path, title, type }) => {
        const keyPath = (type === "avatar" ? path.join("_") : path) as string;
        const colWidth = _.get(colSizes, type, "1");
        return (
          <Table.ColumnHeader
            border="none"
            flex={colWidth}
            overflow="hidden"
            key={keyPath!}
          >
            {title}
          </Table.ColumnHeader>
        );
      })}
    </>
  );
});

export default HeaderList;
