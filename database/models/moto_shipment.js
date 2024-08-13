module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Moto_shipment",
        {
            id: {type: DataTypes.INTEGER, primaryKey: true},
            price: DataTypes.INTEGER
        },
        {
            tableName: "moto_shipment",
            timestamps: false
        }
    )

    return Model
}