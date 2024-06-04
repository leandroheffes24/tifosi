module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Talles",
        {
            id: {type: DataTypes.INTEGER, primaryKey: true},
            name: DataTypes.STRING
        },
        {
            tableName: "talles",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    )

    // Model.associate = (model) => {
        
    // }

    return Model
}