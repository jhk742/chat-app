import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Chat from './pages/Chat'
import Register from './pages/Register'
import Login from './pages/Login'
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, TabContainer } from 'react-bootstrap'
import NavBar from './components/NavBar'
import { AuthContext } from './context/AuthContext'

export default function App() {

  const {user} = useContext(AuthContext)

  return (
    <>
      <NavBar />
      <Container>
          <Routes>
              {/*if we have a user, show the Chat comp, if not, the login/register comp... */}
              <Route path="/" element={user ? <Chat /> : <Login />} />
              <Route path="/register" element={user ? <Chat /> : <Register />} />
              <Route path="/login" element={user ? <Chat /> : <Login />} />
              <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </Container>
    </>
    
  )
}