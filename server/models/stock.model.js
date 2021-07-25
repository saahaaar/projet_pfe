module.exports = (sequelize, Sequelize) => {
  const Stock = sequelize.define("stocks", {
    stock_id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    categorie: {
      type: Sequelize.STRING
    },
    sous_categorie: {
      type: Sequelize.STRING
    },
    quantite: {
      type: Sequelize.INTEGER
    },
    modele: {
      type: Sequelize.STRING
    },
  },
    {
      timestamps: false
    });


  return Stock;
};