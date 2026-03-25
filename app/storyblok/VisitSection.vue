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
	const cards = scope?.querySelectorAll("[data-visit-card]");

	if (cards?.length) {
		gsap.from(cards, {
			y: 56,
			opacity: 0,
			duration: 1,
			stagger: 0.16,
			ease: "power3.out",
			scrollTrigger: {
				trigger: scope,
				start: "top 78%",
			},
		});
	}

	ScrollTrigger.refresh();
});
</script>

<template>
	<section ref="sectionRef" class="px-8 py-32" v-editable="blok">
		<div class="mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 md:grid-cols-3">
			<a
				data-visit-card
				class="flex min-h-[500px] flex-col justify-between bg-primary p-16 text-on-primary md:col-span-2"
				:href="getLinkHref(blok.location_link)"
			>
				<h3 class="font-headline text-5xl italic leading-tight md:text-7xl ">
					{{ blok.title || "Visit us in the heart of the city." }}
				</h3>
				<div class="flex items-end justify-between">
					<div>
						<p class="font-body text-lg">
							{{ blok.address || "123 Ginza Avenue, Tokyo" }}
						</p>
						<p class="font-body text-lg text-on-primary/60">
							{{ blok.hours || "Open Daily 11:00 - 22:00" }}
						</p>
					</div>
					<span class="material-symbols-outlined text-6xl font-extralight">
						arrow_outward
					</span>
				</div>
			</a>

			<div
				data-visit-card
				class="flex flex-col items-center justify-center bg-tertiary-fixed-dim p-16 text-center text-on-tertiary-fixed"
			>
				<span class="material-symbols-outlined mb-6 text-5xl">
					{{ blok.booking_icon || "event_seat" }}
				</span>
				<h3 class="mb-6 font-headline text-4xl">
					{{ blok.booking_title || "Reserved Seating" }}
				</h3>
				<p class="mb-8 font-body opacity-80">
					{{ blok.booking_description || "Experience the craft at our chef's table." }}
				</p>
				<a
					v-if="blok.booking_button_label"
					class="bg-on-primary px-10 py-4 font-label text-sm uppercase tracking-widest text-tertiary-fixed-dim transition-opacity hover:opacity-90"
					:href="getLinkHref(blok.booking_button_link)"
				>
					{{ blok.booking_button_label }}
				</a>
			</div>
		</div>
	</section>
</template>
