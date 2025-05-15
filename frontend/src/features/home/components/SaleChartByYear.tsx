import { Chart, useChart } from "@chakra-ui/charts";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSaleChartByYear } from "@/hooks/useAnalytic";
import { Card } from "@chakra-ui/react";
import SaleYearSelect from "./SaleYearSelect";
import useSaleAnalyticStore from "@/store/saleAnalyticStore";

const SaleChartByYear = () => {
  const saleYear = useSaleAnalyticStore((state) => state.saleYear);
  const { data } = useSaleChartByYear(saleYear);
  const chart = useChart({
    data,
    series: [
      { name: "completed", color: "teal.solid" },
      { name: "pending", color: "purple.solid" },
      { name: "canceled", color: "blue.solid" },
    ],
  });

  return (
    <Card.Root variant="subtle">
      <Card.Header>
        <Card.Title mb="5">Resumen de ventas anuales</Card.Title>
        <SaleYearSelect />
      </Card.Header>
      <Card.Body>
        <Chart.Root maxH="sm" chart={chart}>
          <AreaChart data={chart.data}>
            <CartesianGrid
              stroke={chart.color("border")}
              vertical={false}
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey={chart.key("month")}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip
              cursor={false}
              animationDuration={100}
              content={<Chart.Tooltip />}
            />
            <Legend content={<Chart.Legend />} />

            {chart.series.map((item) => (
              <defs key={item.name}>
                <Chart.Gradient
                  id={`${item.name}-gradient`}
                  stops={[
                    { offset: "0%", color: item.color, opacity: 0.3 },
                    { offset: "100%", color: item.color, opacity: 0.05 },
                  ]}
                />
              </defs>
            ))}

            {chart.series.map((item) => (
              <Area
                key={item.name}
                type="natural"
                isAnimationActive={false}
                dataKey={chart.key(item.name)}
                fill={`url(#${item.name}-gradient)`}
                stroke={chart.color(item.color)}
                strokeWidth={2}
                stackId="a"
              />
            ))}
          </AreaChart>
        </Chart.Root>
      </Card.Body>
    </Card.Root>
  );
};

export default SaleChartByYear;
