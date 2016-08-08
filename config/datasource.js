import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

let database = null;

export default function(app) {
  if(!database) {
    const config = app.config;
    const sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config.params
        );

    database = {
      sequelize,
      Sequelize,
      models: {}
    };
    const dir = path.join(__dirname, '../models');
    fs.readdirSync(dir).forEach(file => {
      const modelDir = path.join(dir, file);
      const model = sequelize.import(modelDir);
      database.models[model.name] = model;
    });
    sequelize.sync().done(() => {
      return database;
    });
  }
  return database;
};
