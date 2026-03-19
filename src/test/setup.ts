import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

class IntersectionObserverMock implements IntersectionObserver {
	readonly root: Element | Document | null = null;
	readonly rootMargin = '';
	readonly thresholds: ReadonlyArray<number> = [];

	disconnect(): void {}
	observe(): void {}
	takeRecords(): IntersectionObserverEntry[] {
		return [];
	}
	unobserve(): void {}
}

Object.defineProperty(window, 'IntersectionObserver', {
	writable: true,
	value: IntersectionObserverMock,
});

Object.defineProperty(globalThis, 'IntersectionObserver', {
	writable: true,
	value: IntersectionObserverMock,
});

window.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();

const originalWarn = console.warn;
vi.spyOn(console, 'warn').mockImplementation((message?: unknown, ...args: unknown[]) => {
	if (typeof message === 'string' && message.includes('React Router Future Flag Warning')) {
		return;
	}

	originalWarn(message, ...args);
});
