import React, { Component } from 'react';
import io from 'socket.io-client';

class App extends Component {
  state = {
    rgb: { r: 0, g: 0, b: 0 },
  };

  componentDidMount() {
    this.socket = io();

    this.socket.on('update', rgb => this.setState({ rgb }));
    this.socket.on('connection', rgb => this.setState({ rgb }));
  }

  getColor() {
    const { r, g, b } = this.state.rgb;

    return `rgb(${r},${g},${b})`;
  }

  handleChange = (color, value) => {
    this.setState({ rgb: { [color]: value } }, () =>
      this.socket.emit('color', color, value)
    );
  };

  render() {
    return (
      <div
        className="App"
        style={{
          width: '100vh',
          height: '100vh',
          backgroundColor: this.getColor(),
        }}
      >
        <div>
          <label htmlFor="r">Red</label>
          <input
            id="r"
            type="range"
            min="0"
            max="255"
            onChange={e => this.handleChange('r', e.target.value)}
            value={this.state.rgb.r}
          />
        </div>
        <div>
          <label htmlFor="g">Green</label>
          <input
            id="g"
            type="range"
            min="0"
            max="255"
            onChange={e => this.handleChange('g', e.target.value)}
            value={this.state.rgb.g}
          />
        </div>
        <div>
          <label htmlFor="b">Blue</label>
          <input
            id="b"
            type="range"
            min="0"
            max="255"
            onChange={e => this.handleChange('b', e.target.value)}
            value={this.state.rgb.b}
          />
        </div>
      </div>
    );
  }
}

export default App;
