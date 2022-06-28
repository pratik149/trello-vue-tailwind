<template>
	<button
		type="button"
		@click="openModal"
		class="flex w-full items-center rounded-md bg-white/10 p-2 text-sm font-medium text-white hover:bg-white/20"
	>
		➕ <span class="ml-1"> Add Another List </span>
	</button>

	<TransitionRoot appear :show="isOpen" as="template">
		<Dialog as="div" @close="closeModal">
			<div class="fixed inset-0 z-10 overflow-y-auto">
				<div class="min-h-screen px-4 text-center">
					<TransitionChild
						as="template"
						enter="duration-300 ease-out"
						enter-from="opacity-0"
						enter-to="opacity-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100"
						leave-to="opacity-0"
					>
						<DialogOverlay class="fixed inset-0 bg-black bg-opacity-50" />
					</TransitionChild>

					<span class="inline-block h-screen align-middle" aria-hidden="true"> &#8203; </span>

					<TransitionChild
						as="template"
						enter="duration-300 ease-out"
						enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95"
					>
						<div
							class="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
						>
							<DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
								New List
							</DialogTitle>

							<div class="mt-4">
								<form action="" @submit.prevent="addNewList" class="w-full">
									<input
										v-model="list.title"
										type="text"
										placeholder="Enter Title..."
										class="form-input w-full rounded"
									/>
									<div class="mt-4">
										<div>
											<button
												type="button"
												class="float-left inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
												@click="closeModal"
											>
												Cancel
											</button>
										</div>
										<div>
											<button
												type="submit"
												class="float-right inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
											>
												Create
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup>
import { ref, reactive } from "vue";
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay, DialogTitle } from "@headlessui/vue";
import { useBoardStore } from "@/stores/board";

// Store
const boardStore = useBoardStore();

// Modal Open/Close
const isOpen = ref(false);
function closeModal() {
	isOpen.value = false;
}
function openModal() {
	isOpen.value = true;
}

// List Methods
let list = reactive({
	title: "",
});
function addNewList() {
	boardStore.addList({ title: list.title });
	list.title = "";
	closeModal();
}
</script>
