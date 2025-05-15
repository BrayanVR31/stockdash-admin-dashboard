import { Chart, useChart } from "@chakra-ui/charts";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useGroupProductsByCategory } from "@/hooks/useAnalytic";
import { Card } from "@chakra-ui/react";

const ProductGroupByCategories = () => {
  const { data } = useGroupProductsByCategory();
  const chart = useChart({
    data,
    series: [{ name: "allocation", color: "teal.solid" }],
  });

  return (
    <Card.Root variant="subtle">
      <Card.Body>
        <Card.Title mb="5">Productos agrupados por categoría</Card.Title>
        <Chart.Root maxH="xs" chart={chart}>
          <BarChart data={chart.data}>
            <CartesianGrid
              stroke={chart.color("border.muted")}
              vertical={false}
            />
            <XAxis
              axisLine={false}
              tickLine={false}
              dataKey={chart.key("type")}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            {chart.series.map((item) => (
              <Bar
                key={item.name}
                isAnimationActive={false}
                dataKey={chart.key(item.name)}
                fill={chart.color(item.color)}
              />
            ))}
          </BarChart>
        </Chart.Root>
      </Card.Body>
    </Card.Root>
  );
};

export default ProductGroupByCategories;
