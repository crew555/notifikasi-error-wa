const WhatsAppNotifier = require('./whatsappClient');

// Buat instance WhatsApp notifier
const notifier = new WhatsAppNotifier();

// Set nomor WhatsApp tujuan
notifier.setTargetNumber("6285156512517");

console.log('Program test dimulai...');

// Tunggu hingga client siap
setTimeout(async () => {
    try {
        console.log('Mencoba mengirim pesan test...');
        
        // Buat error buatan
        const error = new Error('Ini adalah pesan error test!');
        
        // Kirim notifikasi error
        await notifier.sendErrorNotification(error);
        
    } catch (err) {
        console.error('Terjadi kesalahan:', err);
    }
}, 15000); // Tunggu 15 detik
