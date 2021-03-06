import Sequelize, { Model } from "sequelize";

class FormDatas extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        data: Sequelize.TEXT,
        fk_section_id: Sequelize.INTEGER,
        fk_dep_id: Sequelize.INTEGER,
        fk_author_id: Sequelize.INTEGER,
        fk_form_id: Sequelize.INTEGER,
        fk_super_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(model) {
    this.belongsTo(model.User, {
      foreignKey: "fk_author_id",
      as: "author",
    });
    this.belongsTo(model.Form, {
      foreignKey: "fk_form_id",
      as: "formulario",
    });
  }
}

export default FormDatas;
