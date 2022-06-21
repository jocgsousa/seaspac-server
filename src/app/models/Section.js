import Sequelize, { Model } from "sequelize";

class Section extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        data: Sequelize.TEXT,
        fk_dep_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(model) {
    this.belongsToMany(model.Form, {
      through: "forms",
      as: "formularios",
      foreignKey: "fk_section_id",
      otherKey: "id",
    });
  }
}

export default Section;
