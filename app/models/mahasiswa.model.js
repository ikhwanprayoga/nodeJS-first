module.exports = (sequelize, Sequelize) => {
    const Mahasiswa = sequelize.define('mahasiswa', {
        nim:{
            type: Sequelize.STRING,
        },
        nama: {
            type: Sequelize.STRING
        },
        alamat: {
            type: Sequelize.STRING
        },
        foto: {
            type: Sequelize.STRING
        },
        poin: {
            type: Sequelize.BIGINT
        }
    })

    return Mahasiswa
}