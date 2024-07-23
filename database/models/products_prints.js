module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Products_prints",
        {
            id: {type: DataTypes.INTEGER, primaryKey: true},
            product_id: DataTypes.INTEGER,
            print: DataTypes.STRING
        },
        {
            tableName: "products_prints",
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