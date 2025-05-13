import { Chart, useChart } from "@chakra-ui/charts";
import { Box, Card, Flex, FormatNumber, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuDownload } from "react-icons/lu";
import { Area, AreaChart, Tooltip } from "recharts";
import type { CategoricalChartState } from "recharts/types/chart/types";
import { useWeeklySales } from "@/hooks/useAnalytic";

const WeeklySales = () => {
  const { data } = useWeeklySales();
  const chart = useChart({
    data,
    series: [{ name: "value", color: "teal.solid" }],
  });
  const lastIndex = chart.data.length - 1;
  const lastValue = chart.data[lastIndex].value;
  const [value, setValue] = useState(lastValue);

  const onMouseMove = (state: CategoricalChartState) => {
    const index = state.activeTooltipIndex ?? lastIndex;
    const { value = lastValue } = chart.data[index];
    setValue(value);
  };

  const onMouseLeave = () => {
    setValue(lastValue);
  };

  return (
    <Card.Root maxW="sm" size="sm" variant="subtle">
      <Card.Body alignItems="flex-end" flexDir="row">
        <Box flex="1" fontWeight="medium">
          <HStack textStyle="sm" color="fg.muted">
            <LuDownload /> Ventas semanales
          </HStack>
          <Text textStyle="xl" mt="2">
            <FormatNumber value={value} />
          </Text>
        </Box>
        <Chart.Root width="full" height="12" flex="1" chart={chart}>
          <AreaChart
            data={chart.data}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            <Tooltip
              cursor={{ stroke: chart.color("teal.solid"), strokeWidth: 2 }}
              content={() => null}
            />
            {chart.series.map((item) => (
              <Area
                activeDot={{ stroke: chart.color("bg") }}
                key={item.name}
                isAnimationActive={false}
                dataKey={chart.key(item.name)}
                fill={chart.color(item.color)}
                fillOpacity={0.2}
                stroke={chart.color(item.color)}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        </Chart.Root>
      </Card.Body>
    </Card.Root>
  );
};

export default WeeklySales;
