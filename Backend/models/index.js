'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};
const Vehicle = require('./Vehicle.model');
const Booking = require('./Booking.model');
const VehicleType = require('./VehicleType.model');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Define associations
Booking.belongsTo(Vehicle, { foreignKey: 'vehicleId', as: 'vehicle' });
Vehicle.belongsTo(VehicleType, { foreignKey: 'typeId', as: 'vehicleType' });

// Set up associations for VehicleType
VehicleType.associate = (models) => {
  VehicleType.hasMany(models.Vehicle, { foreignKey: 'typeId', as: 'vehicles' });
};

// Collect all models into an object
const models = {
  Vehicle,
  VehicleType,
  Booking,
};

// Initialize associations for the remaining models
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
