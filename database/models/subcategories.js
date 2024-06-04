module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Subcategories",
        {
            id: {type: DataTypes.INTEGER, primaryKey: true},
            name: DataTypes.STRING,
            category_id: DataTypes.INTEGER
        },
        {
            tableName: "subcategories",
            timestamps: false
        }
    )

    Model.associate = (model) => {
        Model.belongsToMany(model.Products, {
            as: "product",
            through: "products_subcategories",
            foreignKey: "subcategory_id",
            otherKey: "product_id",
            timestamps: false
        })
    }

    return Model
}