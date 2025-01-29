import React, { useEffect, useRef, useState } from 'react';
import { Skeleton } from '@mui/material';
import { FaTiktok } from 'react-icons/fa';
import CalHeatmap from 'cal-heatmap';
import 'cal-heatmap/cal-heatmap.css'; // Import Cal-Heatmap styles
import { StatsHistoryResponse } from '../types';
import { getStatsHistory } from '../../utils';
import * as S from './styles';
const HeatmapSection: React.FC = () => {
  const [statsHistory, setStatsHistory] = useState<StatsHistoryResponse | null>(
    null
  );
  const calRef = useRef<CalHeatmap | null>(null);
  const [subDomainSize, setSubDomainSize] = useState({
    width: 20,
    height: 20,
  });
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setSubDomainSize({ width: 5, height: 5 });
      } else if (window.innerWidth < 900) {
        setSubDomainSize({ width: 8, height: 8 });
      } else {
        setSubDomainSize({ width: 15, height: 15 });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!statsHistory) return;

    if (!calRef.current) {
      calRef.current = new CalHeatmap();
    }

    const startDate = new Date('2024-02-01');
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // Move to next month
    endDate.setDate(0);
    const dayMap: Record<string, { date: Date; count: number }> = {};
    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const isoDate = new Date(d).toISOString().split('T')[0];
      dayMap[isoDate] = {
        date: new Date(d),
        count: 0,
      };
    }

    const historyPoints = statsHistory.data.historyPoints || [];
    historyPoints.forEach((hp) => {
      const isoDate = new Date(hp.createdAt).toISOString().split('T')[0];
      if (dayMap[isoDate]) {
        dayMap[isoDate].count = hp.postsCount;
      }
    });

    const heatmapData = Object.values(dayMap).map(({ date, count }) => ({
      date: date.getTime(),
      count,
    }));

    calRef.current.paint({
      itemSelector: '#cal-heatmap-wrapper',
      date: {
        start: new Date('2024-03-01'),
      },
      domain: {
        type: 'month',
        label: {
          position: 'top',
          text: (timestamp: number) => {
            const date = new Date(timestamp);
            return date
              .toLocaleString('en-US', { month: 'short' })
              .replace('.', '');
          },
        },
      },
      subDomain: {
        type: 'day',
        radius: 2,
        width: subDomainSize.width,
        height: subDomainSize.height,
      },
      data: {
        source: heatmapData,
        type: 'json',
        x: 'date',
        y: 'count',
        groupY: 'sum',
      },
      scale: {
        color: {
          type: 'threshold',
          domain: [1, 2, 3, 4], // breakpoints
          range: ['#2e2c32', '#9BE9A8', '#40C463', '#30A14E', '#216E39'],
        },
      },
    });
  }, [statsHistory, subDomainSize]);

  let lastPostedDate: string | null = null;
  if (statsHistory) {
    statsHistory.data.historyPoints.forEach((hp) => {
      if (hp.postsCount > 0) {
        if (!lastPostedDate || hp.createdAt > lastPostedDate) {
          lastPostedDate = hp.createdAt;
        }
      }
    });
  }

  function formatLastPosted(isoStr: string) {
    const date = new Date(isoStr);
    const day = date.getDate();
    const monthShort = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
    const suffix = (() => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    })();
    return `${day}${suffix} ${monthShort} ’${year}`;
  }

  if (!statsHistory) {
    return (
      <S.HeatmapWrapper>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={50}
          sx={{ backgroundColor: '#1c1a1a', opacity: 0.5 }}
        />
      </S.HeatmapWrapper>
    );
  }

  return (
    <S.HeatmapWrapper>
      <S.HeaderRow>
        <S.TitleRow>
          <S.PostHistory>Posting history</S.PostHistory>
          {lastPostedDate && (
            <span>Last posted: {formatLastPosted(lastPostedDate)}</span>
          )}
        </S.TitleRow>
        <S.Badge>
          <FaTiktok size={18} />
          <span>TikTok data only</span>
        </S.Badge>
      </S.HeaderRow>

      <S.CalendarContainer>
        <S.LegendContainer id="cal-heatmap-wrapper" />
      </S.CalendarContainer>
    </S.HeatmapWrapper>
  );
};

export default HeatmapSection;
