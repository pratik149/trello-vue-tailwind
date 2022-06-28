<template>
	<div class="flex h-screen flex-col bg-blue-600">
		<!-- TheNavbar -->
		<TheNavbar />

		<!-- Board Screen -->
		<main class="flex-1 overflow-hidden">
			<div class="flex h-full flex-col">
				<!-- Board Title -->
				<div class="flex shrink-0 items-center justify-between p-4">
					<h1 class="text-2xl font-bold text-white">Wall-E</h1>
					<div>
						<button
							class="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20"
						>
							<CogIcon class="h-5 w-5 text-gray-300" />
							<span class="ml-2"> Settings</span>
						</button>
					</div>
				</div>

				<div class="flex-1 overflow-x-auto">
					<div class="inline-flex h-full items-start space-x-4 px-4 pb-4">
						<!-- Board Lists -->
						<TheList
							v-for="list in lists"
							:key="list.id"
							:list="list"
							@on-start="onDragStart"
							@on-drop="onDragDrop"
						/>

						<!-- Add List -->
						<div class="w-72">
							<AddList />
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup>
// Components
import TheNavbar from "../components/TheNavbar.vue";
import TheList from "../components/TheList.vue";
import AddList from "../components/AddList.vue";

// Utils
import { getIndexOfItemById } from "../utils/board";

// Icons
import { CogIcon } from "@heroicons/vue/solid";

// Store
import { useBoardStore } from "@/stores/board";

// Data
const boardStore = useBoardStore();
const lists = boardStore.lists;

// Drag n' Drop Methods
function onDragStart({ evt }) {
	evt.dataTransfer.dropEffect = "move";
	evt.dataTransfer.effectAllowed = "move";

	evt.dataTransfer.setData("itemID", evt.srcElement.__draggable_context.element.id);
	evt.dataTransfer.setData("oldIndex", evt.srcElement.__draggable_context.index);
}

function onDragDrop({ evt, listId }) {
	const itemID = evt.dataTransfer.getData("itemID");

	const fromList = boardStore.getListByItemId(itemID);
	const oldIndex = evt.dataTransfer.getData("oldIndex");

	const toList = boardStore.getListById(listId);
	const newIndex = getIndexOfItemById(lists, itemID);

	boardStore.moveItem([fromList.id, oldIndex, toList.id, newIndex]);
}
</script>

<style scoped>
::-webkit-scrollbar {
	width: 10px;
	height: 10px;
}
::-webkit-scrollbar-thumb {
	background: #9ca3af;
	border-radius: 6px;
}
</style>
