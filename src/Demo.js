import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import WordAnimation from './WordAnimation'
import NumericInput from './NumericInput'
import easings from './lib/easings'

class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'These words are animated',
      delay: 1,
      duration: 1,
      easing: 'ease',
      transform: 'translateY(30px)',
      animationShown: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);

  }
  handleChange(event) {
    this.setState({
      text: event.target.value
    });
  }
  handleSubmit(event) {
    this.setState({
      text: this.input.value,
      delay: Number(this.inputDelay.input.value),
      duration: Number(this.inputDuration.input.value),
      easing: this.inputEasing.value,
      transform: this.inputTransform.value
    })

    event.preventDefault();
  }

  onChangeNumber(event) {
    return null;
  }

  render() {
    const WordAnimationWrapper = (props) => {
      return (
        <WordAnimation {...props}>{props.text}</WordAnimation>
      )
    }
    return (
    <div className="container">
      <div className="jumbotron word-animation-demo">
        <h1 ref={d => this.demoContainer = d}>
          <WordAnimationWrapper
            delay={this.state.delay}
            duration={this.state.duration}
            easing={this.state.easing}
            text={this.state.text}
            transform={this.state.transform}
          />
        </h1>
      </div>
      <div className="panel panel-default">
        <div className="panel-body">
      <form className="form-horizontal">
        <div className="form-group">
          <label htmlFor="animationText" className="col-sm-2 control-label">Text</label>
          <div className="col-sm-8">
            <input type="text" ref={(input) => this.input = input} className="form-control" id="animationText" defaultValue={this.state.text} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputDelay" className="col-sm-2 control-label">Delay</label>
          <div className="col-sm-8">
            <NumericInput id="inputDelay" name="inputDelay" ref={n => this.inputDelay = n} onChange={this.onChangeNumber} min={0} max={10} step={0.1} defaultValue={this.state.delay}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputDuration" className="col-sm-2 control-label">Duration</label>
          <div className="col-sm-8">
            <NumericInput id="inputDuration" name="inputDuration" ref={n => this.inputDuration = n} onChange={this.onChangeNumber} min={0} max={10} step={0.1} defaultValue={this.state.duration}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputTransform" className="col-sm-2 control-label">Transform</label>
          <div className="col-sm-8">
            <input type="text" ref={(input) => this.inputTransform = input} className="form-control" id="inputTransform" defaultValue={this.state.transform} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputEasing" className="col-sm-2 control-label">Easing</label>
          <div className="col-sm-8">
            <select ref={s => this.inputEasing = s} id="inputEasing" className="form-control" defaultValue={this.state.easing}>
              { easings.map((easing, index) => {
                return <option key={index} value={easing.value}>{easing.name}</option>
              }) }
            </select>
          </div>
        </div>
        <div className="form-group hide">
          <div className="col-sm-offset-2 col-sm-8">
            <div className="checkbox">
              <label>
                <input type="checkbox" /> Remember me
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-8">
            <button type="submit" onClick={this.handleSubmit} className="btn btn-default">Play Animation</button>
          </div>
        </div>
      </form>
    </div>
    </div>
    </div>
    )
  }
}

export default Demo
