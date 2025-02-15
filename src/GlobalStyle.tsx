import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Reset / box-sizing */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    background: #0c0c0c;
    color: #fff;
  }

  #root {
    min-height: 100vh;
  }

  .react-calendar-heatmap text {
    fill: #aaa;
  }
  .color-empty {
    fill: #333 !important;
  }
  .color-filled {
    fill: #1abc9c !important;
  }
`;

export default GlobalStyle;
