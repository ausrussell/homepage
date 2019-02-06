import React, { Component } from "react";
import EdgePlane from "./EdgePlane";
import Periscope from "./Periscope";
import Desk from "./Desk";
import Work from "./Work";
import Video from "./Video";
import Art from "./Art";
import {
  TweenMax,
  TweenLite,
  Power2,
  TimelineLite,
  CSSPlugin
} from "gsap/TweenMax";

import videos from "../videos/dawn.mov";
// import videos from "../videos/WorkingwithModules.mp4";

const backgrounds = [
  { id: "1b", name: "sheepme" },
  { id: "2b", name: "queenme" },
  { id: "3b", name: "obamame" },
  { id: "4b", name: "pikame" },
  { id: "5b", name: "pumpkinme" },
  { id: "6b", name: "warholme" }
];

class App extends React.Component {
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
    recedeOverride: false
  };

  skyVideoBackground;
  constructor(props) {
    super(props);
    this.backgroundElements = [];
    this.boundHandleMouseLeave = evt => this.handleMouseLeave;
    this.boundHandleMouseEnter = evt => this.handleMouseEnter;
    this.backgroundIndex = 0;
  }

  componentDidMount() {
    this.interval = setInterval(() => this.changeBackground(), 5000);
    this.setupAnimations();
    this.setHeightDelta();

    window.addEventListener("resize", this.handleResize.bind(this));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setupAnimations() {
    this.crossFadeBackgroundsToVideo = new TimelineLite();
    this.crossFadeBackgroundsToVideo
      .to(this.backgroundElements, 2, { autoAlpha: 0, scale: 1 })
      .to(this.skyVideoBackground, 2, { autoAlpha: 1 }, "-=2");
    // this.crossFadeBackgroundsToVideo.eventCallback("onComplete", () =>
    //   this.playVideo()
    // );
    this.crossFadeBackgroundsToVideo.pause();
  }
  changeBackground() {
    console.log("changeBackground");
    let prevIndex = this.backgroundIndex;
    if (this.backgroundIndex + 1 == this.backgroundElements.length) {
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
    if (this.state.activePeriscope && this.topPlane === plane) {
      return;
    }

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
      this.setState({ recedeOverride: true });
      TweenMax.to(this.skyVideoBackground, 2, { autoAlpha: 1 });
      TweenMax.to(this.backgroundElements, 2, { autoAlpha: 0 });
      // this.crossFadeBackgroundsToVideo.play();
      this.skyVideo.play();

      clearInterval(this.interval);
    } else if (this.state.activePlane) {
      // an active plane not periscope so hide bg
      console.log(">>hide bg");
      clearInterval(this.interval);
      this.setState({ heightDelta: null });
      TweenMax.to(this.skyVideoBackground, 2, { autoAlpha: 0 });
      TweenMax.to(this.backgroundElements, 2, { autoAlpha: 0, scale: 1 });
      this.skyVideo.pause();
    } else {
      //no active plane
      console.log(">>play bg");

      TweenMax.to(this.skyVideoBackground, 2, { autoAlpha: 0 });
      TweenMax.to(this.backgroundElements, 2, { autoAlpha: 0 });

      // TweenMax.to(this.backgroundElements, 2, { autoAlpha: 0, scale: 1 });
      this.interval = setInterval(() => this.changeBackground(), 5000);
    }
  }

  playVideo = thisApp => {
    console.log("start playing");
    this.skyVideo.pause();
    this.skyVideo.play();
  };

  handleResize(e) {
    this.setHeightDelta();

    // if (this.activePeriscope) this.setHeightDelta();
  }
  setHeightDelta() {
    let windowWidth = window.innerWidth; //this.backgroundElements[0].offsetWidth;
    let windowHeight = window.innerHeight;
    let topBottomheightDelta =
      (0.6 * windowHeight - 0.5625 * 0.6 * windowWidth) / 2; //the amount the top and bottom backgrounds need to change
    this.setState({ heightDelta: topBottomheightDelta });
  }

  render() {
    return (
      <div>
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
              activePeriscope={this.state.activePlane === this.topPlane}
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
              activePeriscope={this.state.activePlane === this.topPlane}
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
              activePeriscope={this.state.activePlane === this.topPlane}
              ref={p => (this.leftPlane = p)}
              controlAnimation={true}
            >
              <Work activeWork={this.state.activePlane === this.leftPlane} />
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
    );
  }
}

export default App;
