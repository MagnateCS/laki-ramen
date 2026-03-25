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
	<section ref="sectionRef" class="hero-section" v-editable="blok">
		<div class="hero-media" data-hero-media v-if="imageUrl">
			<img :src="imageUrl" :alt="imageAlt" />
		</div>
		<div class="hero-overlay" data-hero-overlay />
		<div class="hero-content">
			<h1 data-hero-reveal>{{ blok.title || "Laki Ramen" }}</h1>
			<p data-hero-reveal>{{ blok.subtitle || "Bringing the Passion and Flavor of Japan to the World" }}</p>
			<div class="hero-scroll" data-hero-reveal>
				<div class="hero-scroll-line" />
				<span>{{ blok.scroll_label || "Scroll to Explore" }}</span>
			</div>
		</div>
	</section>
</template>

<style scoped>
.hero-section {
	position: relative;
	display: flex;
	min-height: max(44rem, 88vh);
	align-items: center;
	justify-content: center;
	overflow: hidden;
	padding: 4rem 1.5rem;
	background: #1b1611;
}

.hero-media,
.hero-media img,
.hero-overlay {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
}

.hero-media img {
	object-fit: cover;
}

.hero-overlay {
	background:
		linear-gradient(180deg, rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.46)),
		radial-gradient(circle at center, rgba(181, 26, 30, 0.08), transparent 52%);
}

.hero-content {
	position: relative;
	z-index: 1;
	max-width: 60rem;
	text-align: center;
	color: white;
}

.hero-content h1 {
	margin: 0;
	font-family: "Newsreader", serif;
	font-size: clamp(4rem, 10vw, 8rem);
	font-style: italic;
	font-weight: 500;
	line-height: 0.94;
	letter-spacing: -0.04em;
}

.hero-content p {
	margin: 1.5rem auto 0;
	max-width: 42rem;
	font-size: clamp(1rem, 2vw, 1.45rem);
	font-weight: 300;
	letter-spacing: 0.36em;
	text-transform: uppercase;
	color: rgba(255, 255, 255, 0.88);
}

.hero-scroll {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 3rem;
}

.hero-scroll-line {
	width: 1px;
	height: 5.5rem;
	background: rgba(255, 255, 255, 0.38);
}

.hero-scroll span {
	margin-top: 1rem;
	font-size: 0.68rem;
	letter-spacing: 0.3em;
	text-transform: uppercase;
	color: rgba(255, 255, 255, 0.64);
}
</style>
