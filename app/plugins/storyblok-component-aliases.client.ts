import AboutSection from "~/storyblok/AboutSection.vue";
import DeliveryProvider from "~/storyblok/DeliveryProvider.vue";
import FooterLink from "~/storyblok/FooterLink.vue";
import FooterSection from "~/storyblok/FooterSection.vue";
import HeroSection from "~/storyblok/HeroSection.vue";
import MenuCategory from "~/storyblok/MenuCategory.vue";
import MenuItem from "~/storyblok/MenuItem.vue";
import MenuPreviewSection from "~/storyblok/MenuPreviewSection.vue";
import OrderSection from "~/storyblok/OrderSection.vue";
import Page from "~/storyblok/Page.vue";
import VisitSection from "~/storyblok/VisitSection.vue";

export default defineNuxtPlugin((nuxtApp) => {
	const aliases = {
		page: Page,
		hero_section: HeroSection,
		about_section: AboutSection,
		menu_preview_section: MenuPreviewSection,
		menu_category: MenuCategory,
		menu_item: MenuItem,
		order_section: OrderSection,
		delivery_provider: DeliveryProvider,
		visit_section: VisitSection,
		footer_section: FooterSection,
		footer_link: FooterLink,
	};

	for (const [name, component] of Object.entries(aliases)) {
		nuxtApp.vueApp.component(name, component);
	}
});
