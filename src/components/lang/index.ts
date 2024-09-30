import c from "./c";
import cpp from "./cpp";
import csharp from "./csharp";
import css from "./css";
import dart from "./dart";
import go from "./go";
import html from "./html";
import java from "./java";
import javascript from "./javascript";
import kotlin from "./kotlin";
import markdown from "./markdown";
import php from "./php";
import python from "./python";
import ruby from "./ruby";
import rust from "./rust";
import sql from "./sql";
import typescript from "./typescript";

const iconLang: { [key: string]: React.FC } = {
  c: c,
  cpp: cpp,
  csharp: csharp,
  css,
  dart,
  go,
  html,
  java,
  javascript,
  kotlin,
  markdown,
  php,
  python,
  ruby,
  rust,
  sql,
  typescript,
};

export default iconLang;
