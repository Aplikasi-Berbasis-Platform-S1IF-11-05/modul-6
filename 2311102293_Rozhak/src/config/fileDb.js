const path = require('path');
const fs = require('fs');

const DATA_PATH = path.join(__dirname, '../../data/products.json');

/**
 * Membaca data produk dari penyimpanan JSON lokal.
 *
 * Jika file belum tersedia, fungsi akan membuat file kosong terlebih dahulu
 * agar proses pembacaan berikutnya tetap konsisten.
 *
 * @returns {Array<Object>} Daftar produk yang tersimpan.
 */
const readData = () => {
    try {
        if (!fs.existsSync(DATA_PATH)) {
            fs.writeFileSync(DATA_PATH, JSON.stringify([]));
        }
        const data = fs.readFileSync(DATA_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('[DB ERROR] Gagal membaca data:', error.message);
        return [];
    }
};

/**
 * Menulis data produk ke penyimpanan JSON lokal.
 *
 * @param {Array<Object>} data - Daftar produk yang akan disimpan.
 * @returns {void}
 * @throws {Error} Melempar galat ketika proses penyimpanan gagal.
 */
const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('[DB ERROR] Gagal menulis data:', error.message);
        throw new Error('Gagal menyimpan data ke server');
    }
};

module.exports = {
    readData,
    writeData
};