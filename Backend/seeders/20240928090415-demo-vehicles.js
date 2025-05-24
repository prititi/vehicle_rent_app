'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const types = await queryInterface.sequelize.query(
      `SELECT id, name FROM VehicleTypes;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const typeMap = {};
    types.forEach(t => typeMap[t.name] = t.id);

    await queryInterface.bulkInsert('Vehicles', [
      { name: 'Maruti Swift', typeId: typeMap['Hatchback'], createdAt: new Date(), updatedAt: new Date() },
      { name: 'Hyundai i20', typeId: typeMap['Hatchback'], createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mahindra Thar', typeId: typeMap['SUV'], createdAt: new Date(), updatedAt: new Date() },
      { name: 'Tata Harrier', typeId: typeMap['SUV'], createdAt: new Date(), updatedAt: new Date() },
      { name: 'Honda City', typeId: typeMap['Sedan'], createdAt: new Date(), updatedAt: new Date() },
      { name: 'Royal Enfield Meteor 350', typeId: typeMap['Cruiser'], createdAt: new Date(), updatedAt: new Date() },
      { name: 'Yamaha R15 V4', typeId: typeMap['Sports'], createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Vehicles', null, {});
  }
};
