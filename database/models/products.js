module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Products",
        {
            id: {type: DataTypes.INTEGER, primaryKey: true},
            price: DataTypes.INTEGER,
            product_name: DataTypes.STRING,
            category_id: DataTypes.INTEGER,
            subcategory_id: { type: DataTypes.INTEGER, allowNull: true },
            stock: DataTypes.INTEGER
        },
        {
            tableName: "products",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    )

    Model.associate = (model) => {
        Model.belongsToMany(model.Talles, {
            as: "talle",
            through: "products_talles",
            foreignKey: "product_id",
            otherKey: "talle_id",
            timestamps: false
        });

        Model.hasMany(model.Products_images, {
            as: 'images',
            foreignKey: 'product_id'
        })

        Model.hasMany(model.Products_prints, {
            as: 'prints',
            foreignKey: 'product_id'
        })
    }

    return Model
}