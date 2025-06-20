import { cn } from "@/lib/utils";

interface ChartProps {
  data: number[];
  type: "bar" | "line" | "pie" | "gauge" | "area";
  title: string;
  className?: string;
  isPaused?: boolean;
}

export function Chart({ data, type, title, className, isPaused }: ChartProps) {
  const maxValue = Math.max(...data);
  const avgValue = data.reduce((sum, val) => sum + val, 0) / data.length;

  switch (type) {
    case "line":
      return (
        <div className={cn("h-32 relative", className)}>
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polyline
              fill="none"
              stroke={isPaused ? "rgb(156, 163, 175)" : "rgb(59, 130, 246)"}
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              points={data
                .map(
                  (value, i) =>
                    `${(i / (data.length - 1)) * 100},${100 - value}`,
                )
                .join(" ")}
            />
            {/* Data points */}
            {data.map((value, i) => (
              <circle
                key={i}
                cx={(i / (data.length - 1)) * 100}
                cy={100 - value}
                r="1"
                fill={isPaused ? "rgb(156, 163, 175)" : "rgb(59, 130, 246)"}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        </div>
      );

    case "pie":
      const segments = [
        {
          value: 45,
          color: isPaused ? "rgb(156, 163, 175)" : "rgb(59, 130, 246)",
          label: "Online",
        },
        {
          value: 30,
          color: isPaused ? "rgb(209, 213, 219)" : "rgb(16, 185, 129)",
          label: "Processando",
        },
        {
          value: 25,
          color: isPaused ? "rgb(243, 244, 246)" : "rgb(249, 115, 22)",
          label: "Offline",
        },
      ];
      let cumulativePercentage = 0;

      return (
        <div className={cn("h-32 flex items-center justify-center", className)}>
          <div className="flex items-center space-x-4">
            <svg className="w-20 h-20" viewBox="0 0 42 42">
              <circle
                cx="21"
                cy="21"
                r="15.915"
                fill="transparent"
                stroke="#e5e7eb"
                strokeWidth="3"
              />
              {segments.map((segment, i) => {
                const strokeDasharray = `${segment.value} ${100 - segment.value}`;
                const strokeDashoffset = -cumulativePercentage;
                cumulativePercentage += segment.value;
                return (
                  <circle
                    key={i}
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke={segment.color}
                    strokeWidth="3"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    transform="rotate(-90 21 21)"
                  />
                );
              })}
            </svg>
            <div className="space-y-1">
              {segments.map((segment, i) => (
                <div key={i} className="flex items-center space-x-2 text-xs">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: segment.color }}
                  />
                  <span>
                    {segment.label}: {segment.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "gauge":
      const gaugeValue = avgValue;
      const angle = (gaugeValue / 100) * 180 - 90;
      const needleColor = isPaused ? "rgb(156, 163, 175)" : "rgb(239, 68, 68)";
      const arcColor = isPaused ? "rgb(209, 213, 219)" : "rgb(59, 130, 246)";

      return (
        <div
          className={cn(
            "h-32 flex flex-col items-center justify-center",
            className,
          )}
        >
          <div className="relative w-24 h-12">
            <svg className="w-full h-full" viewBox="0 0 100 50">
              {/* Background arc */}
              <path
                d="M 10 40 A 30 30 0 0 1 90 40"
                fill="none"
                stroke="rgb(229, 231, 235)"
                strokeWidth="6"
              />
              {/* Progress arc */}
              <path
                d="M 10 40 A 30 30 0 0 1 90 40"
                fill="none"
                stroke={arcColor}
                strokeWidth="6"
                strokeDasharray={`${(gaugeValue / 100) * 125} 125`}
                strokeLinecap="round"
              />
              {/* Needle */}
              <line
                x1="50"
                y1="40"
                x2={50 + 25 * Math.cos((angle * Math.PI) / 180)}
                y2={40 + 25 * Math.sin((angle * Math.PI) / 180)}
                stroke={needleColor}
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Center dot */}
              <circle cx="50" cy="40" r="2" fill={needleColor} />
            </svg>
          </div>
          <div className="text-xs font-bold mt-1">{gaugeValue.toFixed(1)}%</div>
        </div>
      );

    case "area":
      const gradientId = `gradient-${title.replace(/\s+/g, "-").toLowerCase()}`;
      const areaColor = isPaused ? "rgb(156, 163, 175)" : "rgb(59, 130, 246)";

      return (
        <div className={cn("h-32 relative", className)}>
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={areaColor} stopOpacity="0.4" />
                <stop offset="100%" stopColor={areaColor} stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {/* Area fill */}
            <polygon
              fill={`url(#${gradientId})`}
              points={`0,100 ${data.map((value, i) => `${(i / (data.length - 1)) * 100},${100 - value}`).join(" ")} 100,100`}
            />
            {/* Line */}
            <polyline
              fill="none"
              stroke={areaColor}
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              points={data
                .map(
                  (value, i) =>
                    `${(i / (data.length - 1)) * 100},${100 - value}`,
                )
                .join(" ")}
            />
          </svg>
        </div>
      );

    default: // bar chart
      return (
        <div className={cn("h-32 relative", className)}>
          <div className="absolute inset-0 flex items-end justify-between">
            {data.map((value, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-t-sm transition-all duration-300",
                  "min-w-[2px] flex-1 mx-[1px]",
                  isPaused ? "bg-gray-400" : "bg-primary",
                )}
                style={{ height: `${value}%` }}
              />
            ))}
          </div>
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
