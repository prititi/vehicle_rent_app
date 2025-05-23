const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('Welcome to the Vehicle Rental API');
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
