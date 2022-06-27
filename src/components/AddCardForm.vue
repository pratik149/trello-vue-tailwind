<template>
	<button
		type="button"
		@click="openModal"
		class="flex items-center p-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-300 w-full rounded-md"
	>
		➕ <span class="ml-1"> Add Card </span>
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
							class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
						>
							<DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
								Add Task
							</DialogTitle>

							<div class="mt-4">
								<form action="" @submit.prevent="addNewCard" class="w-full">
									<input
										v-model="task.title"
										type="text"
										placeholder="Enter Title..."
										autocomplete="off"
										class="form-input rounded w-full mb-2"
									/>
									<textarea
										v-model="task.description"
										placeholder="Enter Description..."
										class="form-input rounded w-full mb-2"
									/>
									<input
										v-model="task.date"
										type="datetime-local"
										step="1"
										placeholder="Enter Due Date..."
										class="form-input rounded w-full"
									/>

									<p class="text-red-500 text-sm mt-4 text-center" v-if="error">
										{{ error }}
									</p>

									<div class="mt-4">
										<div>
											<button
												type="button"
												class="float-left inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
												@click="closeModal"
											>
												Cancel
											</button>
										</div>
										<div>
											<button
												type="submit"
												class="float-right inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
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

const props = defineProps({ listId: String });

const boardStore = useBoardStore();

const isOpen = ref(false);

let task = reactive({
	title: "",
	description: "",
	date: "",
});

let error = ref("");

function closeModal() {
	isOpen.value = false;
}
function openModal() {
	isOpen.value = true;
}

function addNewCard() {
	if (!task.title) {
		error.value = "Title field is required";
		return;
	}

	boardStore.addItem({
		listId: props.listId,
		title: task.title,
		description: task.description,
		date: task.date,
	});

	task.title = "";
	task.description = "";
	task.date = "";
	error.value = "";

	closeModal();
}
</script>
