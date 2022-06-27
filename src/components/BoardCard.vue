<template>
	<li class="group relative bg-white p-3 shadow rounded-md border-b border-gray-300 hover:bg-gray-50">
		<div>
			<div>
				<h5 class="font-semibold">{{ task.title }}</h5>
				<p>{{ task.date }}</p>
			</div>
			<div class="hidden absolute top-1 right-1 group-hover:grid">
				<EditCardForm :task="task" />
				<button
					@click="deleteTask"
					class="w-8 h-8 bg-gray-50 place-content-center rounded-md text-gray-600 hover:text-black hover:bg-gray-200"
				>
					❌
				</button>
			</div>
		</div>
	</li>
</template>

<script setup>
import { useBoardStore } from "@/stores/board";
import EditCardForm from "./EditCardForm.vue";
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
