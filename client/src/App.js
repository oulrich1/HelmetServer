import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Gallery from 'react-grid-gallery';
import CheckButton from 'react-grid-gallery';

const log = console.log;
const BTN_TEXT_RECORDING_ON = "Stop";
const BTN_TEXT_RECORDING_OFF = "Record";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'oriah',
      recordingOn: false,
      videoStills: [],

      images: [],
      selectAllChecked: false
    };

    this.onSelectImage = this.onSelectImage.bind(this);
    this.getSelectedImages = this.getSelectedImages.bind(this);
  }

  allImagesSelected (images) {
    var f = images.filter(
        function (img) {
            return img.isSelected == true;
        }
    );
    return f.length == images.length;
  }

  onSelectImage (index, image) {
    var images = this.state.images.slice();
    var img = images[index];
    if(img.hasOwnProperty("isSelected"))
        img.isSelected = !img.isSelected;
    else
        img.isSelected = true;

    this.setState({
        images: images
    });

    if(this.allImagesSelected(images)){
        this.setState({
            selectAllChecked: true
        });
    }
    else {
        this.setState({
            selectAllChecked: false
        });
    }
  }

  getSelectedImages () {
    var selected = [];
    for(var i = 0; i < this.state.images.length; i++)
        if(this.state.images[i].isSelected == true)
            selected.push(i);
    return selected;
  }


  fetchExampleData()
  {
    fetch('https://randomuser.me/api/?results=10').then(results => {
      return results.json();
    }).then(data => {
      let images = data
        .results
        .map((pic) => {
          return {
            src: pic.picture.large,
            thumbnail: pic.picture.medium,
            thumbnailWidth: 64,
            thumbnailHeight: 64,
            caption: "Test",
            isSelected: false
          };
        });
      this.setState({images: images});
      // console.log("state", this.state.pictures);
    });
  }

  callApi = async(endpoint) => {
    const response = await fetch(endpoint);
    const body = await response.json();
    if (response.status !== 200) 
      throw Error(body.message);
    return body;
  };

  fetchVideos(userName)
  {
    this
      .callApi('/videos?userName=' + userName)
      .then(res => {
        let videoStills = res.videos.map((video) => {
          return {
            src: video.thumb,
            thumbnail: video.thumb,
            thumbnailWidth: 48,
            thumbnailHeight: 48,
            caption: video.name
          };
        });
        this.setState({
          videoStills: videoStills
        });
      })
      .catch(err => console.log(err));
  }

  fetchImages(userName)
  {
    this
      .callApi('/images?userName=' + userName)
      .then(res => {
        let sampleImages = res.images.map((image) => {
          log(image);
          return {
            src: image,
            thumbnail: image,
            thumbnailWidth: 64,
            thumbnailHeight: 64,
            caption: ''
          };
        });
        this.setState({
          images: sampleImages
        });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    // this.fetchVideos(this.state.user);
    this.fetchImages(this.state.user);
    this.fetchExampleData();
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
        <h1>Helmet Camera</h1>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header> */}
        <p className="App-intro">
          <button
            id="toggleRecordingBtn"
            className="btn btn-primary btn-lg"
            onClick={() => this.handleToggleRecording()}>{buttonText}</button>
        </p>
        <div className="videosList" style={{
                    display: "block",
                    minHeight: "1px",
                    width: "65%",
                    margin: "auto",
                    border: "1px solid #ddd",
                    overflow: "auto"}}>
          <Gallery
              images={this.state.videoStills}
              rowHeight={48}
              enableLightbox={false}
              enableImageSelection={false}/>
            </div>
        <br/>

        <div style={{
                padding: "2px",
                color: "#666"
            }}>Selected images: {this.getSelectedImages().toString()}</div>
        <div className="userList" style={{
                    display: "block",
                    minHeight: "1px",
                    width: "65%",
                    margin: "auto",
                    border: "1px solid #ddd",
                    overflow: "auto"}}>
          <Gallery
              images={this.state.images}
              rowHeight={128}
              showLightboxThumbnails={true}
              onSelectImage={this.onSelectImage}
              />
        </div>
      </div>
    );
  }
}

export default App;
