import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BrelandInsurance from './BrelandInsurance';
import ServicesPage from './ServicesPage';

export default function App() {
  return (
    <Router>
      <div className="w-full min-h-screen">
        <Routes>
          <Route path="/" element={<BrelandInsurance />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
      </div>
    </Router>
  );
}
