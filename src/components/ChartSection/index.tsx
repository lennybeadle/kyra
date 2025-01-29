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
import { Skeleton } from '@mui/material';
import { FaTiktok } from 'react-icons/fa';
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

        const gradFollowers = ctx.createLinearGradient(0, 0, 0, 400);
        gradFollowers.addColorStop(0, 'rgba(46, 204, 113, 0.5)');
        gradFollowers.addColorStop(1, 'rgba(46, 204, 113, 0)');
        setFollowersGradient(gradFollowers);
      }
    }
  }, [statsHistory]);

  if (!statsHistory) {
    return (
      <S.ChartWrapper>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={50}
          sx={{ backgroundColor: '#1c1a1a', opacity: 0.5 }}
        />
      </S.ChartWrapper>
    );
  }

  const historyPoints = statsHistory.data.historyPoints || [];
  const labels = historyPoints.map((hp) => hp.createdAt);
  const dailyLikes = historyPoints.map((hp) => hp.likesCount);
  const dailyFollowers = historyPoints.map((hp) => hp.followersCount);

  function formatDateLabel(isoDateStr: string) {
    const date = new Date(isoDateStr);
    const day = date.getDate();
    const monthShort = date
      .toLocaleString('en-US', { month: 'short' })
      .toUpperCase();
    return `${day} ${monthShort}`;
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Daily likes',
        data: dailyLikes,
        fill: true,
        backgroundColor: likesGradient,
        borderColor: '#2ECC71',
        borderWidth: 2,
        pointRadius: 0,
      },
      {
        label: 'Daily followers',
        data: dailyFollowers,
        fill: true,
        backgroundColor: followersGradient,
        borderColor: '#70efde',
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#ccc',
          maxRotation: 90,
          minRotation: 90,
          callback: function (value, index) {
            const label = labels[index];
            return formatDateLabel(label);
          },
        },
      },
      y: {
        min: -5000000,
        max: 35000000,
        grid: {
          display: false,
        },
        ticks: {
          color: '#ccc',
          callback: function (val) {
            const v = Number(val);
            if (v >= 1000000 || v <= -1000000) {
              return (v / 1000000).toFixed(0) + 'm';
            } else if (Math.abs(v) >= 1000) {
              return (v / 1000).toFixed(0) + 'k';
            }
            return v;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,

        labels: {
          color: '#ccc',
          usePointStyle: true,
          boxHeight: 10,
          boxWidth: 10,
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
        <S.CharTextGroup>
          <S.ChartTitle>
            <span
              className="color-box"
              style={{ backgroundColor: '#2ECC71' }}
            ></span>
            Daily Likes
          </S.ChartTitle>
          <S.ChartTitle>
            <span
              className="color-box"
              style={{ backgroundColor: '#70efde' }}
            ></span>
            Daily Followers
          </S.ChartTitle>
        </S.CharTextGroup>

        <S.Badge>
          <FaTiktok size={18} />
          <span>TikTok data only</span>
        </S.Badge>
      </S.ChartHeader>
      <S.ChartContainer>
        <Line ref={chartRef} data={data} options={options} />
      </S.ChartContainer>
    </S.ChartWrapper>
  );
};

export default ChartSection;
