<template>
	<div class="flex flex-col h-screen bg-blue-600">
		<!-- Navbar -->
		<BoardNav />

		<!-- Board Screen -->
		<main class="flex-1 overflow-hidden">
			<div class="flex flex-col h-full">
				<!-- Board Title -->
				<div class="shrink-0 flex justify-between items-center p-4">
					<h1 class="text-2xl text-white font-bold">Wall-E</h1>
					<div>
						<button
							class="inline-flex items-center bg-white/10 hover:bg-white/20 px-3 py-2 font-medium text-sm text-white rounded-md"
						>
							<CogIcon class="h-5 w-5 text-gray-300" />
							<span class="ml-2"> Settings</span>
						</button>
					</div>
				</div>

				<!-- Board Lists -->
				<div class="flex-1 overflow-x-auto">
					<div class="inline-flex h-full items-start px-4 pb-4 space-x-4">
						<div
							v-for="list in lists"
							:list="list"
							:key="list.id"
							@drop="onDrop($event, list.id)"
							class="w-72 bg-gray-200 max-h-full flex flex-col rounded-md"
						>
							<!-- List Title -->
							<div class="flex items-center justify-between px-3 py-2">
								<h3 class="text-sm font-semibold text-gray-700">{{ list.title }}</h3>
								<button
									class="hover:bg-gray-300 w-8 h-8 rounded-md grid place-content-center"
									@click="removeList(list.id)"
								>
									<XIcon class="h-5 w-5 text-gray-400" />
								</button>
							</div>

							<!-- List Cards -->
							<div class="pb-3 flex flex-col overflow-hidden">
								<div ref="listRef" class="px-3 flex-1 overflow-y-auto">
									<Draggable
										v-model="list.items"
										group="cards"
										item-key="id"
										class="space-y-3"
										tag="ul"
										drag-class="drag"
										ghost-class="ghost"
										@dragstart="startDrag"
									>
										<template #item="{ element }">
											<BoardCard :task="element" :list-id="list.id" />
										</template>
									</Draggable>
								</div>

								<!-- Add Card -->
								<div class="px-3 mt-3">
									<AddCardForm :list-id="list.id" @created="onCardCreated()" />
								</div>
							</div>
						</div>

						<!-- Add List -->
						<div class="w-72">
							<AddListForm />
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup>
// General
import { ref } from "vue";
import Draggable from "vuedraggable";

// Components
import BoardNav from "../components/BoardNav.vue";
import BoardCard from "../components/BoardCard.vue";
import AddListForm from "../components/AddListForm.vue";
import AddCardForm from "../components/AddCardForm.vue";

// Store
import { useBoardStore } from "@/stores/board";

// Icons
import { CogIcon } from "@heroicons/vue/solid";
import { XIcon } from "@heroicons/vue/solid";

// Utils
import { getIndexOfItemById } from "../utils/board";

// Data
const boardStore = useBoardStore();
const lists = boardStore.lists;

// Methods
function startDrag(evt) {
	evt.dataTransfer.dropEffect = "move";
	evt.dataTransfer.effectAllowed = "move";

	evt.dataTransfer.setData("itemID", evt.srcElement.__draggable_context.element.id);
	evt.dataTransfer.setData("oldIndex", evt.srcElement.__draggable_context.index);
}

function onDrop(evt, listId) {
	const itemID = evt.dataTransfer.getData("itemID");

	const fromList = boardStore.getListByItemId(itemID);
	const oldIndex = evt.dataTransfer.getData("oldIndex");

	const toList = boardStore.getListById(listId);
	const newIndex = getIndexOfItemById(lists, itemID);

	boardStore.moveItem([fromList.id, oldIndex, toList.id, newIndex]);
}

function removeList(listId) {
	boardStore.removeList({
		listId: listId,
	});
}

// Scroll down to Newly created Card
const listRef = ref();
function onCardCreated() {
	listRef.value.scrollTop = listRef.value.scrollHeight;
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
