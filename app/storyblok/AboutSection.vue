<script setup>
import { computed } from "vue";

const props = defineProps({ blok: Object });

const imageUrl = computed(() => props.blok?.image?.filename || "");
const imageAlt = computed(
	() => props.blok?.image?.alt || props.blok?.image_alt || props.blok?.title || "About image",
);
const paragraphs = computed(() =>
	(props.blok?.description || "")
		.split(/\n{2,}/)
		.map((paragraph) => paragraph.trim())
		.filter(Boolean),
);
</script>

<template>
	<section class="bg-surface px-8 py-32" v-editable="blok">
		<div class="mx-auto grid max-w-screen-xl grid-cols-1 items-center gap-16 md:grid-cols-12">
			<div class="relative md:col-span-5">
				<div class="aspect-[4/5] overflow-hidden bg-surface-container">
					<img
						v-if="imageUrl"
						:src="imageUrl"
						:alt="imageAlt"
						class="h-full w-full object-cover grayscale-[0.2]"
					/>
				</div>
			</div>
			<div class="space-y-10 md:col-span-7">
				<div class="space-y-4">
					<span class="block font-label text-xs uppercase tracking-[0.4em] text-secondary">
						{{ blok.eyebrow || "Our Philosophy" }}
					</span>
					<h2 class="font-headline text-4xl italic leading-tight text-primary md:text-6xl">
						{{ blok.title || "Bringing the Passion and Flavor of Japan to the World" }}
					</h2>
				</div>
				<div class="max-w-xl space-y-6 font-body text-lg leading-relaxed text-on-surface/80">
					<p v-for="(paragraph, index) in paragraphs" :key="index" class="m-0">
						{{ paragraph }}
					</p>
					<p v-if="!paragraphs.length" class="m-0">
						Our story begins with the pursuit of the perfect chicken paitan broth. Every bowl
						balances Japanese tradition with a modern sense of precision.
					</p>
				</div>
			</div>
		</div>
	</section>
</template>
