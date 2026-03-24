<script setup>
import { computed } from "vue";

const props = defineProps({ blok: Object });

const imageUrl = computed(() => props.blok?.image?.filename || "");
const imageAlt = computed(
	() => props.blok?.image?.alt || props.blok?.image_alt || props.blok?.title || "Menu category image",
);
const imageClass = computed(() =>
	props.blok?.image_shape === "square"
		? "aspect-square max-w-md ml-auto"
		: "aspect-video",
);
</script>

<template>
	<section
		class="space-y-12"
		:class="{ 'md:mt-32': blok.staggered }"
		v-editable="blok"
	>
		<div class="flex items-center gap-6">
			<span class="font-headline text-4xl italic text-secondary">
				{{ blok.index_label || "01" }}
			</span>
			<h3 class="font-headline text-4xl uppercase tracking-tighter">
				{{ blok.title || "Category" }}
			</h3>
		</div>

		<div class="space-y-16">
			<StoryblokComponent
				v-for="item in blok.items || []"
				:key="item._uid"
				:blok="item"
			/>
		</div>

		<div class="pt-8" v-if="imageUrl">
			<div
				class="overflow-hidden bg-surface-container"
				:class="imageClass"
			>
				<img :src="imageUrl" :alt="imageAlt" class="h-full w-full object-cover" />
			</div>
		</div>
	</section>
</template>
