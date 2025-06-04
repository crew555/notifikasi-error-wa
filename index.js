const WhatsAppNotifier = require('./whatsappClient');

// Create WhatsApp notifier instance
const notifier = new WhatsAppNotifier();

// Set your target WhatsApp number
notifier.setTargetNumber("6285156512517");

// Override the default error handler
process.on('uncaughtException', async (error) => {
    console.error('Uncaught Exception:', error);
    await notifier.sendErrorNotification(error);
});

// Fungsi contoh yang akan menghasilkan error
function testErrorNotification() {
    // Simulasi operasi asynchronous
    setTimeout(() => {
        throw new Error('Ini adalah error percobaan!');
    }, 5000); // Tunggu 5 detik sebelum menghasilkan error
}

// Eksekusi utama
console.log('Memulai aplikasi...');
console.log('Silakan scan kode QR dengan WhatsApp saat muncul...');
console.log('Error percobaan akan dijalankan dalam 5 detik...');

// Run the test after giving some time for WhatsApp client to initialize
setTimeout(testErrorNotification, 10000);
