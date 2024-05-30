module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Users",
        {
            id: {type: DataTypes.STRING, primaryKey: true},
            name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            profile_picture: DataTypes.STRING,
            rank: DataTypes.STRING,
        },
        {
            tableName: "users",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    )

    Model.associate = (model) => {
        Model.hasOne(model.Shopping_cart, {
            as: "shopping_cart",
            through: "shopping_cart",
            foreignKey: "id_user",
            otherKey: "id_product",
            timestamps: false
        })
    }

    return Model
}