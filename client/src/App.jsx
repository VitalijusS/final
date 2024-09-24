import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { LocationListing } from './pages/LocationListing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { GlobalContextWraper } from './context/GlobalContext';
import { NewLocation } from './pages/NewLocation';

function App() {
  return (
    <GlobalContextWraper>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/locations' element={<LocationListing />}></Route>
          <Route path='/locations/new' element={<NewLocation />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </GlobalContextWraper>
  )
}

export default App
