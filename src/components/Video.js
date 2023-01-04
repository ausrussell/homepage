import React, { Component } from "react";
import ReactPlayer from "react-player";
import "../css/video.css";

class Video extends Component {
  state = {
    url: null,
    pip: false,
    playing: false,
    videoTitle: null,
    loop: true
  };
  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false
    });
  };

  componentDidUpdate(prevProps) {
    // console.log("VIDEO this.props", prevProps, this.props);

    if (
      this.props.playing &&
      (!prevProps.playing || this.props.url !== prevProps.url)
    ) {
      this.setState({
        url: this.props.url,
        playing: this.props.playing,
        videoTitle: this.props.videoTitle
      });
    }
  }
  playPause = () => {
    this.setState({ playing: !this.state.playing });
  };
  stop = () => {
    this.setState({ url: null, playing: false });
  };

  ref = player => {
    this.player = player;
  };
  render() {
    const { url, playing, loop = true, pip } = this.state;

    return (
      <div
        className={`video-holder ${this.props.cssClass}`}
        ref={vh => (this.videoHolder = vh)}
      >
        <div className="ui header">{this.props.videoTitle}</div>
        <div className="player-wrapper">
          <ReactPlayer
            ref={this.ref}
            className="react-player"
            width="100%"
            height="100%"
            url={url}
            pip={pip}
            playing={playing}
            loop={loop}
          />
        </div>
        {this.props.url && (
          <div className="video-controls">
            <button className="ui button" onClick={this.playPause}>
              {playing ? "Pause" : "Play"}
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Video;
