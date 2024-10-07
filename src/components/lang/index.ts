import type { FC } from "react";

import html from "./html";
import javascript from "./javascript";
import typescript from "./typescript";

const iconLang: { [key: string]: FC } = {
  html,
  javascript,
  typescript,
};

export default iconLang;
