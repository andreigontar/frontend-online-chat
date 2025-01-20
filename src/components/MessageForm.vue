<template>
	<div class="flex flex-col">

		<!-- Кнопка для изменения никнейма -->
		<ChangeNickName />

		<!-- Форма для отправки сообщения -->
		<form v-if="nickname" @submit.prevent="handleSubmit" class="bg-gray-800 p-6 rounded-lg w-full flex gap-4">
			<input
				v-model="text"
				type="text"
				placeholder="Type a message"
				required
				class="w-full p-4 border border-gray-600 bg-gray-700 text-white rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-500"
			/>
			<button type="submit" class="p-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out w-1/5">Send</button>
		</form>

		<!-- Форма для ввода никнейма -->
		<NickName v-else />

	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from "@/store/user.js";
import { storeToRefs } from "pinia";
import NickName from "@/components/user/NickName.vue";
import ChangeNickName from "@/components/user/ChangeNickName.vue";

const userStore = useUserStore();
const { nickname } = storeToRefs(userStore);

const text = ref('');

// Установка никнейма из localStorage при монтировании компонента
onMounted(() => {
	nickname.value = userStore.getNicknameFromLocalStorage();
});

/**
 * Функция для обработки отправки сообщения
 */
const handleSubmit = () => {
	const message = {
		id: Date.now(),
		sender: nickname.value,
		time: new Date().toLocaleTimeString(),
		text: text.value,
	};
	// Отправка события 'sendMessage' с объектом сообщения
	emit('sendMessage', message);
	// Очистка поля ввода текста
	text.value = '';
};

const emit = defineEmits(['sendMessage']);
</script>