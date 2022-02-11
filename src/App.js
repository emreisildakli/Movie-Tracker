import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

//styles
import './App.css'
// pages
import Create from './pages/create/Create'
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/Login'
import Movie from './pages/movies/Movie'
import Signup from './pages/signup/Signup'

// components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import OnlineUsers from './components/OnlineUsers'

function App() {
  const { authIsReady, user} = useAuthContext()
  return (
      <div className="App">
        {authIsReady && (
          <BrowserRouter>
            {user&& <Sidebar/>}
            <div className='container'>
            <Navbar/>
            <Routes>
              <Route path='/' element={user? <Dashboard/> : <Navigate to='/login'/>}/>
              <Route path='/login' element={!user? <Login/> : <Navigate to='/'/>}/>
              <Route path='/signup' element={!user? <Signup/> : <Navigate to='/'/> }/>
              <Route path='/create' element={user? <Create/>: <Navigate to='/login'/>}/>
              <Route path='/movies/:id' element={user? <Movie/>: <Navigate to='/login'/>}/>
            </Routes>
            </div>
            {user && <OnlineUsers/>}
          </BrowserRouter>
        )}
      </div>
  );
}

export default App
