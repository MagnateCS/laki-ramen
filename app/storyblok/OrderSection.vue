<script setup>
import { computed } from "vue";

const props = defineProps({ blok: Object });

const titleHtml = computed(() => {
	const title = props.blok?.title?.trim();

	if (!title) {
		return "Order from <br>Home";
	}

	return title.replace(/\n/g, "<br>");
});
</script>

<template>
	<section class="bg-surface py-32" v-editable="blok">
		<div class="mx-auto max-w-screen-xl px-8">
			<div class="grid grid-cols-1 items-center gap-16 md:grid-cols-12">
				<div class="space-y-8 md:col-span-5">
					<span class="block font-label text-xs uppercase tracking-[0.4em] text-secondary">
						{{ blok.eyebrow || "Delivery & Pickup" }}
					</span>
					<h2
						class="font-headline text-5xl italic leading-tight text-primary md:text-7xl"
						v-html="titleHtml"
					/>
					<p class="max-w-md font-body text-lg leading-relaxed text-on-surface/70">
						{{
							blok.description ||
							"The craft of the ramen master, delivered with care. Partner links can be managed directly in Storyblok."
						}}
					</p>
				</div>
				<div class="md:col-span-7">
					<div class="divide-y divide-outline-variant/30 border-y border-outline-variant/30">
						<StoryblokComponent
							v-for="provider in blok.providers || []"
							:key="provider._uid"
							:blok="provider"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
