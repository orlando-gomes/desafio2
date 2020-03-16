import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        street_name: Sequelize.STRING,
        house_number: Sequelize.STRING,
        complement: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        postal_code: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default Recipient;
