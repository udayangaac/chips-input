import {React} from "react";
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