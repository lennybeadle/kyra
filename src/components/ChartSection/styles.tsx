import styled from 'styled-components';

export const ChartWrapper = styled.section`
  border: 1px solid #333;
  border-radius: 1.5rem;
  background: #0c0c0c;
  padding: 1rem;
  margin-bottom: 2rem;
  position: relative;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .color-box {
    width: 12px;
    height: 12px;
    border-radius: 3px;
    display: inline-block;
  }
`;

export const CharTextGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
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

export const ChartContainer = styled.div`
  height: 400px; /* adjust as needed */
  position: relative;
`;
