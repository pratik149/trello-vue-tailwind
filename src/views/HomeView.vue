<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
	<main class="flex h-screen flex-col items-center justify-around">
		<div class="max-w-md text-center">
			<h1 class="text-2xl font-semibold text-gray-700">Welcome to Trello Vue</h1>
			<p class="mt-2 text-gray-500">
				A kanban board is an agile project management tool designed to help visualize work, limit
				work-in-progress, and maximize efficiency (or flow).
			</p>
		</div>

		<div>
			<RouterLink
				to="/board"
				class="rounded-lg bg-blue-100 px-4 py-2 text-center text-3xl font-extrabold text-gray-800 transition duration-150 ease-out hover:bg-blue-600 hover:text-white"
			>
				Explore Board
			</RouterLink>
		</div>

		<div>
			<p class="text-center text-gray-600">
				Made with ❤️ by
				<a href="https://github.com/pratik149/" class="text-blue-500 hover:text-blue-600" target="_blank">
					@pratik149
				</a>
			</p>
		</div>
	</main>
</template>
