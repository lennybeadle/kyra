import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TranslateIcon from '@mui/icons-material/Translate';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { FaTiktok } from 'react-icons/fa';
import { BaseDataResponse } from '../types';
import { getBaseData } from '../../utils';
import * as S from './styles';
const TopSection: React.FC = () => {
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
    return (
      <S.TopSectionWrapper>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={50}
          sx={{ backgroundColor: '#1c1a1a', opacity: 0.5 }}
        />
      </S.TopSectionWrapper>
    );
  }

  const { tiktok } = baseData.data;
  const name = tiktok.nickname || tiktok.handle;
  const region = tiktok.region || 'United States';
  const language = tiktok.language === 'en' ? 'English' : tiktok.language;
  const profilePic = tiktok.profilePicture;
  const predictedFee = baseData.predictedFee;
  const predictedCpv = baseData.predictedCpv;
  const tiktokHandle = `@${tiktok.handle}`;
  const igHandle = baseData.data.instagram.handle
    ? `@${baseData.data.instagram.handle}`
    : null;
  const youtubeChannel = baseData.data.youtube.channelId ? 'YouTube' : null;
  return (
    <S.TopSectionWrapper>
      <S.ProfileImage
        src={profilePic || 'https://via.placeholder.com/130'}
        alt={name}
      />

      <S.NameRow>
        <S.NameText>{name.toLowerCase()}</S.NameText>
        <S.IconRow>
          <BookmarkIcon sx={{ color: '#C6F12E' }} />
          <ShareIcon sx={{ color: '#C6F12E' }} />
        </S.IconRow>
      </S.NameRow>

      <S.MetaRow>
        <S.SubTitle>
          <LocationOnIcon sx={{ color: '#fff' }} />
          <span>{region}</span>
        </S.SubTitle>
        <S.SubTitle>
          <TranslateIcon sx={{ color: '#fff' }} />
          <span>{language}</span>
        </S.SubTitle>
      </S.MetaRow>

      <S.SocialRow>
        <S.SocialLink
          href={`https://www.tiktok.com/@${tiktok.handle}`}
          target="_blank"
          rel="noreferrer"
        >
          <S.SubTitle>
            <FaTiktok size={18} />
            <span>{tiktokHandle}</span>
          </S.SubTitle>
        </S.SocialLink>

        {igHandle && (
          <S.SocialLink
            href={`https://www.instagram.com/${baseData.data.instagram.handle}`}
            target="_blank"
            rel="noreferrer"
          >
            <S.SubTitle>
              <InstagramIcon />
              <span>{igHandle}</span>
            </S.SubTitle>
          </S.SocialLink>
        )}

        {youtubeChannel && (
          <S.SocialLink
            href={`https://www.youtube.com/channel/${baseData.data.youtube.channelId}`}
            target="_blank"
            rel="noreferrer"
          >
            <S.SubTitle>
              <YouTubeIcon />
              <span>{youtubeChannel}</span>
            </S.SubTitle>
          </S.SocialLink>
        )}
      </S.SocialRow>

      <S.FeesRow>
        <S.FeeBox>
          <h4>Average Kyra fee</h4>
          <p>—</p>
        </S.FeeBox>
        <S.FeeBox>
          <h4>Average Kyra CPV</h4>
          <p>—</p>
        </S.FeeBox>
        <S.FeeBox>
          <h4>Predicted fee</h4>
          <p>${predictedFee.toLocaleString()}</p>
        </S.FeeBox>
        <S.FeeBox>
          <h4>Predicted CPV</h4>
          <p>${predictedCpv.toFixed(2)}</p>
        </S.FeeBox>
      </S.FeesRow>
    </S.TopSectionWrapper>
  );
};

export default TopSection;
