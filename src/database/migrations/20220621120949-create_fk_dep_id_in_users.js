module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.addColumn("users", "fk_dep_id", {
      type: Sequelize.INTEGER,
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      references: {
        model: "departamentos",
        key: "id",
      },
    }),

  down: async (queryInterface) =>
    queryInterface.removeColumn("users", "fk_dep_id"),
};
