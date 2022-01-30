import React from "react";
import ReactDOM from "react-dom";
import "./chipsInput.css"


export class ChipsInput extends React.Component {
  state = {
    items: [],
    value: "",
    error: null
  };

  handleKeyDown = evt => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();
      var value = this.state.value.trim();
      if (value && this.isValid(value)) {
        this.setState({
          items: [...this.state.items, this.state.value],
          value: ""
        });
      }
     this.props.onAddChips ? this.props.onAddChips([...this.state.items, this.state.value]):console.log([...this.state.items, this.state.value])
    }
  };

  handleChange = evt => {
    this.setState({
      value: evt.target.value,
      error: null
    });
  };

  handleDelete = item => {
    this.setState({
      items: this.state.items.filter(i => i !== item)
    });
  };

  handlePaste = evt => {
    evt.preventDefault();
    var paste = evt.clipboardData.getData("text");
    var msgs = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);
    if (msgs) {
      var toBeAdded = msgs.filter(msg => !this.isInList(msg));
      this.setState({
        items: [...this.state.items, ...toBeAdded]
      });
    }
  };

  isValid(msg) {
    let error = null;
    if (this.isInList(msg)) {
      error = `${msg} has already been added.`;
    }
    if (error) {
      this.setState({ error });
      return false;
    }
    return true;
  }

  isInList(msg) {
    return this.state.items.includes(msg);
  }
  render() {
    return (
        <>
         {this.state.error && <p className="error">{this.state.error}</p>}
            <div className="chips-input-container">
                {this.state.items.map(item => (
                <div className="tag-item inline" key={item}>
                    {item}
                    <button
                    type="button"
                    className="button"
                    onClick={() => this.handleDelete(item)}
                    >
                    &times;
                    </button>
                </div>
                ))}

                <div className="inline">
                <input
                className={"input " + (this.state.error && " has-error")}
                value={this.state.value}
                // TODO: add place holder.
                placeholder={this.props.placeholder}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange}
                onPaste={this.handlePaste}
                />
                </div>
            </div>
      </>
    );
  }
}
