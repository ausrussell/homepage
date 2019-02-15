import React, { Component } from "react";
import { TweenLite, TimelineLite, Back } from "gsap/TweenMax";
import "../css/periscope.css";

class Periscope extends Component {
  state = {
    activePeriscope: null,
    ifrWidth: "100%",
    ifrHeight: "100%",
    url: null,
    playing: null,
    videoTitle: null,
    time: null
  };

  periscopeIframe = null;
  pipeVideoContainer = null;

  componentDidMount() {
    this.timerID = setInterval(() => this.updateTime(), 1000);
    TweenLite.set(this.pipeVideoContainer, { perspective: 800 });
    TweenLite.set(this.periscopeVideoCard, { autoAlpha: 0 });
    TweenLite.set(this.periscopeBackgroundCard, { autoAlpha: 0 });
    this.ifr.onload = () => {
      this.iFrameLoadHandler();
    };
  }

  updateTime() {
    let time = new Date();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    // console.log("update time");
    this.setState({
      time:
        (h % 12) +
        " : " +
        (m < 10 ? "0" + m : m) +
        " : " +
        (s < 10 ? "0" + s : s) +
        (h < 12 ? "am" : "pm")
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.activePeriscope && !prevProps.activePeriscope) {
      console.log("activePeriscope", this.props.activePeriscope);
      this.showFull();
      this.growBackgroundToVideo();
    } else if (prevProps.activePeriscope && !this.props.activePeriscope) {
      if (this.dropPeriscopeTween) {
        this.dropPeriscopeTween.reverse();
      }
      this.animationTimeline.reverse();
      this.showFullTween.reverse();
    }
  }

  growBackgroundToVideo() {
    let newHeight = window.innerHeight / 5 + this.props.heightDelta; //this.deskBackground.offsetHeight
    if (!this.animationTimeline) {
      this.animationTimeline = new TimelineLite();
      this.animationTimeline.to(this.background, 1, { height: newHeight });
    } else {
      this.animationTimeline.play();
    }
  }

  iFrameLoadHandler() {
    this.myTween = new TimelineLite();
    this.myTween
      .set(this.pipeVideoHolder, {
        transformStyle: "preserve-3d",
        rotationX: 45
      })
      .to(this.pipeVideoContainer, 1, {
        y: 200,
        delay: 2
      });
  }
  showFull() {
    if (!this.state.url) {
      this.setState({
        url: "https://youtu.be/NV8Vy9kc42U", //: "./videos/dawn.mp4",
        playing: true,
        videoTitle: "dawns"
      });
    }

    if (!this.showFullTween) {
      this.showFullTween = new TimelineLite();
      this.showFullTween.to(this.pipeVideoContainer, 1, {
        y: 300,
        ease: Back.easeInOut
      });
    } else {
      this.showFullTween.play();
    }
  }

  handleSwitchClick() {
    if (this.dropPeriscopeTween) {
      this.dropPeriscopeTween.reverse();
      this.dropPeriscopeTween = null;
    } else {
      this.dropPeriscope();
    }
  }
  dropPeriscope() {
    if (!this.dropPeriscopeTween) {
      this.dropPeriscopeTween = new TimelineLite();
      this.dropPeriscopeTween
        .to(this.switchCircle, 1.5, {
          attr: { cy: 68 },
          ease: Back.easeInOut
        })
        .to(
          this.pipeVideoHolder,
          1,
          {
            className: "+=periscope-video-holder--full",
            y: 50
          },
          "-=1"
        )

        .to(
          this.pipeVideoHolder,
          1,
          {
            rotationX: -0,
            transformOrigin: "left 95px",
            transformStyle: "preserve-3d",
            ease: Back.easeInOut,
            width: "40%"
          },
          "-=1"
        )
        .to(
          this.periscopeCone,
          1,
          {
            width: "600px"
            // height: "200px"
          },
          "-=1"
        )
        .to(
          this.periscopeRect,
          1,
          {
            width: "600px",
            height: "140px"
          },
          "-=1"
        )
        .to(this.pipeVideoHolder, 1, {
          rotationX: -360,
          transformOrigin: "left 95px",
          transformStyle: "preserve-3d",
          ease: Back.easeInOut,
          height: this.pipeVideoHolder.offsetWidth / 1.5
        });
    } else {
      this.dropPeriscope.play();
    }
  }
  render() {
    return (
      <div>
        <div className="background" ref={div => (this.background = div)} />
        <div
          className="pipe-video-container"
          ref={div => (this.pipeVideoContainer = div)}
        >
          <div className="periscope-pipe">
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="66.5px"
              height="82.5px"
              viewBox="0 0 66.5 82.5"
              enableBackground="new 0 0 66.5 82.5"
              xmlSpace="preserve"
              className="periscope-switch"
              onClick={e => this.handleSwitchClick()}
            >
              <path
                fill="#839594"
                d="M23.093,69.629V15.271c0-3.021,6.49-6.084,10.157-6.084S43.406,13,43.406,15.271v54.358
            	c0,6.556-4.547,11.871-10.156,11.871C27.64,81.5,23.093,76.185,23.093,69.629z"
              />
              <circle
                ref={div => (this.switchCircle = div)}
                cx="33"
                cy="18"
                r="20"
                fill="#61B872"
              />
            </svg>
          </div>
          <div
            className="periscope-cone"
            ref={div => (this.periscopeCone = div)}
          >
            <svg viewBox="0 0 500 300" className="periscope-title">
              <path
                id="curve"
                d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"
                fill="transparent"
                stroke="#000"
              />

              <text id="svg_text" textAnchor="middle" x={215}>
                <textPath xlinkHref="#curve">PERISCOPE</textPath>
              </text>
            </svg>
          </div>

          <div
            className="periscope-rect"
            ref={div => (this.periscopeRect = div)}
          />

          <div
            className="periscope-video-holder"
            ref={div => (this.pipeVideoHolder = div)}
          >
            <div
              className="periscope-background-card"
              ref={div => (this.periscopeBackgroundCard = div)}
            />

            <iframe
              title="Oakland periscope"
              className="periscope-iframe"
              ref={f => (this.ifr = f)}
              type="text/html"
              width={this.state.ifrWidth}
              height={this.state.ifrHeight}
              src="//video.nest.com/embedded/live/HwulsRjzQE?autoplay=1"
            />

            <svg viewBox="0 0 500 300" className="periscope-time">
              <path
                id="time-curve"
                d="M0.472,0c0,0,5.419,52.492,105.001,85
  	c96.637,31.547,241.315,32.682,336.122,0C534,53.146,542.393,0,542.393,0"
                fill="transparent"
                stroke="#99a1af"
              />

              <text id="svg_text" x={220}>
                <textPath xlinkHref="#time-curve">
                  Oakland time&nbsp;&nbsp;
                  {this.state.time}
                </textPath>
              </text>
            </svg>

            <div
              className="periscope-video-card"
              ref={div => (this.periscopeVideoCard = div)}
            />
          </div>
        </div>
      </div>
    );
  }
}

//width="480"
//height="394"

export default Periscope;
