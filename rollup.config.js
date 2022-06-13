import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";
import { eslint } from "rollup-plugin-eslint";
import fs from "fs";
import scss from "rollup-plugin-scss";
import postcss from "postcss";
import autoprefixer from "autoprefixer";

const MODE = process.env["NODE_ENV"] || "prod";

function clean() {
  if (!fs.existsSync("dist")) return;
  let files = fs.readdirSync("dist");
  if (files.length > 0)
    files.forEach((file) => {
      let filePath = "dist/" + file;
      if (fs.statSync(filePath).isFile()) fs.unlinkSync(filePath);
    });
  try {
  } catch (e) {
    console.log("[-] unable to clean dist folder: ", e.message);
  }
}

export default [
  {
    input: "src/multiselect.js",
    output: [
      {
        file: "dist/multiselect.js",
        format: "es",
        name: "multiselect",
        banner: `/*! ${pkg.name} ${pkg.version} | ${pkg.author} !*/`,
        sourcemap: MODE === "dev",
      },
    ],
    plugins: [
      clean(),
      eslint(),
      scss({
        processor: () => postcss([autoprefixer()]),
        outputStyle: "compressed",
      }),
      terser(),
    ],
  },
];
