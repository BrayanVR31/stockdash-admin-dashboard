import { Chart, useChart } from "@chakra-ui/charts";
import { Card } from "@chakra-ui/react";
import { Cell, Label, Pie, PieChart, Tooltip } from "recharts";
import { useAnnualPurchasePrice } from "@/hooks/useAnalytic";
import { useMemo } from "react";

const colors = ["blue.solid", "orange.solid", "pink.solid", "green.solid"];

const PurchasePriceDonut = () => {
  const { data } = useAnnualPurchasePrice();
  const results = useMemo(() => {
    return data.history.map((history) => ({
      name: history.purchaseYear,
      value: history.totalPriceByYear,
      color: colors[Math.ceil(Math.random() * colors.length - 1)],
    }));
  }, [data.history]);
  const chart = useChart({
    data: results,
  });

  return (
    <Card.Root variant="subtle" flex="1">
      <Card.Body>
        <Card.Title textAlign="center" mb="5">
          Compras anuales
        </Card.Title>
        <Chart.Root boxSize="200px" chart={chart} mx="auto">
          <PieChart>
            <Tooltip
              cursor={false}
              animationDuration={100}
              content={<Chart.Tooltip hideLabel />}
            />
            <Pie
              innerRadius={80}
              outerRadius={100}
              isAnimationActive={false}
              data={chart.data}
              dataKey={chart.key("value")}
              nameKey="name"
            >
              <Label
                content={({ viewBox }) => (
                  <Chart.RadialText
                    viewBox={viewBox}
                    title={"$" + data.allPurchasePrice.toLocaleString()}
                    description="pesos"
                  />
                )}
              />
              {chart.data.map((item) => (
                <Cell key={item.color} fill={chart.color(item.color)} />
              ))}
            </Pie>
          </PieChart>
        </Chart.Root>
      </Card.Body>
    </Card.Root>
  );
};

export default PurchasePriceDonut;
