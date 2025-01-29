import styled from 'styled-components';

export const ChartWrapper = styled.section`
  border: 1px solid #333;
  border-radius: 0.75rem;
  background: #0c0c0c;
  padding: 1rem;
  margin-bottom: 2rem;
  position: relative; /* for the TikTok badge positioning */
`;

export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const ChartTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: #fff;
`;

export const Badge = styled.span`
  background: #111;
  border: 1px solid #444;
  border-radius: 999px;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  color: #aaa;
`;

/** Container for the actual chart (so we can maintain responsive height). */
export const ChartContainer = styled.div`
  height: 400px; /* adjust as needed */
  position: relative;
`;
