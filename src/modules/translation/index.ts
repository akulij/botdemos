import translations from "./translations.json";

let state_translations = Object;

export type Languages = keyof typeof translations;
export type Path = keyof typeof translations[Languages]["translation"];

export default function translate(language: Languages, path: Path): string {
  let translation = translations[language].translation[path];
  if (translation) return translation;
  else console.error(`No translation for ${path} exists!`);
}

export function keyboard_translation(
  language: Languages,
  array: Array<Array<string>>
) {
  const out = array.reduce((array: Array<Array<string>>, row: string[]) => {
    let kbd_row = row.reduce((btns, button) => {
      btns.push(translate(language, button as Path));
      return btns;
    }, []);
    array.push(kbd_row);
    return array;
  }, []);
  return out;
}

function setupStateTranslations() {
  for (const language in translations) {
    for (const state_name in translations[language].translation) {
      state_translations[translations[language].translation[state_name]] =
        state_name;
    }
  }
}
setupStateTranslations();

export function getStateTranslations() {
  if (!state_translations) {
    setupStateTranslations();
  }
  return state_translations;
}
