<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
	<header class="shrink-0 flex justify-between bg-white px-4 py-3">
		<RouterLink class="text-2xl font-black tracking-tight" to="/">Simply Trello</RouterLink>
		<nav>
			<RouterLink class="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100" to="#">My boards</RouterLink>
			<button class="ml-3">
				<img
					src="@/assets/img/user.png"
					alt="User Avatar"
					class="h-9 w-9 inline rounded-full"
					width="36"
					height="36"
				/>
			</button>
		</nav>
	</header>
</template>
