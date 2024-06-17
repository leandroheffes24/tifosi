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

    Model.associate = (models) => {
        Model.belongsTo(models.Products, {
            foreignKey: "product_id",
            as: "product"
        });

        Model.belongsTo(models.Talles, {
            foreignKey: "talle_id",
            as: "talle"
        });
    };

    return Model
}