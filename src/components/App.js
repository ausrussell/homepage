import React, { Component } from "react";
import Loading from "./Loading";
import EdgePlane from "./EdgePlane";
import Periscope from "./Periscope";
import Desk from "./Desk";
import Work from "./Work";
import Art from "./Art";
import { TweenMax, TimelineLite } from "gsap/TweenMax";

import videos from "../videos/dawn.mov";
import { backgrounds } from "./image-data";

class App extends Component {
  state = {
    oldBackgroundClass: null,
    newBackgroundClass: null,
    approaching: null,
    x: 0,
    y: 0,
    activePlane: null,
    activeWork: null,
    activePeriscope: null,
    url: null,
    playing: null,
    videoTitle: null,
    heightDelta: null,
    imagesLoaded: false,
    sideAngle: 0
  };

  constructor(props) {
    super(props);
    this.backgroundElements = [];
    this.backgroundIndex = 0;
  }

  // componentDidMount() {
  //   if (this.state.imagesLoaded) {
  //     debugger;
  //   }
  // }
  // componentDidUpdate(prevProps) {
  //   if (!prevProps.imagesLoaded && this.props.imagesLoaded) {
  //   }
  // }
  imagesLoadedHandler = () => {
    this.setState({ imagesLoaded: true });
    this.interval = setInterval(() => this.changeBackground(), 5000);
    this.setHeightDelta();
    window.addEventListener("resize", this.handleResize.bind(this));
  };

  componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener("resize", this.handleResize.bind(this));
  }

  setupAnimations() {
    this.crossFadeBackgroundsToVideo = new TimelineLite();
    this.crossFadeBackgroundsToVideo
      .to(this.backgroundElements, 2, { autoAlpha: 0, scale: 1 })
      .to(this.skyVideoBackground, 2, { autoAlpha: 1 }, "-=2");
    this.crossFadeBackgroundsToVideo.pause();
  }
  changeBackground() {
    let prevIndex = this.backgroundIndex;
    if (this.backgroundIndex + 1 === this.backgroundElements.length) {
      this.backgroundIndex = 0;
    }
    TweenMax.to(this.backgroundElements[prevIndex], 2, {
      autoAlpha: 0,
      scale: 1
    });
    TweenMax.to(this.backgroundElements[this.backgroundIndex + 1], 1, {
      autoAlpha: 1,
      scale: 1.2
    });
    this.backgroundIndex++;
  }

  handleMouseEnter = plane => {
    console.log("handleMouseEnter", plane);
    this.setState(
      {
        activePlane: plane,
        activePeriscope: plane === this.topPlane
      },
      () => this.toggleRotatingBackgrounds()
    );
  };

  handleMouseLeave = e => {
    if (this.state.activePeriscope) {
      //allow watching of video and periscope if you mouse off browser
      return;
    }
    this.setState({ activePlane: null, activePeriscope: null }, () =>
      this.toggleRotatingBackgrounds()
    );
  };

  toggleRotatingBackgrounds() {
    console.log("toggleRotatingBackgrounds state", this.state);
    if (this.state.activePlane && this.state.activePeriscope) {
      // active  periscope so show video and hidebg
      console.log(">>play sky vid");
      TweenMax.to(this.skyVideoBackground, 2, { autoAlpha: 1 });
      TweenMax.to(this.backgroundElements, 2, { autoAlpha: 0 });
      // this.crossFadeBackgroundsToVideo.play();
      this.skyVideo.play();
      clearInterval(this.interval);
    } else if (this.state.activePlane) {
      // an active plane not periscope so hide bg
      console.log(">>hide bg");
      clearInterval(this.interval);
      this.hideBackgrounds();
      this.skyVideo.pause();
    } else {
      //no active plane
      this.interval = setInterval(() => this.changeBackground(), 5000);
    }
  }

  hideBackgrounds() {
    TweenMax.to(this.skyVideoBackground, 2, { autoAlpha: 0 });
    TweenMax.to(this.backgroundElements, 2, { autoAlpha: 0 });
  }

  handleResize(e) {
    console.log("handleResize");
    this.setHeightDelta();
  }
  setHeightDelta() {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    // Calculate angle of cards
    let hypo = Math.hypot(0.2 * windowWidth, 0.2 * windowHeight);
    let newHypo = Math.hypot(hypo, 0.2 * windowWidth);
    let newX = Math.sqrt(
      newHypo * newHypo + 0.2 * windowHeight * (0.2 * windowHeight)
    );
    let sin = (Math.asin((0.2 * windowWidth) / newX) * 180) / Math.PI;
    console.log("sin", sin);
    this.setState({ sideAngle: 90 - sin });
    let topBottomheightDelta =
      (0.6 * windowHeight - 0.5625 * 0.6 * windowWidth) / 2; //the amount the top and bottom backgrounds need to change when sky video plays
    this.setState({ heightDelta: topBottomheightDelta });
  }

  render() {
    const imagesLoaded = this.state.imagesLoaded;

    return (
      <div>
        {imagesLoaded ? (
          <div className="loaded-page">
            <div className="central-background" />
            {// map through the backgrounds
            backgrounds.map((element, index) => (
              <div
                key={element.id}
                className={`page-background ${element.name}`}
                ref={div => (this.backgroundElements[index] = div)}
              />
            ))}

            <div
              className="sky-video-background"
              ref={div => (this.skyVideoBackground = div)}
            >
              <div className="sky-video-holder">
                <video
                  ref={div => (this.skyVideo = div)}
                  width="100%"
                  height="100%"
                  loop
                  src={videos}
                  muted="muted"
                />
              </div>
            </div>

            <div className="page-holder">
              <div
                onMouseLeave={e => this.handleMouseLeave(e)}
                onMouseEnter={() => this.handleMouseEnter(this.topPlane)}
              >
                <EdgePlane
                  planeclass="planeTop"
                  activePlane={this.state.activePlane}
                  ref={p => (this.topPlane = p)}
                >
                  <Periscope
                    activePeriscope={this.state.activePlane === this.topPlane}
                    heightDelta={this.state.heightDelta}
                  />
                </EdgePlane>
              </div>
              <div
                onMouseLeave={() => this.handleMouseLeave()}
                onMouseEnter={() => this.handleMouseEnter(this.bottomPlane)}
              >
                <EdgePlane
                  planeclass="planeBottom"
                  activePlane={this.state.activePlane}
                  ref={p => (this.bottomPlane = p)}
                  recedeOverride={this.state.activePeriscope}
                >
                  <Desk
                    heightDelta={this.state.heightDelta}
                    activePeriscope={this.state.activePlane === this.topPlane}
                    activeDesk={this.state.activePlane === this.bottomPlane}
                  />
                </EdgePlane>
              </div>
              <div
                onMouseLeave={() => this.handleMouseLeave()}
                onMouseEnter={() => this.handleMouseEnter(this.leftPlane)}
              >
                <EdgePlane
                  planeclass="planeLeft"
                  activePlane={this.state.activePlane}
                  ref={p => (this.leftPlane = p)}
                  controlAnimation={true}
                >
                  <Work
                    activeWork={this.state.activePlane === this.leftPlane}
                    sideAngle={this.state.sideAngle}
                  />
                </EdgePlane>
              </div>
              <div onMouseEnter={() => this.handleMouseEnter(this.rightPlane)}>
                <EdgePlane
                  planeclass="planeRight"
                  activePlane={this.state.activePlane}
                  ref={p => (this.rightPlane = p)}
                  controlAnimation={true}
                >
                  <Art activeArt={this.state.activePlane === this.rightPlane} />
                </EdgePlane>
              </div>
            </div>
          </div>
        ) : (
          <Loading onImagesLoaded={() => this.imagesLoadedHandler()} />
        )}
      </div>
    );
  }
}

export default App;
