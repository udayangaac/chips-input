# Chips Input

For input multiple texts as chips.

## Installation
```shell
npm i chips-input-lib
```
## Usage
The component can be used as below.

- View
![sample](https://i.ibb.co/yX1Zz1p/Screenshot-2022-02-11-at-15-28-02.png)

- Source
```js
import { ChipsInput } from 'chips-input-lib';


const onAddChips = (cities) => {
  console.log(cities);
};

function App() {
  return (
    <div className="App">
      <ChipsInput onAddChips={onAddChips} placeholder="Insert Cities"/>
    </div>
  );
}

export default App;

```

## Next.js

The package supports React 17, 18, and 19 and includes a Client Component
entry point. With the App Router, you can render a basic `<ChipsInput />`
directly from a Server Component. Define event callbacks such as
`onAddChips` inside a Client Component.

```jsx
// app/city-input.jsx
'use client';

import { ChipsInput } from 'chips-input-lib';
import styles from './city-input.module.css';

export default function CityInput() {
  return (
    <ChipsInput
      placeholder="Add a city"
      onAddChips={(cities) => console.log(cities)}
      classNames={{ container: styles.container, chip: styles.chip }}
      styles={{ input: { fontSize: '1rem' } }}
    />
  );
}
```

```css
/* app/city-input.module.css */
.container {
  border-radius: 8px;
}

.chip {
  background-color: navy;
  color: white;
}
```

Import `CityInput` into your page to use it. With the Pages Router, use the
regular usage example. The package loads its default styles in the browser.

## Styling

Use `classNames` to add CSS classes and `styles` to pass React style objects.
Both props accept any subset of these keys.

| Key | Element |
| --- | --- |
| `root` | Outer component wrapper |
| `container` | Bordered area containing the chips and input |
| `chip` | Each chip |
| `removeButton` | Each chip's remove button |
| `inputWrapper` | Wrapper around the text input |
| `input` | Text input |
| `error` | Validation message, when shown |

Default classes stay on each element. Explicit legacy styling props apply inline,
and values in `styles` take precedence over those props for the same element and
property.

## Properties

| Name          | Type   | Default   | Description                                                                       |
| ------------- | ------ | --------- | --------------------------------------------------------------------------------- |
| placeholder   | string |           | Places holder of the text input.                                                  |
| onAddChips    | func   |           | A callback function type of `(texts) =>` that is called when a new chip is added. |
| chipBgColor   | string | #9b9b9b   | Background color of the chips.                                                    |
| chipColor     | string | #f5f5f5   | Font color of the chips.                                                          |
| width         | string |           | The width of the chips input can be changed. Example: '480px','100%'              |
| fontFamily    | string | `inherit` | To change the font family of the ChipsInput. Example '"Gill Sans", sans-serif'    |
| chipFontSize  | string | `inherit` | The font size of the chips. Example: '12px'                                       |
| inputFontSize | string | `inherit` | The font size of the input text. Example: '12px'                                  |
| classNames    | object |           | Additional CSS classes by element key.                                            |
| styles        | object |           | React style objects by element key.                                               |

## Tests

Run `npm test` to rebuild and test both package entries, server rendering, and styling.

# License
The files included in this repository are licensed under the MIT license.
