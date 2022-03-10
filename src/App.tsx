import { HelmetProvider } from 'react-helmet-async';
import { AppThemeProvider } from './styles/ThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AuthContextProvider } from './contexts/AuthContext';
import { LoadingContextComponent } from './contexts/LoadingContext';

function App() {
  return (
    <HelmetProvider >
      <AppThemeProvider>
        <BrowserRouter>
          <LoadingContextComponent>
            <AuthContextProvider>
              <AppRoutes />
            </AuthContextProvider>
          </LoadingContextComponent>
        </BrowserRouter>
      </AppThemeProvider>
    </HelmetProvider>
  );
}

export default App;
