import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound.jsx';
import Home from './pages/Home/Home.jsx'


function App() {

  return (
    <>
     <Router basename="/abz_agency">
      <Routes>
         <Route path='/' element={<Home />} />
         <Route path='*' element={<NotFound />} />
      </Routes>
     </Router>
    </>
  )
};

export default App
