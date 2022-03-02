import { useState } from 'react'
import { Routes, Route } from 'react-router'
import Navigation from "./components/Navigation"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Albums from "./pages/Albums"
import Album from "./pages/Album"
import PageNotFound from "./pages/PageNotFound"
import Review from "./pages/Review"
import RouteGuard from "./components/RouteGuard"

function App() {

  return (
    <div>
        <Navigation />
        <Routes>
            <Route path="/" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/review/:owner/:id" element={ <Review /> } />

            <Route path="/albums" element={
                <RouteGuard redirectTo="/">
                    <Albums />
                </RouteGuard>
                } />
            <Route path="/albums/:id" element={
                <RouteGuard redirectTo="/">
                    <Album />
                </RouteGuard>
                } />

            <Route path="*" element={ <PageNotFound /> } />
        </Routes>
    </div>
  )
}

export default App
