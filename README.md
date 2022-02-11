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

## Properties

| Name          | Type   | Default   | Description                                                                       |
| ------------- | ------ | --------- | --------------------------------------------------------------------------------- |
| placeholder   | string |           | Places holder of the text input.                                                  |
| onAddChips    | func   |           | A callback function type of `(texts) =>` that is called when a new chip is added. |
| chipBgColor   | string | #f5f5f5   | Background color of the chips.                                                    |
| chipColor     | string | #9b9b9b   | Font color of the chips.                                                          |
| width         | string |           | The width of the chips input can be changed. Example: '480px','100%'              |
| fontFamily    | string | `inherit` | To change the font family of the ChipsInput. Example '"Gill Sans", sans-serif'    |
| chipFontSize  | string | `inherit` | The font size of the chips. Example: '12px'                                       |
| inputFontSize | string | `inherit` | The font size of the input text. Example: '12px'                                  |


# License
The files included in this repository are licensed under the MIT license.