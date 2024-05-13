import React from 'react'
import ReactDOM from 'react-dom/client'
import AccountDrawer from './Account.jsx'
import Todo from './Todo.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import Reset from './Reset.jsx'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/app" element={<Todo />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
