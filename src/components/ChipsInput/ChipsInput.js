import React from "react";
import ReactDOM from "react-dom";
import "./chipsInput.css";

export class ChipsInput extends React.Component {
  state = {
    items: [],
    value: "",
    error: null,
  };

  handleKeyDown = (evt) => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();
      var value = this.state.value.trim();
      if (value && this.isValid(value)) {
        this.setState({
          items: [...this.state.items, this.state.value],
          value: "",
        });
      }
      this.props.onAddChips
        ? this.props.onAddChips([...this.state.items, this.state.value])
        : console.debug([...this.state.items, this.state.value]);
    }
  };

  handleChange = (evt) => {
    this.setState({
      value: evt.target.value,
      error: null,
    });
  };

  handleDelete = (item) => {
    this.setState({
      items: this.state.items.filter((i) => i !== item),
    });
  };

  handlePaste = (evt) => {
    evt.preventDefault();
    var paste = evt.clipboardData.getData("text");
    if (paste && !this.isInList(paste)) {
      this.setState({
        items: [...this.state.items, paste],
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
    const bgColor = this.props.chipBgColor ? this.props.chipBgColor : "#9b9b9b";
    const color = this.props.chipColor ? this.props.chipColor : "#f5f5f5";
    const fontFamily = this.props.fontFamily
      ? this.props.fontFamily
      : 'inherit';
    const chipFontSize = this.props.chipFontSize
      ? this.props.chipFontSize
      : 'inherit';
    const inputFontSize = this.props.inputFontSize
      ? this.props.inputFontSize
      : 'inherit';

    let containerStyle = {};

    // Custom width to the container style.
    if (this.props.width) {
      containerStyle["width"] = this.props.width;
    }

    return (
      <>
        <div className="chips-input">
          <div style={containerStyle} className="container">
            {this.state.items.map((item) => (
              <div
                className="tag-item inline"
                style={{
                  backgroundColor: bgColor,
                  color: color,
                  fontFamily: fontFamily,
                  fontSize: chipFontSize,
                }}
                key={item}
              >
                {item}
                <button
                  type="button"
                  className="button"
                  onClick={() => this.handleDelete(item)}
                  style={{
                    border: false,
                    backgroundColor: "transparent",
                    color: color,
                  }}
                >
                  &times;
                </button>
              </div>
            ))}

            <div className="inline">
              <input
                style={{ fontFamily: fontFamily, fontSize: inputFontSize }}
                className={"input " + (this.state.error && " has-error")}
                value={this.state.value}
                placeholder={this.props.placeholder}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleChange}
                onPaste={this.handlePaste}
              />
            </div>
          </div>
          {this.state.error && <p className="error">{this.state.error}</p>}
        </div>
      </>
    );
  }
}