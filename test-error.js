const WhatsAppNotifier = require('./whatsappClient');

// Buat instance WhatsApp notifier
const notifier = new WhatsAppNotifier();

// Set nomor WhatsApp tujuan
notifier.setTargetNumber("6282119172702");

// Fungsi yang akan menghasilkan error
function buatError() {
    // Simulasi error dengan mencoba mengakses property dari undefined
    const obj = undefined;
    console.log(obj.propertyTidakAda); // Ini akan menghasilkan error
}

// Tangkap semua error yang tidak tertangani
process.on('uncaughtException', async (error) => {
    console.error('Terjadi error:', error);
    await notifier.sendErrorNotification(error);
});

console.log('Program dimulai...');
console.log('Tunggu sebentar untuk scan QR code...');

// Tunggu 10 detik sebelum memulai test error
setTimeout(() => {
    console.log('Membuat error dalam 3 detik...');
    setTimeout(buatError, 3000);
}, 10000);
