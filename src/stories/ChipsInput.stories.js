import React from "react";
import { storiesOf } from "@storybook/react";
import {ChipsInput} from "../components/ChipsInput"

const stories = storiesOf('Chips Input',module);

stories.add('Chips Input',()=>{
    return <ChipsInput 
    placeholder="Enter cities..." 
    fontFamily='"Gill Sans", sans-serif' 
    width="480px" 
    // chipFontSize="20px"
    // inputFontSize="20px"
    />
});

stories.add('Custom styles', () => (
  <ChipsInput
    placeholder="Enter cities..."
    onAddChips={() => {}}
    styles={{
      container: { borderColor: '#4338ca', borderRadius: 8, maxWidth: 480 },
      chip: { backgroundColor: '#4338ca', color: 'white' },
      input: { fontSize: '1rem' },
    }}
  />
));
