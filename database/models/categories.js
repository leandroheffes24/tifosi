module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Categories",
        {
            id: {type: DataTypes.INTEGER, primaryKey: true},
            name: DataTypes.STRING
        },
        {
            tableName: "categories",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    )

    return Model
}