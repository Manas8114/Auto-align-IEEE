/**
 * Main App Component - Router configuration
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import EditorPage from './pages/EditorPage';
import OutputPage from './pages/OutputPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/output" element={<OutputPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
