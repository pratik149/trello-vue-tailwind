<template>
	<main class="py-20">
		<div class="max-w-md text-center mx-auto">
			<h1 class="text-2xl font-semibold text-gray-700">Welcome to Trello Clone</h1>
			<p class="text-gray-500 mt-2">
				A kanban board is an agile project management tool designed to help visualize work, limit
				work-in-progress, and maximize efficiency (or flow).
			</p>
		</div>
		<div class="flex justify-center mt-4">
			<router-link
				to="/board"
				class="text-center text-3xl font-extrabold text-gray-800 rounded-lg bg-blue-100 px-4 py-2 hover:bg-blue-600 hover:text-white transition ease-out duration-150"
			>
				Trello Board
			</router-link>
		</div>
	</main>
</template>
