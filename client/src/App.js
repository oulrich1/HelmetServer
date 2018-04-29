import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

const BTN_TEXT_RECORDING_ON = "Stop Recording";
const BTN_TEXT_RECORDING_OFF = "Start Recording";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordingOn: false,
      pictures: [],
      response: ''
    };
  }

  fetchExampleData()
  {
    fetch('https://randomuser.me/api/?results=10').then(results => {
      return results.json();
    }).then(data => {
      let pictures = data
        .results
        .map((pic) => {
          return (
            <div key={pic.results}>
              <img src={pic.picture.medium}/>
            </div>
          )
        });
      this.setState({pictures: pictures});
      console.log("state", this.state.pictures);
    });
  }

  expressClientServerExample()
  {
    this
      .callApi()
      .then(res => this.setState({response: res.express}))
      .catch(err => console.log(err));
  }
  callApi = async() => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) 
      throw Error(body.message);
    
    return body;
  };

  componentDidMount() {
    this.fetchExampleData();
    this.expressClientServerExample();
  }

  handleToggleRecording() {

    this.setState({
      recordingOn: !this.state.recordingOn
    });
  }

  render() {
    const buttonText = this.state.recordingOn
      ? BTN_TEXT_RECORDING_ON
      : BTN_TEXT_RECORDING_OFF;
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header> */}
        <p className="App-intro">
          <button
            id="toggleRecordingBtn"
            className="toggleBtn"
            onClick={() => this.handleToggleRecording()}>{buttonText}</button>
        </p>
        <p className="Intro">{this.state.response}</p>
        <div className="imageList">
          {this.state.pictures}
        </div>
      </div>
    );
  }
}

export default App;
