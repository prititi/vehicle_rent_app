import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, CircularProgress, Pagination, Typography, Box, TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const HomePage = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const rowsPerPage = 8;
    const navigate = useNavigate();
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/booking');
                if (!response.ok) throw new Error('Failed to fetch bookings.');
                const data = await response.json();
                setBookings(data);
                setFilteredBookings(data);
            } catch (err) {
                console.error('Error fetching bookings:', err);
                setError('Error fetching bookings. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const filtered = bookings.filter(b =>
            String(b.firstName).toLowerCase().includes(term) ||
            String(b.lastName).toLowerCase().includes(term) ||
            String(b.vehicleId).toLowerCase().includes(term)
        );
        setFilteredBookings(filtered);
        setPage(1); // reset to first page after search
    }, [searchTerm, bookings]);

    const paginatedData = filteredBookings.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-600 text-lg font-semibold">
                {error}
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center p-4">
            <div className="w-full max-w-[80vw]">
                <div className="flex justify-center mb-6">
                    <Typography variant="h4" align="center">
                        Booking Management
                    </Typography>
                </div>


                <TableContainer component={Paper} sx={{
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    width: '100%',
                }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1} mb={2}>
                        <Button variant="contained" color="primary" onClick={() => navigate("/")}>
                            Book Now
                        </Button>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                px: 1,
                                py: 0.5,
                                width: '100%',
                                maxWidth: 300,
                                backgroundColor: '#fff',
                            }}
                        >
                            <SearchIcon sx={{ color: 'gray', mr: 1 }} />
                            <input
                                type="text"
                                placeholder="Search by name or vehicle ID"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    border: 'none',
                                    outline: 'none',
                                    width: '100%',
                                    fontSize: '18px',
                                    backgroundColor: 'transparent',
                                }}
                            />
                        </Box>
                    </Box>


                    <Table>
                        <TableHead sx={{ backgroundColor: '#f0f4ff' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', }}>Sr.</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', }}>First Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', }}>Last Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', }}>Vehicle Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', }}>Start Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', }}>End Date</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {paginatedData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No results found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedData.map((booking, index) => (
                                    <TableRow sx={{ fontSize: '14px' }} key={booking.id} hover>
                                        <TableCell sx={{ fontSize: '14px' }} >{(page - 1) * rowsPerPage + index + 1}</TableCell>
                                        <TableCell sx={{ fontSize: '14px' }} >{booking.firstName}</TableCell>
                                        <TableCell sx={{ fontSize: '14px' }} >{booking.lastName}</TableCell>
                                        <TableCell sx={{ fontSize: '14px' }} >{booking.Vehicle.name}</TableCell>
                                        <TableCell sx={{ fontSize: '14px' }} >{new Date(booking.startDate).toLocaleDateString()}</TableCell>
                                        <TableCell sx={{ fontSize: '14px' }} >{new Date(booking.endDate).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))
                            )}

                            <TableRow sx={{ borderBottom: 'none' }}>
                                <TableCell colSpan={6} sx={{ borderBottom: 'none' }}>
                                    <Box display="flex" justifyContent="center" py={2}>
                                        <Pagination
                                            count={Math.ceil(filteredBookings.length / rowsPerPage)}
                                            page={page}
                                            onChange={(e, value) => setPage(value)}
                                            shape="rounded"
                                            color="primary"
                                        />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default HomePage;
