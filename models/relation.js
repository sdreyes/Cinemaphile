module.exports = function(sequelize, Sequelize) {
    var Relation = sequelize.define("relation", {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        movieId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        watched: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });
    return Relation;
};