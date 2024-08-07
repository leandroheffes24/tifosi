module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Print_price",
        {
            id: {type: DataTypes.INTEGER, primaryKey: true},
            price: DataTypes.INTEGER
        },
        {
            tableName: "print_price",
            timestamps: false
        }
    )

    return Model
}