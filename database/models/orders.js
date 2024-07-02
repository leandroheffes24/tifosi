module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Orders",
        {
            id: {type: DataTypes.INTEGER, primaryKey: true},
            user_id: DataTypes.STRING,
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