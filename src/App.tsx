import { AppProvider,  } from './contexts/AppContext';
import AppRoutes from './routes/approutes';

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}