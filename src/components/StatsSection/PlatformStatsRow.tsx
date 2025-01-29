import * as S from './styles';
import { PlatformStatsRowProps } from '../types';
const formatNumber = (num: number): string => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + 'b';
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'm';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};
const PlatformStatsRow: React.FC<PlatformStatsRowProps> = ({
  icon,
  followers,
  medianViews,
  sponsoredMedianViews,
  totalLikes,
  engagementRate,
  totalPosts,
  trends = {},
}) => {
  return (
    <S.StatsRow>
      <S.PlatformIcon>{icon}</S.PlatformIcon>
      <S.StatsGroup>
        <S.StatBox>
          <span>Followers</span>
          <S.StatsNumber>{formatNumber(followers)}</S.StatsNumber>
          {trends.followers ? (
            <S.Trend>
              <S.Symbol>↑&nbsp;</S.Symbol>
              {trends.followers}
            </S.Trend>
          ) : (
            <S.Trend>&nbsp;</S.Trend>
          )}
        </S.StatBox>

        <S.StatBox>
          <span>Average views</span>
          <S.StatsNumber>
            {medianViews ? formatNumber(medianViews) : '—'}
          </S.StatsNumber>
          <S.Trend>&nbsp;</S.Trend>
        </S.StatBox>

        <S.StatBox>
          <span>Potential sponsored views</span>
          <S.StatsNumber>
            {sponsoredMedianViews ? formatNumber(sponsoredMedianViews) : '0'}
          </S.StatsNumber>
          <S.Trend>&nbsp;</S.Trend>
        </S.StatBox>

        <S.StatBox>
          <span>Total likes</span>
          <S.StatsNumber>
            {totalLikes ? formatNumber(totalLikes) : '0'}
          </S.StatsNumber>
          {trends.likes ? (
            <S.Trend>
              <S.Symbol>↑&nbsp;</S.Symbol>
              {trends.likes}
            </S.Trend>
          ) : (
            <S.Trend>&nbsp;</S.Trend>
          )}
        </S.StatBox>

        <S.StatBox>
          <span>Engagement rate</span>
          <S.StatsNumber>
            {engagementRate ? (engagementRate / 100).toFixed(3) + '%' : '—'}
          </S.StatsNumber>
          <S.Trend>&nbsp;</S.Trend>
        </S.StatBox>

        <S.StatBox>
          <span>Total posts</span>
          <S.StatsNumber>
            {totalPosts ? formatNumber(totalPosts) : '0'}
          </S.StatsNumber>
          {trends.posts ? (
            <S.Trend>
              <S.Symbol>↑&nbsp;</S.Symbol>
              {trends.posts}
            </S.Trend>
          ) : (
            <S.Trend>&nbsp;</S.Trend>
          )}
        </S.StatBox>
      </S.StatsGroup>
    </S.StatsRow>
  );
};
export default PlatformStatsRow;
