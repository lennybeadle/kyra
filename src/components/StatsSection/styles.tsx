import styled from 'styled-components';

export const StatsSectionWrapper = styled.section`
  padding-top: 1rem;
`;

export const TabsRow = styled.nav`
  display: flex;
  gap: 4rem;
  border-bottom: 1px solid #333;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  justify-content: center;
`;

export const TabLink = styled.a<{ active?: boolean }>`
  color: ${({ active }) => (active ? '#70efde' : '#fff')};
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const ProfileBioContainer = styled.div`
  border: 1px solid #333;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

export const ProfileBioTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
`;

export const HandleBadge = styled.span`
  display: inline-block;
  background: #111;
  border: 1px solid #444;
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.9rem;
  margin-right: 0.5rem;
`;

export const BioText = styled.span`
  color: #ccc;
  font-size: 0.95rem;
`;

export const StatsContainer = styled.div`
  border: 1px solid #333;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

export const StatsRow = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  gap: 2rem;
  border-bottom: 1px solid #333;
  &:last-child {
    border-bottom: none;
  }

  /* On smaller screens, stack vertically */
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const PlatformIcon = styled.div`
  font-size: 2rem;
  margin-right: 1rem;
  min-width: 40px;
  text-align: center;
`;

export const StatsGroup = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.95rem;
  color: #ccc;
  gap: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  span:first-child {
    margin-bottom: 0.25rem;
  }
`;

export const Trend = styled.div`
  color: #70efde;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Symbol = styled.span`
  color: #70efde;
`;
export const StatsNumber = styled.strong`
  font-size: 1.5rem;
  color: #fff;
`;
