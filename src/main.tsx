import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import history from 'utils/history';

import ScrollTop from './components/Common/ScrollTop';
import { GlobalStyle } from './styles/global-styles';
import { theme } from './styles/theme';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Router history={history as any}>
        <ScrollTop />
        <RecoilRoot>
          <App />
          <div id="modal" />
        </RecoilRoot>
      </Router>
    </ThemeProvider>
  </>,
);
