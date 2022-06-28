<template>
	<div class="flex h-screen flex-col bg-blue-600">
		<!-- Navbar -->
		<BoardNav />

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

				<!-- Board Lists -->
				<div class="flex-1 overflow-x-auto">
					<div class="inline-flex h-full items-start space-x-4 px-4 pb-4">
						<div
							v-for="list in lists"
							:list="list"
							:key="list.id"
							@drop="onDrop($event, list.id)"
							class="flex max-h-full w-72 flex-col rounded-md bg-gray-200"
						>
							<!-- List Title -->
							<div class="flex items-center justify-between px-3 py-2">
								<h3 class="text-sm font-semibold text-gray-700">{{ list.title }}</h3>
								<button
									class="grid h-8 w-8 place-content-center rounded-md hover:bg-gray-300"
									@click="removeList(list.id)"
								>
									<XIcon class="h-5 w-5 text-gray-400" />
								</button>
							</div>

							<!-- List Cards -->
							<div class="flex flex-col overflow-hidden pb-3">
								<div ref="listRef" class="flex-1 overflow-y-auto px-3">
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
								<div class="mt-3 px-3">
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
