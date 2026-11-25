const assert = require("node:assert/strict");
const { test } = require("node:test");
const { JSDOM } = require("jsdom");
const React = require("react");

const dom = new JSDOM('<div id="app"></div>', { pretendToBeVisual: true });
global.window = dom.window;
global.document = dom.window.document;

// React 17's scheduler should use timers so Node has no open MessagePort.
const messageChannel = global.MessageChannel;
global.MessageChannel = undefined;
const ReactDOM = require("react-dom");
global.MessageChannel = messageChannel;
const { ChipsInput } = require("..");

const app = document.getElementById("app");

function render(props) {
  ReactDOM.unmountComponentAtNode(app);
  return ReactDOM.render(React.createElement(ChipsInput, props), app);
}

function pressEnter(input, value) {
  const valueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value",
  ).set;
  valueSetter.call(input, value);
  input.dispatchEvent(new window.Event("input", { bubbles: true }));
  input.dispatchEvent(new window.KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
}

test("built-in styles and existing styling props still apply", () => {
  render({ onAddChips() {}, width: "80%", chipFontSize: "14px" });
  pressEnter(app.querySelector("input"), "Budapest");
  const chip = app.querySelector(".tag-item");
  assert.equal(app.querySelector(".container").style.width, "80%");
  assert.equal(chip.style.fontSize, "14px");
  assert.equal(window.getComputedStyle(chip).backgroundColor, "rgb(155, 155, 155)");
});

test("custom classes and styles reach each part, and styles override legacy props", () => {
  const slots = [
    ["root", ".chips-input", "marginBottom", "2px"],
    ["container", ".container", "width", "320px"],
    ["chip", ".tag-item", "backgroundColor", "navy"],
    ["removeButton", "button", "color", "gold"],
    ["inputWrapper", ".inline:has(input)", "paddingLeft", "4px"],
    ["input", "input", "fontSize", "18px"],
    ["error", ".error", "color", "maroon"],
  ];

  render({
    onAddChips() {},
    width: "80%",
    chipBgColor: "red",
    inputFontSize: "12px",
    classNames: Object.fromEntries(slots.map(([name]) => [name, `custom-${name}`])),
    styles: Object.fromEntries(slots.map(([name, , property, value]) => [
      name, { [property]: value },
    ])),
  });
  const input = app.querySelector("input");
  pressEnter(input, "Budapest");
  pressEnter(input, "Budapest");

  assert.ok(input.classList.contains("has-error"));
  assert.equal(app.querySelector(".error").textContent, "Budapest has already been added.");
  for (const [name, selector, property, value] of slots) {
    const element = app.querySelector(selector);
    assert.ok(element.classList.contains(`custom-${name}`), name);
    assert.equal(element.style[property], value, name);
  }

  app.querySelector("button").click();
  assert.equal(app.querySelector(".tag-item"), null);
});

test.after(() => {
  ReactDOM.unmountComponentAtNode(app);
  dom.window.close();
});
