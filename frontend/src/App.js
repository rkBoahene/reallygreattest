import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from './pages/Chat';
import { useAuth0 } from "@auth0/auth0-react";


export default function App() {
  const [loginWithPopup, logout, user, isAuthenticated] = useAuth0()
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Chat />} />
    </Routes>
  </BrowserRouter>
  )
}