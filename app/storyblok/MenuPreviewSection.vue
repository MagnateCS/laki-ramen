<script setup>
import { ref } from "vue";

defineProps({ blok: Object });

const sectionRef = ref(null);

function getLinkHref(link) {
	if (!link) {
		return "#";
	}

	return link.cached_url || link.url || link.story?.full_slug || "#";
}

useGsapScope(sectionRef, ({ gsap, ScrollTrigger, scope }) => {
	const header = scope?.querySelector("[data-menu-header]");
	const categories = scope?.querySelectorAll("[data-menu-category]");
	const cta = scope?.querySelector("[data-menu-cta]");

	if (header) {
		gsap.from(header, {
			y: 40,
			opacity: 0,
			duration: 0.9,
			ease: "power3.out",
			scrollTrigger: {
				trigger: header,
				start: "20% 82%",
			},
		});
	}

	if (categories?.length) {
		gsap.from(categories, {
			y: 56,
			opacity: 0,
			duration: 1,
			stagger: 0.18,
			ease: "power3.out",
			scrollTrigger: {
				trigger: scope,
				start: "20% 72%",
			},
		});
	}

	if (cta) {
		gsap.from(cta, {
			y: 24,
			opacity: 0,
			duration: 0.8,
			ease: "power2.out",
			scrollTrigger: {
				trigger: cta,
				start: "top 90%",
			},
		});
	}

	ScrollTrigger.refresh();
});
</script>

<template>
	<section ref="sectionRef" class="bg-surface-container-low py-32" v-editable="blok">
		<div class="mx-auto max-w-screen-2xl px-8">
			<div class="mb-24 flex flex-col justify-between gap-8 md:flex-row md:items-baseline" data-menu-header>
				<h2 class="font-headline text-5xl italic text-primary md:text-7xl">
					{{ blok.title || "Taste of Tradition" }}
				</h2>
				<div class="h-px w-full bg-outline-variant/30 md:w-1/2" />
			</div>

			<div class="grid grid-cols-1 gap-24 md:grid-cols-2">
				<StoryblokComponent
					v-for="category in blok.categories || []"
					:key="category._uid"
					:blok="category"
					data-menu-category
				/>
			</div>

			<div class="mt-24 text-center" v-if="blok.cta_label" data-menu-cta>
				<a
					:href="getLinkHref(blok.cta_link)"
					class="inline-block border-b-2 border-primary pb-2 font-label text-sm uppercase tracking-widest transition-all hover:border-secondary hover:text-secondary"
				>
					{{ blok.cta_label }}
				</a>
			</div>
		</div>
	</section>
</template>
