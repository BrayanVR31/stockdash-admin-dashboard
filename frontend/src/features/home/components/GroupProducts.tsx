import { Chart, useChart } from "@chakra-ui/charts";
import { Cell, Pie, PieChart } from "recharts";
import { useGroupedProductsByCategory } from "@/hooks/useAnalytic";
import { Card } from "@chakra-ui/react";

const GroupProducts = () => {
  const { data } = useGroupedProductsByCategory();
  const chart = useChart({
    data,
  });

  return (
    <Card.Root>
      <Chart.Root boxSize="200px" mx="auto" chart={chart}>
        <PieChart>
          <Pie
            isAnimationActive={false}
            data={chart.data}
            dataKey={chart.key("value")}
            outerRadius={100}
            innerRadius={0}
            labelLine={false}
            label={({ name, index }) => {
              const { value } = chart.data[index ?? -1];
              const percent = value / chart.getTotal("value");
              return `${name}: ${(percent * 100).toFixed(1)}%`;
            }}
          >
            {chart.data.map((item) => {
              return <Cell key={item.name} fill={chart.color(item.color)} />;
            })}
          </Pie>
        </PieChart>
      </Chart.Root>
    </Card.Root>
  );
};

export default GroupProducts;
