<template>
	<div class="flex flex-col" v-if="usersConnects">
		<div
			class="fixed top-4 left-4 flex items-center space-x-2 py-2 px-4 bg-indigo-500 text-white rounded shadow-lg transition-opacity duration-75 ease-in-out"
		>
			{{ usersConnects }}
		</div>
	</div>
</template>

<script setup>
import {useChatStore} from "@/store/chat.js";
import {storeToRefs} from "pinia";

const chatStore = useChatStore()
const {usersConnects} = storeToRefs(chatStore);
</script>