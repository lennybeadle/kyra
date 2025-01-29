import React, { useEffect, useState } from 'react';
import { BaseDataResponse } from '../types';
import { getBaseData } from '../../utils';
import * as S from './styles';
const StatsSection: React.FC = () => {
  const [baseData, setBaseData] = useState<BaseDataResponse | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getBaseData();
        setBaseData(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!baseData) {
    return <S.StatsSectionWrapper>Loading stats...</S.StatsSectionWrapper>;
  }

  const tiktok = baseData.data.tiktok;
  const instagram = baseData.data.instagram;

  // Helper for formatting big numbers. Adjust as needed for your design.
  const formatNumber = (num: number) => {
    // Example: 157000000 => "157m"
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1) + 'b';
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + 'm';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <S.StatsSectionWrapper>
      {/* Tabs row */}
      <S.TabsRow>
        <S.TabLink href="#account-info" active>
          Account info
        </S.TabLink>
        <S.TabLink href="#media">Media</S.TabLink>
        <S.TabLink href="#past-briefs">Past briefs</S.TabLink>
        <S.TabLink href="#audience-personas">Audience personas</S.TabLink>
        <S.TabLink href="#lookalikes">Lookalikes</S.TabLink>
      </S.TabsRow>

      {/* Profile bio box */}
      <S.ProfileBioContainer>
        <S.ProfileBioTitle>Profile bio</S.ProfileBioTitle>
        <div>
          <S.HandleBadge>
            {tiktok.handle ? '@' + tiktok.handle : '@unknown'}
          </S.HandleBadge>
          <S.BioText>{tiktok.bio || ''}</S.BioText>
        </div>
      </S.ProfileBioContainer>

      {/* Stats box */}
      <S.StatsContainer>
        {/* TikTok row */}
        <S.StatsRow>
          <S.PlatformIcon>🎶</S.PlatformIcon> {/* placeholder, use real icon */}
          <S.StatsGroup>
            <S.StatBox>
              <span>Followers</span>
              <S.StatsNumber>
                {formatNumber(tiktok.followersCount)}
              </S.StatsNumber>
              <S.Trend>
                <S.Symbol>↑&nbsp;</S.Symbol> 107% in 30 days
              </S.Trend>
            </S.StatBox>
            <S.StatBox>
              <span>Average views</span>
              <S.StatsNumber>
                {tiktok.medianViews ? formatNumber(tiktok.medianViews) : '—'}
              </S.StatsNumber>
              <S.Trend>&nbsp;</S.Trend>
            </S.StatBox>
            <S.StatBox>
              <span>Potential sponsored views</span>
              <S.StatsNumber>
                {tiktok.sponsoredMedianViews
                  ? formatNumber(tiktok.sponsoredMedianViews)
                  : '0'}
              </S.StatsNumber>
              <S.Trend>&nbsp;</S.Trend>
            </S.StatBox>
            <S.StatBox>
              <span>Total likes</span>
              <S.StatsNumber>{formatNumber(tiktok.likesCount)}</S.StatsNumber>
              <S.Trend>
                <S.Symbol>↑&nbsp;</S.Symbol> 78.5% in 30 days
              </S.Trend>
            </S.StatBox>
            <S.StatBox>
              <span>Engagement rate</span>
              <S.StatsNumber>
                {tiktok.engagementRate
                  ? (tiktok.engagementRate / 100).toFixed(3) + '%'
                  : '—'}
              </S.StatsNumber>
              <S.Trend>&nbsp;</S.Trend>
            </S.StatBox>
            <S.StatBox>
              <span>Total posts</span>
              <S.StatsNumber>{formatNumber(tiktok.postsCount)}</S.StatsNumber>
              <S.Trend>
                <S.Symbol>↑&nbsp;</S.Symbol> 28 in 30 days
              </S.Trend>
            </S.StatBox>
          </S.StatsGroup>
        </S.StatsRow>

        {/* Instagram row */}
        <S.StatsRow>
          <S.PlatformIcon>📷</S.PlatformIcon> {/* placeholder, use real icon */}
          <S.StatsGroup>
            <S.StatBox>
              <span>Followers</span>
              <S.StatsNumber>{formatNumber(42800000)}</S.StatsNumber>
            </S.StatBox>
            <S.StatBox>
              <span>Average views</span>
              <S.StatsNumber>—</S.StatsNumber>
            </S.StatBox>
            <S.StatBox>
              <span>Potential sponsored views</span>
              <S.StatsNumber>0</S.StatsNumber>
            </S.StatBox>
            <S.StatBox>
              <span>Total likes</span>
              <S.StatsNumber>0</S.StatsNumber>
            </S.StatBox>
            <S.StatBox>
              <span>Engagement rate</span>
              <S.StatsNumber>328.8k%</S.StatsNumber>
            </S.StatBox>
            <S.StatBox>
              <span>Total posts</span>
              <S.StatsNumber>0</S.StatsNumber>
            </S.StatBox>
          </S.StatsGroup>
        </S.StatsRow>
      </S.StatsContainer>
    </S.StatsSectionWrapper>
  );
};

export default StatsSection;
