<template>
	<div v-if="nickname" class="mt-4 flex pl-6 w-full">
		<button @click="clearNickname" class="p-4 bg-purple-700 text-white rounded-md hover:bg-purple-900 transition duration-300 ease-in-out">Change Nickname</button>
	</div>
</template>

<script setup>
import {useUserStore} from "@/store/user.js";
import {storeToRefs} from "pinia";

const userStore = useUserStore()
const {nickname, nicknameInput} = storeToRefs(userStore)

const clearNickname = () => {
	userStore.clearNicknameFromLocalStorage();
};
</script>