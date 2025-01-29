declare module 'react-calendar-heatmap' {
  import * as React from 'react';

  // Adjust these props as needed for your use-case:
  export interface HeatmapValue {
    date: string;
    count: number;
  }

  export interface ReactCalendarHeatmapProps {
    startDate: Date;
    endDate: Date;
    values: HeatmapValue[];
    showMonthLabels: Boolean;
    showWeekdayLabels: Boolean;
    weekdayLabels: {};
    classForValue?: (value: HeatmapValue | null) => string;
    tooltipDataAttrs?: (value: HeatmapValue | null) => object;
    onClick?: (value: HeatmapValue | null) => void;
    // You can declare all other props you need
  }

  const ReactCalendarHeatmap: React.FC<ReactCalendarHeatmapProps>;
  export default ReactCalendarHeatmap;
}
