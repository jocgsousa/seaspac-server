import Sequelize from "sequelize";

import databaseConfig from "../config/database";

import User from "../app/models/User";
import Departamento from "../app/models/Departamento";
import Section from "../app/models/Section";
import FormData from "../app/models/FormData";
import Form from "../app/models/Form";

const models = [User, Departamento, Section, FormData, Form];

class databaseConnection {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new databaseConnection();
