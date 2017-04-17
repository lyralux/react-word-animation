import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NumericInput extends Component {
  constructor(props) {
    super(props)
    this.onSubtract = this.onSubtract.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }
  fireChange () {
    let event;
    try {
      event = new Event('change', {
        'bubbles': true,
        'cancelable': true
      });
    } catch (e) {
      // IE11 workaround.
      event = document.createEvent('Event');
      event.initEvent('change', true, true);
    }
    // We use dispatchEvent to have the browser fill out the event fully.
    this.input.dispatchEvent(event);
    // Manually dispatched events aren't delivered by React, so we notify too.
    this.props.onChange(event);
  }
  onAdd () {
    const { max, step } = this.props;
    const input = this.input;
    try {
      input.stepUp();
    } catch (e) {
      // IE11 workaround. See known issue #5 at
      // http://caniuse.com/#search=number
      let value = (parseFloat(input.value) || 0) + (step || 1);
      if (max !== undefined) {
        value = Math.min(value, max);
      }
      input.value = value;
    }
    this.fireChange();
  }
  onSubtract() {
    const { min, step } = this.props;
    const input = this.input;
    try {
      input.stepDown();
    } catch (e) {
      // IE11 workaround. See known issue #5 at
      // http://caniuse.com/#search=number
      let value = (parseFloat(input.value) || 0) - (step || 1);
      if (min !== undefined) {
        value = Math.max(value, min);
      }
      input.value = value;
    }
    this.fireChange();
  }
  render() {
    const { className, disabled, ...props } = this.props;

    return (
      <div className="input-group">
        <input ref={i => this.input = i} {...props} type="number" className="form-control" />
          <div className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={this.onSubtract}>-</button>
            <button className="btn btn-default" type="button" onClick={this.onAdd}>+</button>
          </div>
        </div>
    )
  }
}


NumericInput.propTypes = {
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
  step: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
