import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Post } from './pages/Post';

import './App.css';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
