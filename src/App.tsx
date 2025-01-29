import styled from 'styled-components';
import TopSection from './components/TopSection';
import StatsSection from './components/StatsSection';
import ChartSection from './components/ChartSection';
import HeatmapSection from './components/HeatmapSection';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #0c0c0c;
  color: #ffffff;
  min-height: 100vh;
`;

function App() {
  return (
    <AppContainer>
      <TopSection />
      <StatsSection />
      <ChartSection />
      <HeatmapSection />
    </AppContainer>
  );
}

export default App;
