import translations from "./translations.json"

type Languages = keyof typeof translations;
type Paths = keyof typeof translations[Languages];


export default function(language: Languages, path: Paths) {
    return translations[language][path]
}
