<script setup>
defineProps({ blok: Object });
</script>

<template>
	<article class="group cursor-pointer space-y-0" v-editable="blok">
		<div class="mb-4 flex items-end justify-between">
			<h4 class="font-headline text-3xl transition-colors hover:text-secondary">
				{{ blok.name || "Menu Item" }}
			</h4>
			<span class="font-body text-xl text-primary">{{ blok.price || "$0" }}</span>
		</div>
		<p class="max-w-md font-body text-sm text-on-surface/60">
			{{ blok.description || "Add a short item description in Storyblok." }}
		</p>
	</article>
</template>
