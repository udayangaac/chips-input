const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { test } = require("node:test");
const React = require("react");
const { renderToString } = require("react-dom/server");
const { main, module: moduleEntry } = require("../package.json");

test("both package entries begin with the Next.js client directive", () => {
  for (const entry of [main, moduleEntry]) {
    const bundle = readFileSync(join(__dirname, "..", entry), "utf8");
    assert.match(bundle, /^["']use client["'];/, entry);
  }
});

test("the package imports and renders without a browser DOM", () => {
  const { ChipsInput } = require("..");
  const markup = renderToString(
    React.createElement(ChipsInput, {
      placeholder: "Add a city",
      classNames: { root: "cities" },
      styles: { container: { width: 320 } },
    }),
  );

  assert.match(markup, /class="chips-input cities"/);
  assert.match(markup, /width:320px/);
  assert.match(markup, /placeholder="Add a city"/);
});
