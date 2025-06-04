const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');

class WhatsAppNotifier {
    constructor() {
        this.client = new Client({
            puppeteer: {
                args: ['--no-sandbox']
            },
            authStrategy: new LocalAuth({
                clientId: "whatsapp-error-notifier"
            })
        });
        this.isReady = false;
        this.targetNumber = null;
        this.initialize();
    }initialize() {
        // Handle errors
        this.client.on('auth_failure', (err) => {
            console.error('Error autentikasi:', err);
        });

        this.client.on('disconnected', (reason) => {
            console.log('Client terputus:', reason);
        });

        // Generate QR code for WhatsApp Web authentication
        this.client.on('qr', (qr) => {
            console.log('Silakan scan kode QR ini dengan WhatsApp di HP anda:');
            console.log('Buka WhatsApp -> Menu 3 titik -> Perangkat Tertaut -> Tautkan Perangkat');
            qrcode.generate(qr, { small: true });
        });

        // Handle client ready event
        this.client.on('ready', () => {
            console.log('WhatsApp client siap digunakan!');
            this.isReady = true;
        });

        // Initialize the client
        this.client.initialize();
    }

    setTargetNumber(number) {
        // Format: country code + phone number (e.g., "6281234567890")
        this.targetNumber = number;
    }    async sendErrorNotification(error) {
        console.log('Mencoba mengirim notifikasi error...');
        
        if (!this.isReady) {
            console.log('WhatsApp client belum siap. Mohon tunggu...');
            return;
        }

        if (!this.targetNumber) {
            console.log('Nomor tujuan belum diatur. Silakan atur nomor tujuan terlebih dahulu.');
            return;
        }

        console.log('Mempersiapkan pesan...');
        const message = `⚠️ Error Notification ⚠️\n\n` +
            `Error Message: ${error.message}\n` +
            `Stack Trace: ${error.stack}\n` +
            `Timestamp: ${new Date().toISOString()}`;

        try {
            console.log('Mengirim pesan ke nomor:', this.targetNumber);
            const chatId = this.targetNumber + '@c.us';
            await this.client.sendMessage(chatId, message);
            console.log('Notifikasi error berhasil dikirim!');
        } catch (err) {
            console.error('Gagal mengirim notifikasi WhatsApp:', err);
            console.error('Detail error:', err.message);
            if (err.stack) {
                console.error('Stack trace:', err.stack);
            }
        }
    }
}

module.exports = WhatsAppNotifier;
