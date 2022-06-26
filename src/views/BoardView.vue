<script setup>
import BoardList from '../components/BoardList.vue'
import BoardNav from '../components/BoardNav.vue'
</script>

<template>
	<div class="flex flex-col h-screen bg-blue-600">
		<BoardNav />

		<main class="flex-1 overflow-hidden">
			<div class="flex flex-col h-full">
				<div class="shrink-0 flex justify-between items-center p-4">
					<h1 class="text-2xl text-white font-bold">Life</h1>
					<div>
						<button class="inline-flex items-center bg-white/10 hover:bg-white/20 px-3 py-2 font-medium text-sm text-white rounded-md">
						<span class="ml-1">⚙️ Settings</span>
						</button>
					</div>
				</div>

				<div class="flex-1 overflow-x-auto">
					<div class="inline-flex h-full items-start px-4 pb-4 space-x-4">
						<BoardList  
							v-for="item in Array.from({length:3})"
						/>

						<div class="w-72">
							<button class="flex items-center bg-white/10 w-full hover:bg-white/20 text-white p-2 text-sm font-medium rounded-md">
								➕
								<span class="ml-1">Add another list</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>
