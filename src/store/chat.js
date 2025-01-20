import { ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useWebSocketStore } from '@/store/wsStore.js';

/**
 * Хранилище чата
 * Это хранилище управляет сообщениями чата и WebSocket соединением для обеспечения реального времени общения.
 */
export const useChatStore = defineStore('chat', () => {
    const wsStore = useWebSocketStore();
    const { ws } = storeToRefs(wsStore);

    // Хранение уведомлений о подключении пользователей
    const usersConnects = ref(null);

    // Хранения сообщений чата, инициализируется из localStorage
    const messages = ref(JSON.parse(localStorage.getItem('messages')) || []);

    /**
     * Добавить новое сообщение в список сообщений и сохранить его в localStorage.
     * @param {Object} message - Объект сообщения для добавления.
     */
    const addMessage = (message) => {
        messages.value.push(message);
        localStorage.setItem('messages', JSON.stringify(messages.value));
    };

    /**
     * Инициализировать WebSocket соединение и установить обработчик сообщений.
     */
    const initializeWebSocket = () => {
        wsStore.connectWebSocket(`ws://${import.meta.env.VITE_APP_SERVER}`);

        ws.value.onmessage = (event) => {
            const message = JSON.parse(event.data);

            // Обработка уведомлений о подключении/отключении пользователей
            if (message?.isNotification) {
                usersConnects.value = message.text;
                setTimeout(() => {
                    usersConnects.value = null;
                }, 500);
            } else {
                addMessage(message);
            }
        };
    };

    /**
     * Отправить сообщение через WebSocket соединение.
     * @param {Object} message - Объект сообщения для отправки.
     */
    const sendMessage = (message) => {
        wsStore.sendMessage(message);
    };

    /**
     * Обновить статус соединения (в текущем коде не используется).
     * @param {String} status - Новый статус соединения.
     */
    const updateConnectionStatus = (status) => {
        connectionStatus.value = status; // Примечание: connectionStatus не определен в этом коде
    };

    return { messages, addMessage, updateConnectionStatus, initializeWebSocket, sendMessage, usersConnects };
});