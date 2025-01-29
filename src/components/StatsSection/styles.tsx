import styled from 'styled-components';
import { breakpoints } from '../theme';

export const StatsSectionWrapper = styled.section`
  padding-top: 1rem;
`;

export const TabsRow = styled.nav`
  display: flex;
  gap: 4rem;
  border-bottom: 1px solid #333;
  margin-bottom: 1rem;
  justify-content: center;
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

export const TabLink = styled.a<{ active?: boolean }>`
  color: ${({ active }) => (active ? '#C6F12E' : '#fff')};
  text-decoration: none; // Remove default underline
  font-weight: ${({ active }) => (active ? '600' : '400')};

  cursor: pointer;
  position: relative;
  padding-bottom: 0.5rem;

  &:hover {
    opacity: 0.8;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ active }) => (active ? '#C6F12E' : 'transparent')};
    transition: background 0.3s ease;

    transform: scaleX(${({ active }) => (active ? '1' : '0')});
    transform-origin: center;
    transition: transform 0.3s ease, background 0.3s ease;
  }

  &:hover::after {
    background: #c6f12e;
    transform: scaleX(1);
  }
`;

export const ProfileBioContainer = styled.div`
  border: 1px solid #333;
  border-radius: 1.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

export const ProfileBioTitle = styled.h3`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

export const ProfileBioContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3rem;
`;
export const HandleBadge = styled.span`
  display: flex;
  background: #1a1920;
  border: 1px solid #444;
  border-radius: 999px;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  margin-right: 0.5rem;
`;

export const BioText = styled.span`
  color: #ccc;
  font-size: 0.95rem;
`;

export const StatsContainer = styled.div`
  border: 1px solid #333;
  border-radius: 1.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

export const StatsRow = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  gap: 2rem;
  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const PlatformIcon = styled.div`
  font-size: 2rem;
  margin-right: 1rem;
  min-width: 40px;
  text-align: center;
  @media (max-width: ${breakpoints.tablet}) {
    display: flex;
    width: 100%;
    justify-content: center;
  }
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
