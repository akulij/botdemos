import translations from "./translations.json"

export type Languages = keyof typeof translations;
export type Paths = keyof typeof translations[Languages]["translation"];


export default function(language: Languages, path: Paths): string {
    return translations[language]["translation"][path];
}

