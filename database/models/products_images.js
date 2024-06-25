module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Products_images",
        {
            id: {type: DataTypes.INTEGER, primaryKey: true},
            product_id: DataTypes.INTEGER,
            image: DataTypes.STRING
        },
        {
            tableName: "products_images",
            timestamps: false
        }
    )

    Model.associate = (model) => {
        Model.belongsTo(model.Products, {
            foreignKey: 'product_id'
        })
    }

    return Model
}