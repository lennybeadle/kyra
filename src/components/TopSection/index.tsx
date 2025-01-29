import React, { useEffect, useState } from 'react';
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
    return <S.TopSectionWrapper>Loading top section...</S.TopSectionWrapper>;
  }

  const { tiktok } = baseData.data;
  const name = tiktok.nickname || tiktok.handle;
  const region = tiktok.region || 'Unknown';
  // If language is "en", you could display "English" or similar
  const language = tiktok.language === 'en' ? 'English' : tiktok.language;
  const profilePic = tiktok.profilePicture;
  const predictedFee = baseData.predictedFee;
  const predictedCpv = baseData.predictedCpv;
  // Social handles
  const tiktokHandle = `@${tiktok.handle}`;
  const igHandle = baseData.data.instagram.handle
    ? `@${baseData.data.instagram.handle}`
    : null;
  const youtubeChannel = baseData.data.youtube.channelId ? 'YouTube' : null;
  return (
    <S.TopSectionWrapper>
      {/* Profile Image */}
      <S.ProfileImage
        src={profilePic || 'https://via.placeholder.com/130'}
        alt={name}
      />

      {/* Name + Bookmark/Share Icons */}
      <S.NameRow>
        <S.NameText>{name.toLowerCase()}</S.NameText>
        <S.IconRow>
          <span title="Bookmark">🔖</span>
          <span title="Share">🔗</span>
        </S.IconRow>
      </S.NameRow>

      {/* Location + Language */}
      <S.MetaRow>
        <span>🇺🇸 {region}</span>
        <span>🌐 {language}</span>
      </S.MetaRow>

      {/* Social links row */}
      <S.SocialRow>
        {/* Tiktok handle */}
        <S.SocialLink
          href={`https://www.tiktok.com/@${tiktok.handle}`}
          target="_blank"
          rel="noreferrer"
        >
          {tiktokHandle}
        </S.SocialLink>

        {/* Instagram handle (if present) */}
        {igHandle && (
          <S.SocialLink
            href={`https://www.instagram.com/${baseData.data.instagram.handle}`}
            target="_blank"
            rel="noreferrer"
          >
            {igHandle}
          </S.SocialLink>
        )}

        {/* YouTube (if present) */}
        {youtubeChannel && (
          <S.SocialLink
            href={`https://www.youtube.com/channel/${baseData.data.youtube.channelId}`}
            target="_blank"
            rel="noreferrer"
          >
            {youtubeChannel}
          </S.SocialLink>
        )}
      </S.SocialRow>

      {/* Fees boxes */}
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
