import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * Хранилище WebSocket
 * Это хранилище управляет состоянием WebSocket соединения и позволяет отправлять сообщения через WebSocket.
 */
export const useWebSocketStore = defineStore('websocket', () => {
    // Реактивная переменная для хранения экземпляра WebSocket
    const ws = ref(null);
    // Статус соединения
    const connectionStatus = ref('disconnected');

    /**
     * Установить соединение WebSocket
     * @param {string} url - URL для подключения WebSocket
     */
    const connectWebSocket = (url) => {
        ws.value = new WebSocket(url);

        // Обработчик события открытия соединения
        ws.value.onopen = () => {
            connectionStatus.value = 'connected';
        };

        // Обработчик события закрытия соединения
        ws.value.onclose = () => {
            connectionStatus.value = 'disconnected';
            // Попытка повторного подключения через 1 секунду
            setTimeout(() => connectWebSocket(url), 1000);
        };
    };

    /**
     * Отправить сообщение через WebSocket
     * @param {Object} message - Объект сообщения для отправки
     */
    const sendMessage = (message) => {
        if (ws.value && ws.value.readyState === WebSocket.OPEN) {
            ws.value.send(JSON.stringify(message));
        }
    };

    return {
        ws,
        connectionStatus,
        connectWebSocket,
        sendMessage
    };
});