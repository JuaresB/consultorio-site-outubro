import React from 'react';
import classNames from 'classnames'

export default class FloatingLabel extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasValue: false, hasError: false };
    this.handleChange = this.handleChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onBlur(event) {
    this.setState({ hasValue: Boolean(event.currentTarget.value) });
    if(this.props.type === "emailSuggestion"){
      this.props.onBlur();
    }
  }

  handleChange(event) {
    this.props.onChange(event)
  }

  onKeyDown(event) {
    if(this.props.onKeyDown){
      this.props.onKeyDown(event);
    }
  }

  render() {
    const { autoComplete, errorMsg, id, isDisabled, pattern, placeholder, type, color, inputRef, min, max } = this.props;
    const { hasValue, hasError } = this.state;

    const inputClasses = classNames('fl-input', { 'fl-valid': hasValue && !hasError }, { 'fl-invalid': hasValue && hasError });
    const errMsgClasses = classNames({ 'fl-error-msg': errorMsg }, { 'fl-error-show': (hasError && hasValue) && (errorMsg && pattern) });

    return (
      <div className='fl-input-container'>
        <input
          autoComplete={autoComplete}
          className={inputClasses}
          disabled={isDisabled}
          onBlur={this.onBlur}
          onChange={this.handleChange}
          value={this.props.value}
          type={type}
          onKeyDown={this.onKeyDown}
          color={color}
          spellCheck="false"
          ref={inputRef}
          pattern={pattern}
          min={min}
          max={max}
        />
        <label className='fl-input-label' htmlFor={id}>{placeholder}</label>
        <span className='fl-input-bar'></span>
        {errorMsg && <span className={errMsgClasses}>{errorMsg}</span>}
        <style jsx="true">{`
          .fl-input-container {
            -ms-flex-direction: column;
            -webkit-flex-direction: column;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            flex-direction: column;
            position: relative;
          }

          .fl-input-container input:not(:focus):not(.fl-valid):not(.fl-invalid) {
            color: transparent;
          }

          .fl-input-container input,
          .fl-input-container label,
          .fl-error-msg {
            -webkit-font-smoothing: antialiased;
            font-family: 'Roboto', sans-serif;
            text-shadow: none;
          }

          .fl-input-container input {
            -moz-appearance: none;
            -webkit-appearance: none;
            -webkit-tap-highlight-color: transparent;
            border-radius: 0;
            display: -moz-flex;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            font-size: 100%;
            line-height: 25px;
            color: ${this.props.color};
            background: transparent;
          }

          .fl-input-label {
            -moz-transform-origin: left top;
            -moz-transform: scale(1) translate3d(0, 22px, 0);
            -moz-transition: 200ms ease all;
            -ms-flex-order: 1;
            -webkit-order: 1;
            -webkit-transform-origin: left top;
            -webkit-transform: scale(1) translate3d(0, 22px, 0);
            -webkit-transition: 200ms ease all;
            color: ${this.props.color};
            font-weight: normal;
            opacity: 0.75;
            order: 1;
            padding-left: 2px;
            pointer-events: none;

            transform-origin: left top;
            transform: scale(1) translate3d(0, 22px, 0);
            transition: 200ms ease all;
          }

          .fl-input-container input:focus+label,
          .fl-input-container input.fl-valid+label,
          .fl-invalid+label {
            -moz-transform: scale(0.8) translate3d(0, 5px, 0);
            -webkit-transform: scale(0.8) translate3d(0, 5px, 0);
            color: ${this.props.color};
            font-weight: 500;
            opacity: 1;
            transform: scale(0.8) translate3d(0, 5px, 0);
          }

          .fl-input:active,
          .fl-input:focus,
          .fl-input-label {
            outline: 0;
          }

          .fl-input {
            -ms-flex-order: 2;
            -ms-flex: 1 1 auto;
            -webkit-flex: 1 1 auto;
            -webkit-order: 2;
            border: 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.15);
            color: #000;
            flex: 1 1 auto;
            order: 2;
          }

          .fl-input-bar {
            -ms-flex-order: 3;
            -webkit-order: 3;
            display: block;
            order: 3;
            top: 0;
          }

          .fl-input-bar::after,
          .fl-input-bar::before {
            -moz-transition: 200ms ease all;
            -webkit-transition: 200ms ease all;
            background: #5196c6;
            bottom: 0;
            content: "";
            height: 2px;
            position: absolute;
            transition: 200ms ease all;
            width: 0;
          }

          .fl-input-bar::before {
            left: 50%;
          }

          .fl-input-bar::after {
            right: 50%;
          }

          .fl-input:focus~.fl-input-bar::after,
          .fl-input:focus~.fl-input-bar::before,
          .fl-invalid~.fl-input-bar::after,
          .fl-invalid~.fl-input-bar::before {
            width: 50%;
          }

          .fl-input-bar,
          .fl-error-msg {
            position: relative;
            width: inherit;
          }

          .fl-error-msg {
            bottom: -10px;
            font-size: 13px;
            overflow: hidden;
            position: absolute;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 90%;
            word-break: break-all;
            word-wrap: break-word;
          }

          .fl-error-show {
            display: inline-block;
          }

          .fl-invalid~.fl-input-bar::after,
          .fl-invalid~.fl-input-bar::before {
            background: #E74C3C;
          }

          .fl-input-container .fl-input.fl-invalid+label,
          .fl-error-msg {
            color: #E74C3C;
          }
        `}</style>
      </div>
    );
  }
}

FloatingLabel.defaultProps = {
  autoComplete: "false",
  type: 'text',
  isDisabled: false,
  placeholder: 'name',
  color:'white'
};
