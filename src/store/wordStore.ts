import { create } from "zustand";

const rareWords = [
	"sesquipedalian",
	"quidnunc",
	"gasconade",
	"floccinaucinihilipilification",
	"defenestration",
	"callipygian",
	"eucatastrophe",
	"petrichor",
	"phantasmagoria",
	"mellifluous",
	"sagacious",
	"abnegation",
];

type WordState = {
	currentIndex: number;
	currentWord: string;
	definitionHTML: string | null;
	setCurrentIndex: (index: number) => void;
	setWordFromTitle: (title: string) => void;
	setDefinitionHTML: (html: string | null) => void;
};

export const useWordStore = create<WordState>((set) => ({
	currentIndex: 0,
	currentWord: rareWords[0],
	definitionHTML: null,
	setCurrentIndex: (index) => {
		const newIndex = (index + rareWords.length) % rareWords.length;
		set({ currentIndex: newIndex, currentWord: rareWords[newIndex] });
	},
	setWordFromTitle: (title) => {
		const index = rareWords.indexOf(title);
		if (index !== -1) {
			set({ currentIndex: index, currentWord: title });
		}
	},
	setDefinitionHTML: (html) => set({ definitionHTML: html }),
}));

export { rareWords };