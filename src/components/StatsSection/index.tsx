import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import { FaTiktok } from 'react-icons/fa';
import { BaseDataResponse } from '../types';
import { getBaseData } from '../../utils';
import PlatformStatsRow from './PlatformStatsRow';
import * as S from './styles';
const TABS = [
  { href: '#account-info', label: 'Account info' },
  { href: '#media', label: 'Media' },
  { href: '#past-briefs', label: 'Past briefs' },
  { href: '#audience-personas', label: 'Audience personas' },
  { href: '#lookalikes', label: 'Lookalikes' },
];

const StatsSection: React.FC = () => {
  const [baseData, setBaseData] = useState<BaseDataResponse | null>(null);
  const [activeTab, setActiveTab] = useState<string>('#account-info');
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
    return (
      <S.StatsSectionWrapper>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={50}
          sx={{ backgroundColor: '#1c1a1a', opacity: 0.5 }}
        />
      </S.StatsSectionWrapper>
    );
  }

  const tiktok = baseData.data.tiktok;
  const instagram = baseData.data.instagram;

  console.log('instagram:', instagram);
  return (
    <S.StatsSectionWrapper>
      <S.TabsRow>
        {TABS.map(({ href, label }) => (
          <S.TabLink
            key={href}
            href={href}
            active={activeTab === href}
            onClick={() => setActiveTab(href)}
          >
            {label}
          </S.TabLink>
        ))}
      </S.TabsRow>

      <S.ProfileBioContainer>
        <S.ProfileBioTitle>Profile bio</S.ProfileBioTitle>
        <S.ProfileBioContent>
          <S.HandleBadge>
            <FaTiktok size={18} />
            <span>{tiktok.handle ? '@' + tiktok.handle : '@unknown'}</span>
          </S.HandleBadge>
          <S.BioText>{tiktok.bio || ''}</S.BioText>
        </S.ProfileBioContent>
      </S.ProfileBioContainer>

      <S.StatsContainer>
        <PlatformStatsRow
          icon={<FaTiktok />}
          followers={tiktok.followersCount ?? 0}
          medianViews={tiktok.medianViews ?? '-'}
          sponsoredMedianViews={tiktok.sponsoredMedianViews ?? '0'}
          totalLikes={tiktok.likesCount ?? '0'}
          engagementRate={tiktok.engagementRate ?? 0}
          totalPosts={tiktok.postsCount ?? 0}
          trends={{
            followers: '107% in 30 days',
            likes: '78.5% in 30 days',
            posts: '28 in 30 days',
          }}
        />

        <PlatformStatsRow
          icon={<InstagramIcon sx={{ fontSize: 40 }} />}
          followers={instagram.followersCount ?? 0}
          medianViews={instagram.medianViews ?? ''}
          sponsoredMedianViews={instagram.sponsoredMedianViews ?? '0'}
          totalLikes={instagram.likesCount ?? '0'}
          engagementRate={instagram.engagementRate ?? 0}
          totalPosts={instagram.postsCount ?? 0}
        />
      </S.StatsContainer>
    </S.StatsSectionWrapper>
  );
};

export default StatsSection;
