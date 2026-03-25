import { nextTick, onBeforeUnmount, onMounted, type Ref } from "vue";
import type { Context, GSAP } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

type ScopeElement = HTMLElement | SVGElement | null;

type ScopeAnimationContext = {
	gsap: GSAP;
	ScrollTrigger: typeof ScrollTriggerType;
	scope: ScopeElement;
};

export function useGsapScope(
	scopeRef: Ref<ScopeElement>,
	setup: (context: ScopeAnimationContext) => void,
) {
	const { $gsap, $ScrollTrigger } = useNuxtApp();
	let ctx: Context | null = null;

	onMounted(async () => {
		await nextTick();

		if (!scopeRef.value) {
			return;
		}

		ctx = $gsap.context(() => {
			setup({
				gsap: $gsap,
				ScrollTrigger: $ScrollTrigger,
				scope: scopeRef.value,
			});
		}, scopeRef.value);
	});

	onBeforeUnmount(() => {
		ctx?.revert();
	});
}
