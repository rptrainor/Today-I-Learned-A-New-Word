import { useWordStore } from "../store/wordStore";

/**
 * Fetches the HTML definition for a word from the Wiktionary API
 * and updates the global state with the result.
 *
 * @param word - The word to fetch the definition for.
 */
export async function fetchDefinition(word: string) {
	const { setDefinitionHTML } = useWordStore.getState();
	try {
		const response = await fetch(
			`https://api.wikimedia.org/core/v1/wiktionary/en/page/${word}/html`
		);
		console.log({response});
		if (!response.ok) {
			setDefinitionHTML("<p>No definition found.</p>");
			return;
		}
		const html = await response.text();
		setDefinitionHTML(html);
	} catch (error) {
		console.error("Error fetching definition:", error);
		setDefinitionHTML(
			"<p>Error fetching the definition. Please try again later.</p>",
		);
	}
}
