module.exports = (sequelize, Sequelize) => {
    const Jabatan = sequelize.define('jabatan', {
        nama: {
            type: Sequelize.STRING
        }
    })

    Jabatan.associate = (models) => {
        Jabatan.hasMany(models.dosen)
    }

    return Jabatan
}