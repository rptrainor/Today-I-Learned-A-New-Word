import type React from "react";
import { useEffect, useState } from "react";
import { useWordStore } from "../store/wordStore";
import { fetchDefinition } from "../utils/fetchDefinition";

interface WordDefinitionProps {
  word: string;
}

const WordDefinition: React.FC<WordDefinitionProps> = ({ word }) => {
  const { definitionHTML, setDefinitionHTML } = useWordStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWord = async () => {
      setLoading(true);
      await fetchDefinition(word);
      setLoading(false);

      // Update links after HTML is rendered
      const container = document.getElementById("definition");
      if (container) {
        const links = container.querySelectorAll("a");
        for (const link of links) {
          const rel = link.getAttribute("rel");

          // Skip internal links (e.g., Previous and Next)
          if (rel === "internal") {
            continue;
          }

          // For other links, set to open in a new tab
          const href = link.getAttribute("href");
          if (href) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
          }
        }
      }
    };

    fetchWord();
  }, [word]);

  return (
    <div>
      {loading ? (
        <p>Loading definition...</p>
      ) : definitionHTML?.includes("No definition found") ? (
        <p>{definitionHTML}</p>
      ) : (
        <div
					id='definition'
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{ __html: definitionHTML ?? "" }}
				/>
      )}
    </div>
  );
};

export default WordDefinition;
