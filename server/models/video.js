module.exports = (sequelize, DataTypes) => {
    return sequelize.define('video', {
        description: {
           type: DataTypes.STRING,
           allowNull: false, 
           validate: {
            len: [5, 30]
           }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false, 
            validate: {
             len: [5, 30]
            }
         },
         url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        }
    })
}