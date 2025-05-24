import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, CircularProgress, Pagination, Typography
} from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/booking');
                if (!response.ok) throw new Error('Failed to fetch bookings.');
                const data = await response.json();
                setBookings(data);
            } catch (err) {
                console.error('Error fetching bookings:', err);
                setError('Error fetching bookings. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const paginatedData = bookings.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    if (loading) return (
        <div className="flex justify-center items-center">
            <CircularProgress />
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center h-screen text-red-600 text-lg font-semibold">
            {error}
        </div>
    );

    return (
        <div className="flex justify-center items-center px-4 mt-[0%] ">
            <div className="w-full max-w-6xl">
                <div className="flex justify-between items-center mb-6">
                    <Typography variant="h4" className="text-left">
                        Booking Management
                    </Typography>

                </div>

                <TableContainer component={Paper} className="">
                    <Link to="/">
                        <Button variant="contained" color="primary" className='mb-4'>
                            Book Now
                        </Button>
                    </Link>
                    <Table>

                        <TableHead sx={{ backgroundColor: '#f0f4ff' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Sr.</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>First Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Last Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Vehicle ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Start Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>End Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.map((booking, index) => (
                                <TableRow key={booking.id} hover>
                                    <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                                    <TableCell>{booking.firstName}</TableCell>
                                    <TableCell>{booking.lastName}</TableCell>
                                    <TableCell>{booking.vehicleId}</TableCell>
                                    <TableCell>{new Date(booking.startDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{new Date(booking.endDate).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div className="mt-6 flex justify-center">
                    <Pagination
                        count={Math.ceil(bookings.length / rowsPerPage)}
                        page={page}
                        onChange={(e, value) => setPage(value)}
                        shape="rounded"
                        color="primary"
                    />
                </div>
            </div>
        </div>
    );
};

export default HomePage;