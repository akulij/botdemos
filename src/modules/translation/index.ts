import translations from "./translations.json";

export type Languages = keyof typeof translations;
export type Path = keyof typeof translations[Languages]["translation"];

export default function translate(language: Languages, path: Path): string {
  return translations[language].translation[path];
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
