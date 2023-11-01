import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import UnauthorizedPage from 'pages/unauthorizedPage/UnauthorizedPage';
import HomePage from 'pages/homepage/homepage';
import AuthenticationPage from 'pages/auth/authenticationPage';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthenticationPage />}></Route>
        <Route path="/home" element={<HomePage/>}></Route>
        <Route path="*" element={<UnauthorizedPage/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
