import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { StatsHistoryResponse } from '../types';
import { getStatsHistory } from '../../utils';
import * as S from './styles';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
type LineChartInstance = ChartJS<'line', number[], string>;
const ChartSection: React.FC = () => {
  const [statsHistory, setStatsHistory] = useState<StatsHistoryResponse | null>(
    null
  );

  // We'll store references to gradient fills
  const [likesGradient, setLikesGradient] = useState<CanvasGradient | string>(
    ''
  );
  const [followersGradient, setFollowersGradient] = useState<
    CanvasGradient | string
  >('');

  const chartRef = useRef<LineChartInstance>(null);

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
    if (chartRef.current) {
      const chartInstance = chartRef.current;
      const ctx = chartInstance.ctx;
      if (ctx) {
        const gradLikes = ctx.createLinearGradient(0, 0, 0, 400);
        gradLikes.addColorStop(0, 'rgba(112,239,222,0.5)');
        gradLikes.addColorStop(1, 'rgba(112,239,222,0)');
        setLikesGradient(gradLikes);
      }
    }
  }, [statsHistory]);

  if (!statsHistory) {
    return <S.ChartWrapper>Loading chart...</S.ChartWrapper>;
  }

  const historyPoints = statsHistory.data.historyPoints || [];
  // X-axis labels
  const labels = historyPoints.map((hp) => hp.createdAt);

  // Example daily likes/followers from likesCount/followersCount
  const dailyLikes = historyPoints.map((hp) => hp.likesCount);
  const dailyFollowers = historyPoints.map((hp) => hp.followersCount);

  // Convert date strings like '2024-12-29' to something like '29 DEC'
  function formatDateLabel(isoDateStr: string) {
    const date = new Date(isoDateStr);
    const day = date.getDate();
    const monthShort = date
      .toLocaleString('en-US', { month: 'short' })
      .toUpperCase();
    return `${day} ${monthShort}`;
  }

  // ChartJS data
  const data = {
    labels,
    datasets: [
      {
        label: 'Daily likes',
        data: dailyLikes,
        fill: true,
        backgroundColor: likesGradient,
        borderColor: '#70efde',
        borderWidth: 2,
        pointRadius: 0,
      },
      {
        label: 'Daily followers',
        data: dailyFollowers,
        fill: true,
        backgroundColor: followersGradient,
        borderColor: '#2ECC71',
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  // Chart options
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#ccc',
          callback: function (value, index) {
            // Convert label to "29 DEC"
            const label = labels[index];
            return formatDateLabel(label);
          },
        },
      },
      y: {
        grid: {
          color: '#222', // subtle horizontal lines
        },
        ticks: {
          color: '#ccc',
          // or you can do your own formatting, e.g. '35m'
          callback: function (val) {
            // example number formatting
            const v = Number(val);
            if (v >= 1_000_000) {
              return (v / 1_000_000).toFixed(1) + 'm';
            } else if (v >= 1000) {
              return (v / 1000).toFixed(1) + 'k';
            }
            return v;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#ccc', // text color
          usePointStyle: true,
          boxHeight: 8,
          boxWidth: 8,
          padding: 20,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#222',
        titleColor: '#fff',
        bodyColor: '#fff',
        cornerRadius: 4,
      },
    },
  };

  return (
    <S.ChartWrapper>
      <S.ChartHeader>
        <S.ChartTitle>Daily likes & Daily followers</S.ChartTitle>
        <S.Badge>TikTok data only</S.Badge>
      </S.ChartHeader>
      <S.ChartContainer>
        <Line ref={chartRef} data={data} options={options} />
      </S.ChartContainer>
    </S.ChartWrapper>
  );
};

export default ChartSection;
