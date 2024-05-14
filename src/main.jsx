import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Queries from './components/Queries.jsx';
import Query from './components/Query.jsx';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Answers from './components/Answers.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes> 
        <Route path="/" element={<App />}>
          <Route index element={<Queries />} />
          <Route path="Query" element={<Query />} />
          <Route path="Answers" element={<Answers />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
);
