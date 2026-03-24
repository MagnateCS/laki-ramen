<script setup>
defineProps({ blok: Object });
</script>

<template>
	<footer class="bg-[#FCF9F3] px-8 py-20 dark:bg-stone-950" v-editable="blok">
		<div
			class="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 border-t border-outline-variant/20 pt-20 md:grid-cols-4"
		>
			<div class="col-span-1 md:col-span-1">
				<a class="font-headline text-3xl italic text-primary" href="/">
					{{ blok.brand || "Laki Ramen" }}
				</a>
				<p class="mt-6 max-w-xs font-body text-sm leading-relaxed text-stone-600 dark:text-stone-400">
					{{
						blok.description ||
						"A digital interpretation of the physical menu, honoring the craft of the ramen master."
					}}
				</p>
			</div>

			<div class="space-y-6">
				<h4 class="font-body text-sm font-bold uppercase tracking-widest text-primary">
					{{ blok.discover_title || "Discover" }}
				</h4>
				<nav class="flex flex-col space-y-4">
					<StoryblokComponent
						v-for="link in blok.discover_links || []"
						:key="link._uid"
						:blok="link"
					/>
				</nav>
			</div>

			<div class="space-y-6">
				<h4 class="font-body text-sm font-bold uppercase tracking-widest text-primary">
					{{ blok.connect_title || "Connect" }}
				</h4>
				<nav class="flex flex-col space-y-4">
					<StoryblokComponent
						v-for="link in blok.connect_links || []"
						:key="link._uid"
						:blok="link"
					/>
				</nav>
			</div>

			<div class="space-y-6">
				<h4 class="font-body text-sm font-bold uppercase tracking-widest text-primary">
					{{ blok.inquiries_title || "Inquiries" }}
				</h4>
				<p class="font-body text-sm text-stone-600 dark:text-stone-400">
					{{ blok.email || "hello@lakiramen.jp" }}
				</p>
				<div class="pt-4">
					<p class="font-body text-[10px] uppercase tracking-[0.2em] text-stone-400">
						{{ blok.copyright_text || "© 2024 Laki Ramen. All Rights Reserved." }}
					</p>
				</div>
			</div>
		</div>
	</footer>
</template>
