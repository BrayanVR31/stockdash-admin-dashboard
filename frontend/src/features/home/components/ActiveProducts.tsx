import { Card, Stat } from "@chakra-ui/react";
import { LuGlobe } from "react-icons/lu";
import SparkLine from "./SparkLine";
import { useWeeklyStatusProducts } from "@/hooks/useAnalytic";

const ActiveProducts = () => {
  const { data } = useWeeklyStatusProducts();
  const sparkData = data.active.productsByWeek.map((item) => ({
    value: item.value,
  }));
  return (
    <Card.Root variant="subtle" maxW="sm" size="sm" overflow="hidden">
      <Card.Body>
        <Stat.Root>
          <Stat.Label>
            <LuGlobe /> Productos activos
          </Stat.Label>
          <Stat.ValueText>{data.active.count}</Stat.ValueText>
        </Stat.Root>
      </Card.Body>
      <SparkLine data={sparkData} />
    </Card.Root>
  );
};

export default ActiveProducts;
