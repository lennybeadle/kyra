import styled from 'styled-components';

export const HeatmapWrapper = styled.section`
  border: 1px solid #333;
  border-radius: 0.75rem;
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
  background: #111;
  border: 1px solid #444;
  border-radius: 999px;
  padding: 0.3rem 0.7rem;
  font-size: 0.8rem;
  color: #aaa;
`;

/** Container for the actual heatmap so it can scroll horizontally if needed */
export const CalendarContainer = styled.div`
  overflow-x: auto;
  .react-calendar-heatmap text {
    fill: #bbb; /* Month/weekday labels */
  }
  /* Day squares (cells) are rectangles with class color-empty or color-filled */
  .color-empty {
    fill: #333 !important;
    stroke: #333 !important;
  }
  .color-filled {
    fill: #70efde !important;
    stroke: #70efde !important;
  }
  /* You might want smaller or larger squares: override .react-calendar-heatmap .day */
  .react-calendar-heatmap .day {
    shape-rendering: auto; /* so it’s not pixelated */
    rx: 3px; /* slightly rounded corners */
    ry: 3px;
  }
`;
