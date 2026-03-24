<script setup>
import { computed } from "vue";

const props = defineProps({ blok: Object });

const brand = computed(() =>
	(props.blok?.brand || props.blok?.name || "").toLowerCase()
);

const brandLabel = computed(() => props.blok?.name || "Delivery Partner");

const accent = computed(() => {
	if (brand.value.includes("door")) return "#ff3008";
	if (brand.value.includes("uber")) return "#06c167";
	if (brand.value.includes("grub")) return "#f63440";
	return "#171511";
});

const logoText = computed(() => {
	if (brand.value.includes("door")) return "DD";
	if (brand.value.includes("uber")) return "UE";
	if (brand.value.includes("grub")) return "GH";
	return brandLabel.value.slice(0, 2).toUpperCase();
});

const logoUrl = computed(() => {
	const logo = props.blok?.logo;

	if (!logo) return null;
	if (typeof logo === "string") return logo;
	if (typeof logo === "object") return logo.filename || logo.url || null;

	return null;
});

function getLinkHref(link) {
	if (!link) return "#";
	return link.cached_url || link.url || link.story?.full_slug || "#";
}
</script>

<template>
	<a
		v-editable="blok"
		:href="getLinkHref(blok.link)"
		class="group flex items-center justify-between border-b border-outline/10 py-8 transition-all duration-300 hover:translate-x-1"
	>
		<div class="flex min-w-0 items-center gap-6">
			
			<!-- Logo Circle -->
			<div
				class="flex h-[3.5rem] w-[3.5rem] shrink-0 items-center justify-center rounded-full bg-surface-strong p-1 overflow-hidden transition-all duration-300 group-hover:scale-105"
			>
				<img
					v-if="logoUrl"
					:src="logoUrl"
					:alt="brandLabel"
					class="h-full w-full object-contain rounded-full"
				/>
				<span
					v-else
					class="font-label text-xs font-bold tracking-[0.18em]"
					:style="{ color: accent }"
				>
					{{ logoText }}
				</span>
			</div>

			<div class="min-w-0">
				<h4 class="font-headline text-2xl tracking-tight text-on-surface">
					{{ brandLabel }}
				</h4>
				<p class="font-body text-sm text-on-surface/50">
					{{ blok.meta || "Ready in 10-15 min • No fee" }}
				</p>
			</div>
		</div>

		<span
			class="material-symbols-outlined text-on-surface/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary"
		>
			arrow_forward
		</span>
	</a>
</template>