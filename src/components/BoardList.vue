<template>
	<div class="w-72 bg-gray-200 max-h-full flex flex-col rounded-md">
		<div class="flex items-center justify-between px-3 py-2">
			<h3 class="text-sm font-semibold text-gray-700">{{ list.title }}</h3>
			<button class="hover:bg-gray-300 w-8 h-8 rounded-md grid place-content-center" @click="removeList">
				<XIcon class="h-5 w-5 text-gray-400" />
			</button>
		</div>

		<div class="pb-3 flex flex-col overflow-hidden">
			<div class="px-3 flex-1 overflow-y-auto">
				<Draggable
					v-model="cards"
					group="cards"
					item-key="id"
					class="space-y-3"
					tag="ul"
					drag-class="drag"
					ghost-class="ghost"
					@change="onChange"
				>
					<template #item="{ element }">
						<BoardCard :task="element" :list-id="list.id" />
					</template>
				</Draggable>
			</div>

			<div class="px-3 mt-3">
				<AddCardForm :list-id="list.id" />
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

function removeList() {
	boardStore.removeList({
		listId: props.list.id,
	});
}

function onChange(e) {
	console.log(e);
}
</script>
