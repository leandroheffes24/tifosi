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
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    )

    return Model
}