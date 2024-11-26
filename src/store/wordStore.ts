import { create } from "zustand";

const rareWords = [
	"arent",
	"disanthropy",
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
	"fisherfolk",
	"gudgeon",
	"canonize",
	"aeviternity",
	"sciolism",
	"bungle",
	"quicken",
	"doolally",
	"apprehend",
	"gobo",
	"nummular",
	"minstrel",
	"nopalery",
	"whilst",
	"bonhomie",
	"alight",
	"zythology",
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
