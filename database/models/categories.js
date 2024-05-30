module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Categories",
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
        Model.belongsToMany(model.Products, {
            as: "product",
            through: "products_categories",
            foreignKey: "category_id", // La clave foránea en la tabla intermedia products_categories
            otherKey: "product_id", // La clave foránea en la tabla Products
            timestamps: false
        })

        Model.belongsToMany(model.Subcategories, {
            as: "subcategory",
            through: "products_categories",
            foreignKey: "subcategory_id",
            targetKey: "id",
            timestamps: false
        })

        Model.belongsToMany(model.Subcategories, {
            as: "category_subcategory",
            through: "categories_subcategories",
            foreignKey: "category_id", // La clave foránea en la tabla intermedia categories_subcategories
            otherKey: "subcategory_id", // La clave foránea en la tabla Subcategories
            timestamps: false
        })
    }

    return Model
}