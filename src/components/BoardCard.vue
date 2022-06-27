<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
	<li class="group relative bg-white p-3 shadow rounded-md border-b border-gray-300 hover:bg-gray-50">
		<RouterLink to="#" class="text-sm">card item</RouterLink>
		<button
			class="hidden absolute top-1 right-1 w-8 h-8 bg-gray-50 group-hover:grid place-content-center rounded-md text-gray-600 hover:text-black hover:bg-gray-200"
		>
			✏️
		</button>
	</li>
</template>
