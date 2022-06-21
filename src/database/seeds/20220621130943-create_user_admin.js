"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "ADMINISTRATOR",
        username: "admin",
        password_hash:
          "$2a$08$eSeESuR2BjkYOyUefYyANuTQmWfFChGQ8JU4XTGD85RGyx1C1jUf2",
        provider: true,
        root: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
