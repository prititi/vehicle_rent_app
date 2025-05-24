# 🚗 Vehicle Rent Booking Application

This full-stack application allows users to book a vehicle by filling out a multi-step form. It collects user details, vehicle information, and rental dates while ensuring no overlapping bookings occur.

---

## 📌 Project Overview

- Collect user name, vehicle type, and booking dates.
- Vehicles: Cars (hatchback, sedan, suv) and Bikes (cruiser, sports, etc.)
- Form shows one question per screen.
- Only one booking allowed per vehicle at a time (overlap check).
- Dynamic vehicle and model lists fetched from backend.

---

## 🛠️ Tech Stack

### 🔧 Backend
- Node.js + Express
- SQL Database (PostgreSQL / MySQL / SQLite)
- ORM: Prisma / Sequelize / TypeORM

### 🖥️ Frontend
- React.js
- Material UI for theming
- Tailwind CSS for utility styling


## ✅ Features

- Seed script with:
  - 3 car types (e.g., Hatchback, Sedan, SUV)
  - 1 bike type (e.g., Cruiser)
  - Vehicles under each type
- APIs to:
  - Fetch vehicle types and models
  - Submit booking form
- Overlap check: only one active booking allowed per vehicle
- React multi-step form with validation
- Dynamic rendering of options based on previous answers
- Date range picker for selecting rental dates

---

## 🔗 API Endpoints

### `GET /api/vehicle-types?wheels=2|4`
Returns types like Sedan, SUV, Cruiser based on wheels.

### `GET /api/vehicles?type=TYPE_NAME`
Returns models of selected vehicle type.

### `POST /api/bookings`
Receives booking data and stores it after checking for overlaps.



