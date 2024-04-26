import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './Pages/Signup/Signup';
import Signin from './Pages/Signin/Signin';
import OnboardingOne from './Pages/first_onboard/OnboardingOne';
import OnboardingTwo from './Pages/second_onboard/OnboardingTwo';
import Pathways from './Pages/pathways/Pathways';
import Practice from './Pages/practice/Practice';
import Record from './components/new_recorder.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding-one" element={<OnboardingOne />} />
        <Route path="/onboarding-two" element={<OnboardingTwo />} />
        <Route path="/pathways" element={<Pathways />} />
        <Route path="/practice/:id" element={<Practice />} />
        <Route path="/recorder" element={<Record />} />
      </Routes>
    </Router>
  );
}

export default App;
