import { useTable } from "@/components/table";
import { Text, Badge } from "@chakra-ui/react";

const HeadingList = () => {
  const { totalItems } = useTable();
  return (
    <Text
      color={{
        base: "gray.700",
        _dark: "gray.200",
      }}
      fontWeight="semibold"
      fontSize="md"
    >
      Todas las compras
      <Badge ml="1" variant="surface" colorPalette="blue">
        {totalItems}
      </Badge>
    </Text>
  );
};

export { HeadingList };
