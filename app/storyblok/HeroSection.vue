<script setup>
import { computed, ref } from "vue";

const props = defineProps({ blok: Object });
const sectionRef = ref(null);

const imageUrl = computed(() => props.blok?.image?.filename || "");
const imageAlt = computed(
	() => props.blok?.image?.alt || props.blok?.image_alt || props.blok?.title || "Hero image",
);

useGsapScope(sectionRef, ({ gsap, ScrollTrigger, scope }) => {
	const media = scope?.querySelector("[data-hero-media]");
	const overlay = scope?.querySelector("[data-hero-overlay]");
	const reveals = scope?.querySelectorAll("[data-hero-reveal]");

	if (reveals?.length) {
		gsap.from(reveals, {
			y: 48,
			opacity: 0,
			duration: 1.2,
			stagger: 0.12,
			ease: "power3.out",
		});
	}

	if (media) {
		gsap.fromTo(
			media,
			{ scale: 1.08 },
			{
				scale: 1,
				ease: "none",
				scrollTrigger: {
					trigger: scope,
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			},
		);
	}

	if (overlay) {
		gsap.fromTo(
			overlay,
			{ opacity: 0.78 },
			{
				opacity: 0.45,
				ease: "none",
				scrollTrigger: {
					trigger: scope,
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			},
		);
	}

	ScrollTrigger.refresh();
});
</script>

<template>
	<header
		ref="sectionRef"
		v-editable="blok"
		class="relative flex min-h-[max(44rem,88vh)] items-center justify-center overflow-hidden bg-[#1b1611] px-6 py-16"
	>
		<div
			v-if="imageUrl"
			data-hero-media
			class="absolute inset-0 z-0 h-full w-full"
		>
			<img
				:src="imageUrl"
				:alt="imageAlt"
				class="h-full w-full object-cover"
			/>
		</div>

		<div
			data-hero-overlay
			class="absolute inset-0 h-full w-full"
			style="
				background:
					linear-gradient(180deg, rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.46)),
					radial-gradient(circle at center, rgba(181, 26, 30, 0.08), transparent 52%);
			"
		/>

		<div class="relative z-10 max-w-[60rem] text-center text-white">
			<h1
				data-hero-reveal
				class="m-0 font-headline text-[clamp(4rem,10vw,8rem)] italic font-medium leading-[0.94] tracking-[-0.04em]"
			>
				{{ blok.title || "Laki Ramen" }}
			</h1>

			<p
				data-hero-reveal
				class="mx-auto mt-6 max-w-[42rem] text-[clamp(1rem,2vw,1.45rem)] font-light uppercase tracking-[0.36em] text-white/90"
			>
				{{
					blok.subtitle || "Bringing the Passion and Flavor of Japan to the World"
				}}
			</p>

			<div
				data-hero-reveal
				class="mt-12 flex flex-col items-center"
			>
				<div class="h-[5.5rem] w-px bg-white/40" />
				<span class="mt-4 text-[0.68rem] uppercase tracking-[0.3em] text-white/60">
					{{ blok.scroll_label || "Scroll to Explore" }}
				</span>
			</div>
		</div>
	</header>
</template>