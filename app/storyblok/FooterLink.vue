<script setup>
defineProps({ blok: Object });

function getLinkHref(link) {
	if (!link) {
		return "#";
	}

	return link.cached_url || link.url || link.story?.full_slug || "#";
}
</script>

<template>
	<a
		class="font-body text-sm uppercase tracking-widest text-stone-600 underline decoration-1 underline-offset-4 transition-colors hover:text-[#B51A1E] dark:text-stone-400"
		:href="getLinkHref(blok.link)"
		v-editable="blok"
	>
		{{ blok.label || "Link" }}
	</a>
</template>
