module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Products_talles",
        {
            id: {type: DataTypes.INTEGER, primaryKey: true},
            product_id: DataTypes.INTEGER,
            talle_id: DataTypes.INTEGER
        },
        {
            tableName: "products_talles",
            timestamps: false
        }
    )

    return Model
}