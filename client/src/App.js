import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage/homepage';
import Hello from './pages/Hello/hello';
import Registration from './pages/Registration/registration';
import Logging from './pages/Logging/logging';
import {store} from './redux/store';
import {Provider} from 'react-redux';
import StartTest from './pages/StartTest/starttest';
import EndTest from './pages/EndTest/endtest';
import Question1 from './pages/Question1/question1'
import Question2 from './pages/Question2/question2'

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Homepage />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/logging" element={<Logging />} />
        <Route path="/starttest" element={<StartTest />} />
        <Route path="/endtest" element={<EndTest />} />
        <Route path="/question1" element={<Question1 />} />
        <Route path="/question2" element={<Question2 />} />
      </Routes>
    </Router>
  );
}

export default App;
