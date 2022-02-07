module.exports = (sequelize, DataTypes) => {
    return sequelize.define('favouriteList', {
        description: {
           type: DataTypes.STRING,
           allowNull: false, 
           validate: {
            len: [3, 30]
           }
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    })
}