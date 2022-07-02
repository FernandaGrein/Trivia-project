import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import TelaJogo from './pages/Game';
import Settings from './pages/Settings';
import FeedBack from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />
        <Route
          path="/settings"
          component={ Settings }
        />
        <Route
          path="/game"
          component={ TelaJogo }
        />
        <Route
          path="/feedback"
          component={ FeedBack }
        />
        <Route
          path="/ranking"
          component={ Ranking }
        />
      </Switch>
    </div>
  );
}
