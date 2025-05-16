import _ from "lodash";
import { Text, Table } from "@chakra-ui/react";
import { HeadCol, colSizes } from "@/types/table";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

type Props<T> = Omit<
  Extract<
    HeadCol,
    {
      type: "human-date";
    }
  >,
  "title" | "type"
> & {
  item: T;
};

const HumanDate = <T,>({ path, item }: Props<T>) => {
  const date = _.get(item, path);
  const result = formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: es,
  });
  return (
    <Table.Cell flex={colSizes["images"]} border="none" overflow="hidden">
      <Text truncate>{result}</Text>
    </Table.Cell>
  );
};

export { HumanDate };
