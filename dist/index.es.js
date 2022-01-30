import e from"react";import"react-dom";!function(e,t){void 0===t&&(t={});var i=t.insertAt;if(e&&"undefined"!=typeof document){var s=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css","top"===i&&s.firstChild?s.insertBefore(r,s.firstChild):s.appendChild(r),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(document.createTextNode(e))}}('@import url("https://fonts.googleapis.com/css?family=Open+Sans");.chips-input-container{border:1px solid #d3d3d3;border-radius:4px;margin:1em;overflow:hidden;overflow-x:auto;overflow-y:unset;padding:1ex;vertical-align:middle;width:480px}.chips-input-container:hover{border:1px solid #77c2ff}div.inline{float:left;margin:.1rem .3rem .1rem 0}.input{-webkit-appearance:none;border:none;color:#565656;font:inherit;margin:auto;width:100%}.input:focus{border-color:#6495ed;outline:none}.input.has-error{border-color:tomato}.error{color:tomato;font-size:80%}.tag-item{border-radius:3px;display:inline-block;display:inline-flex;font:inherit;font-size:80%;padding:1px 4px 1px 1rem}.tag-item,.tag-item>.button{align-items:center;height:20px}.tag-item>.button{border:none;cursor:pointer;display:flex;font:inherit;font-weight:700;justify-content:center;line-height:1;margin-left:10px;padding:0;width:20px}');class t extends e.Component{state={items:[],value:"",error:null};handleKeyDown=e=>{if(["Enter","Tab",","].includes(e.key)){e.preventDefault();var t=this.state.value.trim();t&&this.isValid(t)&&this.setState({items:[...this.state.items,this.state.value],value:""}),this.props.onAddChips?this.props.onAddChips([...this.state.items,this.state.value]):console.debug([...this.state.items,this.state.value])}};handleChange=e=>{this.setState({value:e.target.value,error:null})};handleDelete=e=>{this.setState({items:this.state.items.filter((t=>t!==e))})};handlePaste=e=>{e.preventDefault();var t=e.clipboardData.getData("text").match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);if(t){var i=t.filter((e=>!this.isInList(e)));this.setState({items:[...this.state.items,...i]})}};isValid(e){let t=null;return this.isInList(e)&&(t=`${e} has already been added.`),!t||(this.setState({error:t}),!1)}isInList(e){return this.state.items.includes(e)}render(){const t=this.props.chipBgColor?this.props.chipBgColor:"#9b9b9b",i=this.props.chipColor?this.props.chipColor:"whitesmoke";return e.createElement(e.Fragment,null,e.createElement("div",{className:"chips-input-container"},this.state.items.map((s=>e.createElement("div",{className:"tag-item inline",style:{backgroundColor:t,color:i},key:s},s,e.createElement("button",{type:"button",className:"button",onClick:()=>this.handleDelete(s),style:{backgroundColor:t,color:i}},"×")))),e.createElement("div",{className:"inline"},e.createElement("input",{className:"input "+(this.state.error&&" has-error"),value:this.state.value,placeholder:this.props.placeholder,onKeyDown:this.handleKeyDown,onChange:this.handleChange,onPaste:this.handlePaste}))),this.state.error&&e.createElement("p",{className:"error"},this.state.error))}}export{t as ChipsInput};
