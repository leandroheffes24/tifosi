module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Orders",
        {
            id: {type: DataTypes.INTEGER, primaryKey: true},
            user_id: DataTypes.STRING,
            status: DataTypes.STRING,
            total_price: DataTypes.INTEGER,
            user_name: DataTypes.STRING,
            detail: DataTypes.STRING,
            country: DataTypes.STRING,
            province: DataTypes.STRING,
            city: DataTypes.STRING,
            address: DataTypes.STRING,
            cp: DataTypes.STRING,
            dni: DataTypes.STRING,
        },
        {
            tableName: "orders",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    )

    Model.associate = (model) => {
        Model.belongsTo(model.Users, {
            foreignKey: 'user_id'
        })
    }

    return Model
}