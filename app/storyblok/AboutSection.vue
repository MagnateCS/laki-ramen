<script setup>
import { computed, ref } from "vue";

const props = defineProps({ blok: Object });
const sectionRef = ref(null);

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

useGsapScope(sectionRef, ({ gsap, ScrollTrigger, scope }) => {
	const image = scope?.querySelector("[data-about-image]");
	const reveals = scope?.querySelectorAll("[data-about-reveal]");

	if (image) {
		gsap.from(image, {
			y: 56,
			scale: 0.96,
			opacity: 0,
			duration: 1,
			ease: "power3.out",
			scrollTrigger: {
				trigger: image,
				start: "50% 82%",
			},
		});
	}

	if (reveals?.length) {
		gsap.from(reveals, {
			y: 36,
			opacity: 0,
			duration: 0.9,
			stagger: 0.12,
			ease: "power3.out",
			scrollTrigger: {
				trigger: scope,
				start: "50% 78%",
			},
		});
	}

	ScrollTrigger.refresh();
});
</script>

<template>
	<section ref="sectionRef" class="bg-surface px-8 py-32" v-editable="blok">
		<div class="mx-auto grid max-w-screen-xl grid-cols-1 items-center gap-16 md:grid-cols-12">
			<div class="relative md:col-span-5">
				<div class="aspect-[4/5] overflow-hidden bg-surface-container" data-about-image>
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
					<span class="block font-label text-xs uppercase tracking-[0.4em] text-secondary" data-about-reveal>
						{{ blok.eyebrow || "Our Philosophy" }}
					</span>
					<h2 class="font-headline text-4xl italic leading-tight text-primary md:text-6xl" data-about-reveal>
						{{ blok.title || "Bringing the Passion and Flavor of Japan to the World" }}
					</h2>
				</div>
				<div class="max-w-xl space-y-6 font-body text-lg leading-relaxed text-on-surface/80">
					<p v-for="(paragraph, index) in paragraphs" :key="index" class="m-0" data-about-reveal>
						{{ paragraph }}
					</p>
					<p v-if="!paragraphs.length" class="m-0" data-about-reveal>
						Our story begins with the pursuit of the perfect chicken paitan broth. Every bowl
						balances Japanese tradition with a modern sense of precision.
					</p>
				</div>
			</div>
		</div>
	</section>
</template>
