<template>
	<li class="group relative bg-white p-3 shadow rounded-md border-b border-gray-300 hover:bg-gray-50">
		<div>
			<div class="">
				<h5 class="font-semibold text-gray-800">{{ task.title }}</h5>
				<p class="max-w-max rounded-sm px-2 py-1 bg-blue-100 mt-2 text-xs text-gray-600 font-semibold">
					{{ task.date ? $dayjs(task.date).format("MMM DD, ddd") : "No Date" }}
				</p>
			</div>
			<div class="hidden absolute top-1 right-1 bottom-1 group-hover:grid justify-between">
				<EditCardForm :task="task" />
				<button @click="deleteTask" class="bg-gray-60 rounded-md hover:bg-gray-100 px-2">
					<TrashIcon class="text-center h-4 w-4 text-red-500" />
				</button>
			</div>
		</div>
	</li>
</template>

<script setup>
import { useBoardStore } from "@/stores/board";
import EditCardForm from "./EditCardForm.vue";
import { TrashIcon } from "@heroicons/vue/solid";
const props = defineProps({ task: Object, listId: String });

const boardStore = useBoardStore();

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
