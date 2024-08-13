module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Provinces_shipment",
        {
            id: {type: DataTypes.INTEGER, primaryKey: true},
            province: DataTypes.STRING,
            home_shipment: DataTypes.INTEGER,
            home_express_shipment: DataTypes.INTEGER,
            branch_shipment: DataTypes.INTEGER,
            branch_express_shipment: DataTypes.INTEGER
        },
        {
            tableName: "provinces_shipment",
            timestamps: false
        }
    )

    return Model
}