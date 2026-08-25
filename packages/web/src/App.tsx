import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initializeFirebase } from '@dayly/shared';
import store from './store';

initializeFirebase();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<div className="p-8"><h1>📅 Dayly App - Setup Completato!</h1></div>} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
