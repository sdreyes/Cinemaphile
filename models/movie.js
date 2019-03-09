
module.exports = function (sequelize, Sequelize) {
    var Movie = sequelize.define("movie", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        genre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        image: {
            type: Sequelize.TEXT,
        }
    });
    return Movie;
};
