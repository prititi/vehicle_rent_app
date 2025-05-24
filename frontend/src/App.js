// App.jsx or App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import HomePage from './components/HomePage';
import BookingForm from './components/BookingForm';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <Toaster
                position="bottom-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 7000,
                    style: {
                        background: '#000',
                        color: '#fff',
                    },
                }}
            />
            <Routes>
                <Route path="/" element={<BookingForm />} />
                <Route path="/ListBookings" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

export default App;
