<template>
	<button type="button" @click="openModal" class="bg-gray-50 rounded-md hover:bg-gray-100 px-2">
		<PencilIcon class="text-center h-4 w-4 text-gray-500" />
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
							class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
						>
							<DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
								Edit Task
							</DialogTitle>

							<div class="mt-4">
								<form action="" @submit.prevent="updateCard" class="w-full">
									<div>
										<label class="block text-gray-700 text-sm font-bold mb-2" for="title">
											Title
										</label>
										<input
											v-model="task.title"
											type="text"
											name="title"
											autocomplete="off"
											placeholder="Enter Title..."
											class="form-input rounded w-full mb-2"
										/>
									</div>

									<div>
										<label class="block text-gray-700 text-sm font-bold mb-2" for="description">
											Description
										</label>
										<textarea
											v-model="task.description"
											name="description"
											placeholder="Enter Description..."
											class="form-input rounded w-full mb-2"
										/>
									</div>

									<div>
										<label class="block text-gray-700 text-sm font-bold mb-2" for="date">
											Due Date
										</label>
										<input
											v-model="task.date"
											step="1"
											name="date"
											type="datetime-local"
											placeholder="Enter Due Date..."
											class="form-input rounded w-full"
										/>
									</div>

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
												Save
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
import { PencilIcon } from "@heroicons/vue/solid";

const props = defineProps({ task: Object });

const boardStore = useBoardStore();

const isOpen = ref(false);
let error = ref("");

function closeModal() {
	isOpen.value = false;
}
function openModal() {
	isOpen.value = true;
}
let task = reactive({
	title: props.task.title,
	description: props.task.description,
	date: props.task.date,
});

function updateCard() {
	if (!task.title) {
		error.value = "Title field is required";
		return;
	}

	boardStore.updateItem({
		itemId: props.task.id,
		title: task.title,
		description: task.description,
		date: task.date,
	});

	error.value = "";

	closeModal();
}
</script>
