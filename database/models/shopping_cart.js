module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Shopping_cart",
        {
            id: {type: DataTypes.INTEGER, primaryKey: true},
            id_user: DataTypes.STRING,
            id_product: DataTypes.INTEGER,
            product_name: DataTypes.STRING,
            product_price: DataTypes.INTEGER,
            product_discount: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            talle: DataTypes.STRING
        },
        {
            tableName: "shopping_cart",
            timestamps: false
        }
    )

    Model.associate = (model) => {
        Model.belongsTo(model.Users, {
            as: "user",
            through: "shopping_cart",
            foreignKey: "id_product",
            otherKey: "id_category",
            timestamps: false
        })
    }

    return Model
}