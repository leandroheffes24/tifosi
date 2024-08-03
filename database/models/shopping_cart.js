module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Shopping_cart",
        {
            id: {type: DataTypes.INTEGER, primaryKey: true},
            id_user: DataTypes.STRING,
            id_product: DataTypes.INTEGER,
            product_name: DataTypes.STRING,
            product_price: DataTypes.INTEGER,
            products_total_price: DataTypes.INTEGER,
            product_print: DataTypes.STRING,
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

        Model.belongsTo(model.Products, {
            as: "product",
            foreignKey: "id_product"
        });
    }

    return Model
}