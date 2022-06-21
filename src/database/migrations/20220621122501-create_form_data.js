"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("form_datas", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fk_section_id: {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",

        references: {
          model: "sections",
          key: "id",
        },
      },
      fk_dep_id: {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",

        references: {
          model: "departamentos",
          key: "id",
        },
      },

      fk_author_id: {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",

        references: {
          model: "users",
          key: "id",
        },
      },

      fk_form_id: {
        type: Sequelize.INTEGER,
        onUpdate: "CASCADE",
        onDelete: "SET NULL",

        references: {
          model: "forms",
          key: "id",
        },
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("form_datas");
  },
};
