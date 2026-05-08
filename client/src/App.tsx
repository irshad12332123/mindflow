import React from 'react';
import AppRoutes from './routes/AppRoutes';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="font-sans antialiased text-white selection:bg-primary/30">
      <AppRoutes />
    </div>
  );
};

export default App;

