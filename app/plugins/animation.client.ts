import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default defineNuxtPlugin((nuxtApp) => {
	gsap.registerPlugin(ScrollTrigger);

	const lenis = new Lenis({
		autoRaf: false,
		smoothWheel: true,
	});

	lenis.on("scroll", ScrollTrigger.update);

	const update = (time: number) => {
		lenis.raf(time * 1000);
	};

	gsap.ticker.add(update);
	gsap.ticker.lagSmoothing(0);

	if (import.meta.hot) {
		import.meta.hot.dispose(() => {
			gsap.ticker.remove(update);
			lenis.destroy();
		});
	}

	nuxtApp.hook("app:beforeUnmount", () => {
		gsap.ticker.remove(update);
		lenis.destroy();
	});

	return {
		provide: {
			gsap,
			ScrollTrigger,
			lenis,
		},
	};
});
