<template>
	<div class="flex flex-col h-screen bg-blue-600">
		<BoardNav />

		<main class="flex-1 overflow-hidden">
			<div class="flex flex-col h-full">
				<div class="shrink-0 flex justify-between items-center p-4">
					<h1 class="text-2xl text-white font-bold">Life</h1>
					<div>
						<button
							class="inline-flex items-center bg-white/10 hover:bg-white/20 px-3 py-2 font-medium text-sm text-white rounded-md"
						>
							<span class="ml-1">⚙️ Settings</span>
						</button>
					</div>
				</div>

				<div class="flex-1 overflow-x-auto">
					<div class="inline-flex h-full items-start px-4 pb-4 space-x-4">
						<BoardList
							v-for="list in lists"
							:list="list"
							:key="list.id"
							class="w-72 bg-gray-200 max-h-full flex flex-col rounded-md"
						/>

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
import BoardNav from "../components/BoardNav.vue";
import BoardList from "../components/BoardList.vue";
import AddListForm from "../components/AddListForm.vue";
import { useBoardStore } from "@/stores/board";

const boardStore = useBoardStore();
const lists = boardStore.lists;
</script>
