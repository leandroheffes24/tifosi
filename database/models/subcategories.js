module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Subcategories",
        {
            id: {type: DataTypes.INTEGER, primaryKey: true},
            name: DataTypes.STRING
        },
        {
            tableName: "categories",
            timestamps: false
        }
    )

    Model.associate = (model) => {
        Model.belongsTo(model.Categories, {
            as: "category",
            through: "categories_subcategories",
            foreignKey: "category_id",
            targetKey: "id",
            timestamps: false
        })

        Model.belongsToMany(model.Products, {
            as: "product",
            through: "products_subcategories",
            foreignKey: "subcategory_id", // La clave foránea en la tabla intermedia products_categories
            otherKey: "product_id", // La clave foránea en la tabla Products
            timestamps: false
        })
    }

    return Model
}