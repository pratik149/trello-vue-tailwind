<script setup>
import BoardCard from './BoardCard.vue'
</script>

<template>
	<div
		class="w-72 bg-gray-200 max-h-full flex flex-col rounded-md"
	>
		<div class="flex items-center justify-between px-3 py-2">
			<h3 class="text-sm font-semibold text-gray-700">Backlog</h3>
			<button class="hover:bg-gray-300 w-8 h-8 rounded-md grid place-content-center">
				⚙️
			</button>
		</div>

		<div class="pb-3 flex flex-col overflow-hidden">
		<div class="px-3 flex-1 overflow-y-auto">
			<ul class="space-y-3">
				<BoardCard 
					v-for="item in Array.from({length: 7})"
				/>
			</ul>
		</div>

		<div class="px-3 mt-3">
			<button class="flex items-center p-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-300 w-full rounded-md">
				➕
				<span class="ml-1">Add card</span>
			</button>
		</div>
		</div>
	</div>
</template>