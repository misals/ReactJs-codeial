import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import { getPosts } from '../api';
import { useAuth } from '../hooks';
import { Signup } from '../pages';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Loader from './Loader';
import Navbar from './Navbar';
import Settings from '../pages/Settings';
import UserProfile from '../pages/UserProfile';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute(props) {
  const auth = useAuth();
  const { Component } = props;
  const Navigate = useNavigate();
  useEffect(() => {
    if (!auth.user) {
      Navigate('/login');
    }
  });
  return <Component />;
}

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {/* <Route exact path="/" element={<Home posts={posts} />} /> */}

          <Route path="/" element={<Home posts={[]} />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Signup />} />

          <Route
            path="/settings"
            element={<ProtectedRoute Component={Settings} />}
          ></Route>

          <Route
            path="/user/:userId"
            element={<ProtectedRoute Component={UserProfile} />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
