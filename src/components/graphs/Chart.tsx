import { cn } from "@/lib/utils";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";

interface ChartProps {
  data: number[] | Array<Record<string, any>>;
  type: "bar" | "line" | "pie" | "gauge" | "area";
  title: string;
  className?: string;
  isPaused?: boolean;
  dataKey?: string;
  nameKey?: string;
  height?: number;
}

export function Chart({
  data,
  type,
  title,
  className,
  isPaused,
  dataKey = "value",
  nameKey = "name",
  height = 200,
}: ChartProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Converter dados numéricos para formato compatível com Recharts
  const formattedData =
    Array.isArray(data) && typeof data[0] === "number"
      ? data.map((value, index) => ({
          [nameKey]: `Ponto ${index + 1}`,
          [dataKey]: value,
        }))
      : data;

  const colors = {
    active: isPaused ? "rgb(156, 163, 175)" : "rgb(59, 130, 246)",
    secondary: isPaused ? "rgb(209, 213, 219)" : "rgb(16, 185, 129)",
    tertiary: isPaused ? "rgb(243, 244, 246)" : "rgb(249, 115, 22)",
    background: "rgba(59, 130, 246, 0.1)",
  };

  const config = {
    primary: {
      theme: {
        light: colors.active,
        dark: colors.active,
      },
    },
    secondary: {
      theme: {
        light: colors.secondary,
        dark: colors.secondary,
      },
    },
    tertiary: {
      theme: {
        light: colors.tertiary,
        dark: colors.tertiary,
      },
    },
  };

  switch (type) {
    case "line":
      return (
        <div className={cn("w-full", className)}>
          <ChartContainer config={config} className="h-full">
            <ResponsiveContainer width="100%" height={height}>
              <LineChart data={formattedData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                <XAxis dataKey={nameKey} tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <ChartTooltip
                  content={({ active, payload }) => (
                    <ChartTooltipContent
                      active={active}
                      payload={payload}
                      labelKey={nameKey}
                    />
                  )}
                />
                <Line
                  type="monotone"
                  dataKey={dataKey}
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                  animationDuration={300}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      );

    case "pie":
      return (
        <div className={cn("w-full", className)}>
          <ChartContainer config={config} className="h-full">
            <ResponsiveContainer width="100%" height={height}>
              <PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <Pie
                  data={formattedData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={80}
                  paddingAngle={1}
                  dataKey={dataKey}
                  nameKey={nameKey}
                  animationDuration={300}
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                >
                  {formattedData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? colors.active
                          : index === 1
                          ? colors.secondary
                          : colors.tertiary
                      }
                      stroke="var(--background)"
                      strokeWidth={1}
                      opacity={activeIndex === index ? 1 : 0.8}
                    />
                  ))}
                </Pie>
                <ChartTooltip
                  content={({ active, payload }) => (
                    <ChartTooltipContent
                      active={active}
                      payload={payload}
                      labelKey={nameKey}
                    />
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      );

    case "area":
      return (
        <div className={cn("w-full", className)}>
          <ChartContainer config={config} className="h-full">
            <ResponsiveContainer width="100%" height={height}>
              <AreaChart data={formattedData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                <XAxis dataKey={nameKey} tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <ChartTooltip
                  content={({ active, payload }) => (
                    <ChartTooltipContent
                      active={active}
                      payload={payload}
                      labelKey={nameKey}
                    />
                  )}
                />
                <Area
                  type="monotone"
                  dataKey={dataKey}
                  stroke="var(--color-primary)"
                  fill="var(--color-primary)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                  animationDuration={300}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      );

    case "gauge":
      // Para o gauge, vamos criar um semi-círculo usando o PieChart
      const gaugeValue = Array.isArray(data) && typeof data[0] === "number" ? data[0] : 0;
      const gaugeData = [
        { name: "Value", value: gaugeValue },
        { name: "Remaining", value: 100 - gaugeValue },
      ];

      return (
        <div className={cn("w-full", className)}>
          <ChartContainer config={config} className="h-full">
            <ResponsiveContainer width="100%" height={height}>
              <PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <Pie
                  data={gaugeData}
                  cx="50%"
                  cy="80%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                  animationDuration={300}
                >
                  <Cell key="cell-0" fill={colors.active} />
                  <Cell key="cell-1" fill="var(--muted)" />
                </Pie>
                <text
                  x="50%"
                  y="85%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fill: "var(--foreground)", fontSize: "16px", fontWeight: "bold" }}
                >
                  {gaugeValue}%
                </text>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      );

    default: // bar chart
      return (
        <div className={cn("w-full", className)}>
          <ChartContainer config={config} className="h-full">
            <ResponsiveContainer width="100%" height={height}>
              <BarChart data={formattedData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                <XAxis dataKey={nameKey} tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <ChartTooltip
                  content={({ active, payload }) => (
                    <ChartTooltipContent
                      active={active}
                      payload={payload}
                      labelKey={nameKey}
                    />
                  )}
                />
                <Bar
                  dataKey={dataKey}
                  fill="var(--color-primary)"
                  radius={[4, 4, 0, 0]}
                  animationDuration={300}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      );
  }
}

export function getChartTypeInfo(type: string) {
  const chartTypes = {
    bar: { icon: "📊", name: "Barras" },
    line: { icon: "📈", name: "Linha" },
    pie: { icon: "🥧", name: "Pizza" },
    gauge: { icon: "⏱️", name: "Velocímetro" },
    area: { icon: "📊", name: "Área" },
  };

  return chartTypes[type as keyof typeof chartTypes] || chartTypes.bar;
}
