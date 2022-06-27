<template>
	<div class="w-72 bg-gray-200 max-h-full flex flex-col rounded-md">
		<div class="flex items-center justify-between px-3 py-2">
			<h3 class="text-sm font-semibold text-gray-700">{{ list.title }}</h3>
			<button class="hover:bg-gray-300 w-8 h-8 rounded-md grid place-content-center" @click="removeList">
				<XIcon class="h-5 w-5 text-gray-400" />
			</button>
		</div>

		<div class="pb-3 flex flex-col overflow-hidden">
			<div ref="listRef" class="px-3 flex-1 overflow-y-auto">
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

			<div class="px-3 mt-3">
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
