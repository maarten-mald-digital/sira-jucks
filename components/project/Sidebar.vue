<template>
	<aside class="sidebar py-5">
		<h4>Project: {{ project.title }}</h4>
		<hr />

		<div class="links">
			<NuxtLink :to="{ name: 'projects-id-backlog' }">
				<button>Backlog</button>
			</NuxtLink>
			<NuxtLink :to="{ name: 'projects-id-board' }">
				<button>Board</button>
			</NuxtLink>
		</div>
	</aside>
</template>

<script lang="ts" setup>
const props = defineProps(['project']);
</script>
