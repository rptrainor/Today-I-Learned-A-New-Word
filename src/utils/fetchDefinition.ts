import { useWordStore } from "../store/wordStore";

/**
 * Removes the `<base>` tag from an HTML string.
 * @param html The raw HTML string.
 * @returns The sanitized HTML string.
 */
function sanitizeHTML(html: string): string {
	return html.replace(/<base [^>]*>/gi, "");
}

export async function fetchDefinition(word: string) {
	const { setDefinitionHTML } = useWordStore.getState();
	try {
		const response = await fetch(
			`https://api.wikimedia.org/core/v1/wiktionary/en/page/${word}/html`,
		);
		if (!response.ok) {
			setDefinitionHTML("<p>No definition found.</p>");
			return;
		}
		const html = await response.text();
		const sanitizedHTML = sanitizeHTML(html);
		setDefinitionHTML(sanitizedHTML);
	} catch (error) {
		console.error("Error fetching definition:", error);
		setDefinitionHTML(
			"<p>Error fetching the definition. Please try again later.</p>",
		);
	}
}
