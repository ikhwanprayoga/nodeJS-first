module.exports = (sequelize, Sequelize) => {
    const Dosen = sequelize.define('dosen', {
        nama: {
            type: Sequelize.STRING
        },
        pangkat: {
            type: Sequelize.STRING
        },
        jabatanId: {
            type: Sequelize.INTEGER,
        }
    })

    Dosen.associate = function (models) {
        Dosen.belongsTo(models.jabatan)
    }

    return Dosen
}