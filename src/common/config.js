import { CODE_JS } from "VisualApp/files";

const languages = [
  {
    name: "JavaScript",
    ext: "js",
    mode: "javascript",
    skeleton: CODE_JS,
  },
  {
    name: "python",
    ext: "py",
    mode: "python",
    // skeleton: CODE_JS,
  },
];

const exts = languages.map((language) => language.ext);

export { languages, exts };
