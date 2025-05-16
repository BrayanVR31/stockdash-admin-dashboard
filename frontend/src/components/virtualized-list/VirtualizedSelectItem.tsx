import _ from "lodash";
import { ListChildComponentProps } from "react-window";
import { Select } from "@chakra-ui/react";

const VirtualizedSelectItem =
  <T extends unknown[]>(data: T, field: string) =>
  ({ index, style }: ListChildComponentProps) => {
    const name = _.get(data[index], field, "");
    return (
      <Select.Item truncate style={style} item={data[index]}>
        {name}
        <Select.ItemIndicator />
      </Select.Item>
    );
  };

export { VirtualizedSelectItem };
