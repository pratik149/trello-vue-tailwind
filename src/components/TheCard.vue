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
				<EditCard :task="task" />
				<button @click="deleteTask" class="bg-gray-60 rounded-md px-2 hover:bg-gray-100">
					<TrashIcon class="h-4 w-4 text-center text-red-500" />
				</button>
			</div>
		</div>
	</li>
</template>

<script setup>
import { useBoardStore } from "@/stores/board";
import EditCard from "./EditCard.vue";
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
