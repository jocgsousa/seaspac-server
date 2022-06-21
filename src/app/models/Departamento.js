import Sequelize, { Model } from "sequelize";

class Departamento extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(model) {
    this.belongsToMany(model.User, {
      through: "users",
      as: "operadores",
      foreignKey: "fk_dep_id",
      otherKey: "id",
    });

    this.belongsToMany(model.Section, {
      through: "sections",
      as: "secoes",
      foreignKey: "fk_dep_id",
      otherKey: "id",
    });
  }
}

export default Departamento;
