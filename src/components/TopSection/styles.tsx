import styled from 'styled-components';
export const TopSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 2rem;
  border-bottom: 1px solid #333;
`;

export const ProfileImage = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

export const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`;

export const NameText = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  text-transform: none; /* keep normal capitalization if you like */
`;

export const IconRow = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 1rem;
  color: #70efde;
  cursor: pointer;
`;

export const MetaRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  color: #ccc;
  align-items: center;
`;

export const SocialRow = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

export const SocialLink = styled.a`
  background: #111;
  border: 1px solid #444;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  color: #fff;
  font-size: 0.9rem;
  text-decoration: none;
  &:hover {
    background: #222;
  }
`;

export const FeesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

export const FeeBox = styled.div`
  background: #0c0c0c;
  border: 1px solid #444;
  border-radius: 1.5rem;
  padding: 1rem 2rem;
  min-width: 150px;
  text-align: center;
  h4 {
    margin: 0;
    font-size: 0.9rem;
    color: #999;
  }
  p {
    margin: 0;
    margin-top: 0.25rem;
    font-size: 1.4rem;
    font-weight: 600;
  }
`;
