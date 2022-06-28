<template>
	<div class="flex max-h-full w-72 flex-col rounded-md bg-gray-200">
		<div class="flex items-center justify-between px-3 py-2">
			<h3 class="text-sm font-semibold text-gray-700">{{ list.title }}</h3>
			<button class="grid h-8 w-8 place-content-center rounded-md hover:bg-gray-300" @click="removeList">
				<XIcon class="h-5 w-5 text-gray-400" />
			</button>
		</div>

		<div class="flex flex-col overflow-hidden pb-3">
			<div ref="listRef" class="flex-1 overflow-y-auto px-3">
				<Draggable
					v-model="cards"
					group="cards"
					item-key="id"
					class="space-y-3"
					tag="ul"
					drag-class="drag"
					ghost-class="ghost"
					@change="onChange"
					@move="onMove"
				>
					<template #item="{ element }">
						<BoardCard :task="element" :list-id="list.id" />
					</template>
				</Draggable>
			</div>

			<div class="mt-3 px-3">
				<AddCardForm :list-id="list.id" @created="onCardCreated()" />
			</div>
		</div>
	</div>
</template>

<script setup>
import BoardCard from "./BoardCard.vue";
import AddCardForm from "./AddCardForm.vue";
import { useBoardStore } from "@/stores/board";
import Draggable from "vuedraggable";
import { ref } from "vue";
import { XIcon } from "@heroicons/vue/solid";

const boardStore = useBoardStore();
const props = defineProps({ list: Object });
const cards = ref(props.list.items);
const listRef = ref();

// watch(
// 	() => props.list.items,
// 	(newCards) => (cards.value = newCards)
// );

function removeList() {
	boardStore.removeList({
		listId: props.list.id,
	});
}

function onChange(e) {
	console.log(e);
}
function onMove(e) {
	console.log(e);
	// console.log(e.dragged.__draggable_context.index);
	// console.log(e.from.__draggable_component__.context.index);
	// console.log(e.to.__draggable_component__.context.index);
	// console.log(e.target.__draggable_component__.context.index);
}
function onCardCreated() {
	listRef.value.scrollTop = listRef.value.scrollHeight;
}
</script>

<style scoped>
::-webkit-scrollbar {
	width: 7px;
}
::-webkit-scrollbar-track {
	background: #d1d5db;
	border-radius: 4px;
}
::-webkit-scrollbar-thumb {
	background: #9ca3af;
	border-radius: 4px;
}
</style>
