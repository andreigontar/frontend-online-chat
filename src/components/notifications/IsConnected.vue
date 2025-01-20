<template>
	<div class="flex flex-col" v-if="connectionStatus === 'disconnected'">
		<div
			class="fixed top-4 right-4 flex items-center space-x-2 py-2 px-4 bg-indigo-500 text-white rounded shadow-lg transition-opacity duration-300 ease-in-out animate-fade"
		>
			<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>

			<span>Connection lost. Trying to reconnect</span>
		</div>
	</div>
</template>

<script setup>
import {useWebSocketStore} from "@/store/wsStore.js";
import {storeToRefs} from "pinia";

const wsStore = useWebSocketStore();

const {connectionStatus} = storeToRefs(wsStore);
</script>