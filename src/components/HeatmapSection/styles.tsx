import styled from 'styled-components';

export const HeatmapWrapper = styled.section`
  border: 1px solid #333;
  border-radius: 1.5rem;
  background: #0c0c0c;
  padding: 1rem;
  margin-bottom: 2rem;
  position: relative;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const TitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 1rem;

  h3 {
    margin: 0;
    font-size: 1.2rem;
  }
  span {
    color: #aaa;
    font-size: 0.9rem;
  }
`;

export const Badge = styled.span`
  background: #1a1920;
  border: 1px solid #444;
  border-radius: 999px;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
`;

export const CalendarContainer = styled.div`
  width: 100%;
`;

export const PostHistory = styled.div`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;
export const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
`;
