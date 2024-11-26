import { create } from "zustand";

const rareWords = [
	"arent",
	"parching",
	"grindy",
	"repetition",
	"atelic",
	"contranym",
	"doublet",
	"endonym",
	"factitive",
	"haplology",
	"idiom",
	"imparisyllabic",
	"infix",
];

type WordState = {
	currentWord: string;
	definitionHTML: string | null;
	setDefinitionHTML: (html: string | null) => void;
};

export const useWordStore = create<WordState>((set) => ({
	currentWord: rareWords[0],
	definitionHTML: null,
	setDefinitionHTML: (html) => set({ definitionHTML: html }),
}));

export { rareWords };
