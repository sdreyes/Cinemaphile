
module.exports = function (sequelize, Sequelize) {
    var Movie = sequelize.define("movie", {
        movies: {
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
        }
    });
    return Movie;
};
