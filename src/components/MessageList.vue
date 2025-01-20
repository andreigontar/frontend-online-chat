<template>

	<div ref="messageContainer" class="flex flex-col h-full overflow-x-auto mb-4 scrollbar-thin">
		<div class="flex flex-col h-full">
			<div class="grid grid-cols-12 gap-y-2">
				<div ref="messageItem" v-for="message in messages" :key="message.id" class="col-start-6 col-end-13 p-3 scrollbar-thin">
					<div class="flex items-center justify-start flex-row-reverse">
						<div class="flex items-center justify-center h-10 text-gray-500">
							{{ message.sender }}
						</div>
						<div class="relative mr-3 text-sm bg-indigo-600 py-2 px-4 shadow rounded-lg">
							<div class="text-white">{{ message.text }}</div>
							<div class="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">{{ message.time }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script setup>
import { useChatStore } from "@/store/chat.js";
import { storeToRefs } from "pinia";
import { onMounted, watch, ref, nextTick } from "vue";

const chatStore = useChatStore()
const { messages } = storeToRefs(chatStore)

// Ссылки на элементы DOM
const messageContainer = ref(null);
const messageItem = ref(null);

// Функция для прокрутки контейнера к низу
const scrollToBottom = () => {
	if (messageContainer.value) messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
};

// Прокрутка к низу при монтировании компонента
onMounted(() => {
	scrollToBottom();
});

// Прокрутка к низу при изменении списка сообщений
watch(messages.value, async () => {
	await nextTick()
	scrollToBottom();
});

</script>

<style>
/* Стили для тонкой полосы прокрутки */
.scrollbar-thin {
	scrollbar-width: thin;
}

.scrollbar-thin::-webkit-scrollbar {
	width: 8px;
	background-color: #1f2937;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
	background-color: #4b5563;
	border-radius: 10px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
	background-color: #6b7280;
}
</style>