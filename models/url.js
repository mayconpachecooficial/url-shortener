const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Url = sequelize.define('Url', {
    originalUrl: {
        type: DataTypes.STRING(2048),
        allowNull: false,
        field: 'original_url'
    },
    shortenedUrl: {
        type: DataTypes.STRING(10),
        allowNull: false,
        field: 'shortened_url'
    },
    userId: {
        type: DataTypes.INTEGER,
        field: 'user_id'
    },
    deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at'
    }
}, {
    timestamps: true,
    paranoid: true, // Usado para exclusão lógica
    tableName: 'urls'
});

module.exports = Url;
