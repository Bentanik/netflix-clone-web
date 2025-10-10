import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
