"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("departamentos", [
      {
        name: "CRAS - BELA VISTA",
        active: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("departamentos", null, {});
  },
};
