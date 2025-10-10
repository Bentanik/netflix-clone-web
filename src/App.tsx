import { Outlet } from 'react-router-dom';
import { Header } from '@/components';

function App() {
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
