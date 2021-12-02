import Prism from "prismjs";

export default function highlight(
  code: string,
  language: string
): Prism.TokenStream {
  if (Prism.languages[language]) {
    return Prism.highlight(code, Prism.languages[language], language);
  } else {
    return Prism.util.encode(code);
  }
}
