import React from "react";
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
    const {
      chipBgColor,
      chipColor,
      chipFontSize,
      classNames = {},
      fontFamily,
      inputFontSize,
      placeholder,
      styles = {},
      width,
    } = this.props;
    const { error, items, value } = this.state;

    const slotClassName = (slot, baseClassName) =>
      [baseClassName, classNames[slot]].filter(Boolean).join(" ");

    return (
      <div className={slotClassName("root", "chips-input")} style={styles.root}>
        <div
          className={slotClassName("container", "container")}
          style={{ width, ...styles.container }}
        >
          {items.map((item) => (
            <div
              className={slotClassName("chip", "tag-item inline")}
              style={{
                backgroundColor: chipBgColor,
                color: chipColor,
                fontFamily,
                fontSize: chipFontSize,
                ...styles.chip,
              }}
              key={item}
            >
              {item}
              <button
                type="button"
                className={slotClassName("removeButton", "button")}
                onClick={() => this.handleDelete(item)}
                style={styles.removeButton}
              >
                &times;
              </button>
            </div>
          ))}

          <div className={slotClassName("inputWrapper", "inline")} style={styles.inputWrapper}>
            <input
              style={{ fontFamily, fontSize: inputFontSize, ...styles.input }}
              className={slotClassName("input", error ? "input has-error" : "input")}
              value={value}
              placeholder={placeholder}
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange}
              onPaste={this.handlePaste}
            />
          </div>
        </div>
        {error && (
          <p className={slotClassName("error", "error")} style={styles.error}>
            {error}
          </p>
        )}
      </div>
    );
  }
}
