module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Users",
        {
            id: {type: DataTypes.STRING, primaryKey: true},
            name: { type: DataTypes.STRING, allowNull: true },
            last_name: { type: DataTypes.STRING, allowNull: true },
            email: { type: DataTypes.STRING, allowNull: true },
            password: { type: DataTypes.STRING, allowNull: true },
            country: { type: DataTypes.STRING, allowNull: true },
            province: { type: DataTypes.STRING, allowNull: true },
            city: { type: DataTypes.STRING, allowNull: true },
            address: { type: DataTypes.STRING, allowNull: true },
            cp: { type: DataTypes.STRING, allowNull: true },
            dni: { type: DataTypes.STRING, allowNull: true },
            rank: { type: DataTypes.STRING, allowNull: true },
        },
        {
            tableName: "users",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    )

    Model.associate = (model) => {
        Model.hasOne(model.Shopping_cart, {
            as: "shopping_cart",
            through: "shopping_cart",
            foreignKey: "id_user",
            otherKey: "id_product",
            timestamps: false
        })

        Model.hasMany(model.Orders, {
            as: 'orders',
            foreignKey: 'user_id'
        })
    }

    return Model
}