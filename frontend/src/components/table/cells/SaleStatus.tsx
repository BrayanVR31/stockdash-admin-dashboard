import _ from "lodash";
import { Badge, Table } from "@chakra-ui/react";
import { HeadCol } from "@/types/table";

type Props<T> = Omit<
  Extract<
    HeadCol,
    {
      type: "sale-status";
    }
  >,
  "title" | "type"
> & {
  item: T;
};

type Status = "pending" | "completed" | "canceled";
const getColorStatus = {
  pending: "blue",
  completed: "green",
  canceled: "red",
};

const SaleStatus = <T,>({ path, item }: Props<T>) => {
  const status = _.get(item, path, "pending") as Status;
  return (
    <Table.Cell>
      <Badge colorPalette={getColorStatus[status]}>{status}</Badge>
    </Table.Cell>
  );
};

export { SaleStatus };
