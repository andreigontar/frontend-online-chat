<template>

	<div class="flex h-screen text-gray-800">
		<div class="flex flex-col flex-auto bg-gray-800">
			<div class="flex flex-col flex-auto flex-shrink-0 h-full p-4">
				<!-- Компонент для отображения списка сообщений -->
				<MessageList />
				<!-- Компонент для формы отправки сообщений -->
				<MessageForm @sendMessage="send" />
			</div>
		</div>
	</div>

	<!-- Компоненты для уведомлений о состоянии соединения и подключении пользователей -->
	<IsConnected />
	<UsersConnects />
</template>

<script setup>
import { onMounted } from 'vue';
import { useChatStore } from '@/store/chat.js';
import MessageList from './MessageList.vue';
import MessageForm from './MessageForm.vue';
import IsConnected from "@/components/notifications/IsConnected.vue";
import UsersConnects from "@/components/notifications/UsersConnects.vue";

const chatStore = useChatStore();

const { sendMessage, initializeWebSocket } = chatStore;

/**
 * Функция для отправки сообщения
 * @param {Object} message - Сообщение для отправки
 */
const send = (message) => {
	sendMessage(message);
};

// Инициализация WebSocket соединения при монтировании компонента
onMounted(() => {
	initializeWebSocket();
});
</script>

<style>
@keyframes fade {
	0% { opacity: 0; }
	100% { opacity: 1; }
}
</style>