import React, { useState } from "react";
import {
  Button,
  Step,
  StepLabel,
  Stepper,
  Card,
  CardContent,
  TextField,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Typography,
} from "@mui/material";

const BookingForm = () => {
  const [name, setName] = useState({ first: "", last: "" });
  const [wheels, setWheels] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [model, setModel] = useState("");
  const [dates, setDates] = useState({ start: "", end: "" });
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    "Enter Name",
    "Select Number of Wheels",
    "Select Type of Vehicle",
    "Select Model",
    "Select Date Range",
  ];

  const fetchVehicleTypes = async (wheels) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/vehicle-type?wheels=${wheels}`
      );
      const data = await response.json();
      if (Array.isArray(data.data)) {
        setVehicleTypes(data.data);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchVehiclesByType = async (typeId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/vehicles?id=${typeId}`
      );
      const data = await response.json();
      if (Array.isArray(data.data)) {
        setVehicles(data.data);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleWheelsChange = (numWheels) => {
    setWheels(numWheels);
    fetchVehicleTypes(numWheels);
  };

  const handleVehicleTypeChange = (typeId) => {
    setVehicleType(typeId);
    fetchVehiclesByType(typeId);
  };

  const handleNext = () => {
    if (activeStep === 0 && (!name.first || !name.last)) {
      return setError("Please enter your first and last name.");
    }
    if (activeStep === 1 && !wheels) {
      return setError("Select the number of wheels.");
    }
    if (activeStep === 2 && !vehicleType) {
      return setError("Choose a vehicle type.");
    }
    if (activeStep === 3 && !model) {
      return setError("Pick a vehicle model.");
    }
    if (activeStep === 4 && (!dates.start || !dates.end)) {
      return setError("Select both start and end dates.");
    }

    setError(null);
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async () => {
    if (!dates.start || !dates.end) {
      return setError("Select both start and end dates.");
    }

    const formData = {
      firstName: name.first,
      lastName: name.last,
      model,
      dates: {
        startDate: dates.start,
        endDate: dates.end,
      },
    };

    try {
      const response = await fetch("http://localhost:8000/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        setError(data.message || "Error submitting form.");
      }
    } catch (err) {
      alert("Submission failed. Try again.");
    }
  };

  const inputStyles = {
    backgroundColor: "#fff",
    borderRadius: 1,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ccc",
      },
      "&:hover fieldset": {
        borderColor: "#1976d2",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1976d2",
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/vehicle.jpg')",
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 800,
          width: "100%",
          borderRadius: 4,
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent sx={{ padding: 4 }}>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Vehicle Booking Form
          </Typography>

          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
              {error}
            </Typography>
          )}

          <Box sx={{ mt: 4 }}>
            {activeStep === 0 && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="First Name"
                  value={name.first}
                  onChange={(e) =>
                    setName({ ...name, first: e.target.value })
                  }
                  fullWidth
                  sx={inputStyles}
                />
                <TextField
                  label="Last Name"
                  value={name.last}
                  onChange={(e) =>
                    setName({ ...name, last: e.target.value })
                  }
                  fullWidth
                  sx={inputStyles}
                />
              </Box>
            )}

            {activeStep === 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <FormControl sx={{ textAlign: "center" }}>
                  <FormLabel sx={{ textAlign: "center" }}>Select Number of Wheels</FormLabel>
                  <RadioGroup
                    row
                    value={wheels}
                    onChange={(e) => handleWheelsChange(e.target.value)}
                    sx={{ mt: 2, justifyContent: "center" }}
                  >
                    <FormControlLabel value="2" control={<Radio />} label="2" />
                    <FormControlLabel value="4" control={<Radio />} label="4" />
                  </RadioGroup>
                </FormControl>
              </Box>
            )}


            {activeStep === 2 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "120px",
                }}
              >
                <div style={{ width: "80%" }}>
                  <InputLabel>Type of Vehicle:</InputLabel>
                  <Select
                    fullWidth
                    onChange={(e) => handleVehicleTypeChange(e.target.value)}
                    value={vehicleType}
                    sx={{ height: "48px", fontSize: "16px" }}
                  >
                    <MenuItem value="">Select</MenuItem>
                    {vehicleTypes.map((type, index) => (
                      <MenuItem key={index} value={type.id}>
                        {type.name || type.toString()}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </Box>
            )}

            {activeStep === 3 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "120px",
                }}
              >
                <div style={{ width: "80%" }}>
                  <InputLabel>Model:</InputLabel>
                  <Select
                    fullWidth
                    onChange={(e) => setModel(e.target.value)}
                    value={model}
                    sx={{ height: "48px", fontSize: "16px" }}
                  >
                    {vehicles.map((type, index) => (
                      <MenuItem key={index} value={type.id}>
                        {type.name || type.toString()}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </Box>
            )}

            {activeStep === 4 && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  type="date"
                  label="Start Date"
                  InputLabelProps={{ shrink: true }}
                  value={dates.start}
                  onChange={(e) =>
                    setDates({ ...dates, start: e.target.value })
                  }
                  fullWidth
                />
                <TextField
                  type="date"
                  label="End Date"
                  InputLabelProps={{ shrink: true }}
                  value={dates.end}
                  onChange={(e) =>
                    setDates({ ...dates, end: e.target.value })
                  }
                  fullWidth
                />
              </Box>
            )}
          </Box>
        </CardContent>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #e0e0e0",
            padding: 3,
            backgroundColor: "#fafafa",
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}
        >
          <Button variant="outlined" onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
          >
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default BookingForm;
