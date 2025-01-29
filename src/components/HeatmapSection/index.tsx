import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { StatsHistoryResponse } from '../types';
import { getStatsHistory } from '../../utils';
import * as S from './styles';
const HeatmapSection: React.FC = () => {
  const [statsHistory, setStatsHistory] = useState<StatsHistoryResponse | null>(
    null
  );

  useEffect(() => {
    (async () => {
      try {
        const data = await getStatsHistory();
        setStatsHistory(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!statsHistory) {
    return <S.HeatmapWrapper>Loading heatmap...</S.HeatmapWrapper>;
  }

  const historyPoints = statsHistory.data.historyPoints || [];
  const heatmapData = historyPoints.map((hp) => ({
    date: hp.createdAt,
    count: hp.postsCount,
  }));

  // Suppose you want to display the entire year of 2024 plus Jan 2025
  // You can adjust these to min/max from your data, or a fixed range
  const startDate = new Date('2024-03-01');
  const endDate = new Date('2025-01-31');

  // Example: find the last posted date for display
  // We'll pick the max "createdAt" that has postsCount > 0
  let lastPostedDate: string | null = null;
  historyPoints.forEach((hp) => {
    if (hp.postsCount > 0) {
      if (!lastPostedDate || hp.createdAt > lastPostedDate) {
        lastPostedDate = hp.createdAt;
      }
    }
  });
  // Format it as "2nd Oct ‘24" or similar
  // A quick utility to do day/month/year with suffix
  function formatLastPosted(isoStr: string) {
    const date = new Date(isoStr);
    const day = date.getDate();
    const monthShort = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2); // '24' for 2024
    // Simple ordinal suffix for day
    const suffix = (function (d) {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    })(day);
    return `${day}${suffix} ${monthShort} ’${year}`;
  }
  return (
    <S.HeatmapWrapper>
      {/* Header row with title, last posted date, and TikTok badge */}
      <S.HeaderRow>
        <S.TitleRow>
          <h3>Posting history</h3>
          {lastPostedDate && (
            <span>Last posted: {formatLastPosted(lastPostedDate)}</span>
          )}
        </S.TitleRow>
        <S.Badge>TikTok data only</S.Badge>
      </S.HeaderRow>

      <S.CalendarContainer>
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={heatmapData}
          showMonthLabels
          showWeekdayLabels
          weekdayLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
          classForValue={(value) => {
            if (!value || value.count === 0) {
              return 'color-empty';
            }
            return 'color-filled';
          }}
        />
      </S.CalendarContainer>
    </S.HeatmapWrapper>
  );
};

export default HeatmapSection;
