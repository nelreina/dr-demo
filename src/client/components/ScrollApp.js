import React from "react";

class ScrollButton extends React.Component {
  constructor() {
    super();
    this.state = {
        intervalId: 0
    };
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
        clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }

  render () {
      return (
        <button
            title='Back to top' className='scroll'
            onClick={ () => { this.scrollToTop(); }}>
            <i className='fa fa-chevron-up'></i>
        </button>);
   }
}

export class ScrollApp extends React.Component {
  constructor() {
    super();
  }

  render() {
      return (
        <div>
          <ScrollButton scrollStepInPx="50" delayInMs="5"/>
        </div>
      );
  }
}
export default (ScrollApp);
