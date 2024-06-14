module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Products",
        {
            id: {type: DataTypes.INTEGER, primaryKey: true},
            price: DataTypes.INTEGER,
            discount: DataTypes.INTEGER,
            product_name: DataTypes.STRING,
            image: DataTypes.STRING,
        },
        {
            tableName: "products",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    )

    Model.associate = (model) => {
        Model.belongsTo(model.Categories, {
            as: "category",
            through: "products_categories",
            foreignKey: "category_id",
            targetKey: "id",
            timestamps: false
        })

        Model.belongsTo(model.Subcategories, {
            as: "subcategory",
            through: "products_subcategories",
            foreignKey: "subcategory_id",
            targetKey: "id",
            timestamps: false
        })

        Model.belongsToMany(model.Talles, {
            as: "talle",
            through: "products_talles",
            foreignKey: "product_id",
            otherKey: "talle_id",
            timestamps: false
        });
    }

    return Model
}