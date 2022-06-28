<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
	<header class="flex shrink-0 justify-between bg-white px-4 py-3">
		<RouterLink class="text-2xl font-black tracking-tight" to="/">Trello Vue</RouterLink>
		<nav>
			<RouterLink class="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100" to="/">Home</RouterLink>
			<button class="ml-3">
				<img
					src="@/assets/img/user.png"
					alt="User Avatar"
					class="inline h-9 w-9 rounded-full"
					width="36"
					height="36"
				/>
			</button>
		</nav>
	</header>
</template>
