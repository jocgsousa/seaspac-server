import Sequelize, { Model } from "sequelize";

class FormData extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        data: Sequelize.TEXT,
        fk_section_id: Sequelize.INTEGER,
        fk_dep_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default FormData;
