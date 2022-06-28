<template>
	<li class="group relative rounded-md border-b border-gray-300 bg-white p-3 shadow hover:bg-gray-50">
		<div>
			<div class="">
				<h5 class="font-semibold text-gray-800">{{ task.title }}</h5>
				<p class="mt-2 max-w-max rounded-sm bg-blue-100 px-2 py-1 text-xs font-semibold text-gray-600">
					{{ task.date ? $dayjs(task.date).format("MMM DD, ddd") : "No Date" }}
				</p>
			</div>
			<div class="absolute top-1 right-1 bottom-1 hidden justify-between group-hover:grid">
				<button type="button" @click="openModal" class="rounded-md bg-gray-50 px-2 hover:bg-gray-100">
					<PencilIcon class="h-4 w-4 text-center text-gray-500" />
				</button>
				<button @click="deleteTask" class="bg-gray-60 rounded-md px-2 hover:bg-gray-100">
					<TrashIcon class="h-4 w-4 text-center text-red-500" />
				</button>
			</div>
			<AddCard v-if="isOpen" :is-open="isOpen" :task="task" :is-edit="true" @close-modal="closeModal" />
		</div>
	</li>
</template>

<script setup>
import { ref } from "vue";
import { useBoardStore } from "@/stores/board";
import AddCard from "./AddCard.vue";
import { TrashIcon, PencilIcon } from "@heroicons/vue/solid";

const props = defineProps({ task: Object, listId: String });

const boardStore = useBoardStore();

// Modal Open/Close Methods
const isOpen = ref(false);
function openModal() {
	isOpen.value = true;
}
function closeModal() {
	isOpen.value = false;
}

// Task Methods
function deleteTask() {
	boardStore.removeItem({ itemId: props.task.id });
}
</script>

<style scoped>
.drag > div {
	transform: rotate(5deg);
}
.ghost {
	background: lightgray;
	border-radius: 6px;
}
.ghost > div {
	visibility: hidden;
}
</style>
