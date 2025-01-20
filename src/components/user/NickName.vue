<template>
	<form @submit.prevent="setNickname" class="bg-gray-800 p-6 rounded-lg w-full flex gap-4">
		<input
			v-model="nicknameInput"
			type="text"
			placeholder="Enter your nickname"
			required
			class="w-full p-4 border border-gray-600 bg-gray-700 text-white rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-500"
		/>
		<button type="submit" class="p-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out w-1/5">Set Nickname</button>
	</form>
</template>

<script setup>
import {ref} from "vue";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/store/user.js";

const userStore = useUserStore()
const {nickname, nicknameInput} = storeToRefs(userStore)

const setNickname = () => {
	userStore.saveNicknameToLocalStorage();
};

</script>