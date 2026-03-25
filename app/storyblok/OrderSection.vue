<script setup>
import { computed, ref } from "vue";

const props = defineProps({ blok: Object });
const sectionRef = ref(null);

const titleHtml = computed(() => {
	const title = props.blok?.title?.trim();
	return title ? title.replace(/\n/g, "<br>") : "Order from <br>Home";
});

useGsapScope(sectionRef, ({ gsap, scope }) => {
	const copy = gsap.utils.toArray("[data-order-reveal]", scope);
	const providersWrap = scope?.querySelector("[data-providers-wrap]");
	const providers = providersWrap ? Array.from(providersWrap.children) : [];

	if (copy.length) {
		gsap.fromTo(
			copy,
			{
				y: 32,
				opacity: 0,
			},
			{
				y: 0,
				opacity: 1,
				duration: 0.9,
				stagger: 0.1,
				ease: "power3.out",
				scrollTrigger: {
					trigger: scope,
					start: "20% 76%",
					once: true,
				},
			}
		);
	}

	if (providers.length) {
		gsap.fromTo(
			providers,
			{
				x: 24,
				opacity: 0,
			},
			{
				x: 0,
				opacity: 1,
				duration: 0.75,
				stagger: 0.12,
				ease: "power2.out",
				scrollTrigger: {
					trigger: providersWrap,
					start: "30% 88%",
					once: true,
				},
			}
		);
	}
});
</script>

<template>
	<section ref="sectionRef" class="bg-surface py-32" v-editable="blok">
		<div class="mx-auto max-w-screen-xl px-8">
			<div class="grid grid-cols-1 items-center gap-16 md:grid-cols-12">
				<div class="space-y-8 md:col-span-5">
					<span
						class="block font-label text-xs uppercase tracking-[0.4em] text-secondary"
						data-order-reveal
					>
						{{ blok.eyebrow || "Delivery & Pickup" }}
					</span>

					<h2
						class="font-headline text-5xl italic leading-tight text-primary md:text-7xl"
						v-html="titleHtml"
						data-order-reveal
					/>

					<p
						class="max-w-md font-body text-lg leading-relaxed text-on-surface/70"
						data-order-reveal
					>
						{{
							blok.description ||
							"The craft of the ramen master, delivered with care. Partner links can be managed directly in Storyblok."
						}}
					</p>
				</div>

				<div class="md:col-span-7">
					<div
						class="divide-y divide-outline-variant/30 border-y border-outline-variant/30"
						data-providers-wrap
					>
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