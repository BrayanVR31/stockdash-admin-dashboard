import { ListChildComponentProps, FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import _ from "lodash";
import { HeadCol } from "@/types/table";
import Row from "./Row";
import { Box, Flex } from "@chakra-ui/react";

type RowListProps<T> = {
  onDeleteItem: (id: string) => void;
  data: T[];
  fields: HeadCol[];
};

const VirtualizedRow =
  <T extends Record<string, any>>({
    data,
    fields,
    onDeleteItem,
  }: RowListProps<T>) =>
  ({ index, style }: ListChildComponentProps) => {
    const id = _.get(data[index], "_id") as string;
    return (
      <Row
        style={style}
        onDeleteItem={() => onDeleteItem(id)}
        fields={fields}
        item={data[index]}
      />
    );
  };

const RowList = <T extends Record<string, any>>(props: RowListProps<T>) => {
  return (
    <Flex
      bg={{
        base: "white",
        _dark: "black",
      }}
      w="full"
      minH="md"
    >
      <Flex flex="1 1 auto" asChild>
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              itemSize={75}
              width={width}
              height={height}
              itemCount={props.data.length}
            >
              {VirtualizedRow(props)}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Flex>
    </Flex>
  );
};

export default RowList;
