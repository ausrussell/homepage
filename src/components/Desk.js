import React, { Component } from "react";
import "../css/desk.css";
import Card from "./Card";

import {
  TimelineMax,
  TweenMax,
  TweenLite,
  Power2,
  TimelineLite,
  CSSPlugin
} from "gsap/TweenMax";

class Desk extends Component {
  state = {
    activePeriscope: null,
    heightDelta: null
  };
  sourceCode = null;
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setInitialBackground = new TimelineLite();
    this.setInitialBackground.to(this.deskBackground, 5, {
      height: "20%",
      "background-size": "100% 200%"
    });
    var doctext = document.getElementsByTagName("html")[0].innerHTML;
    this.sourceCode.textContent = doctext;
    this.showLinkAnimation = new TimelineMax();
    this.showLinkAnimation
      .to(this.card, 1, { backgroundColor: "rgba(240,230,250)" })
      .to(this.cardHolder, 1, { autoAlpha: 1 }, "-=1")
      .to(
        this.header,
        1,
        {
          color: "rgba(20,20,20)"
        },
        "-=1"
      )
      .to(this.content, 1, { autoAlpha: 1 }, "-=1");
    this.showLinkAnimation.pause();
  }
  componentDidUpdate(prevProps) {
    console.log("DESK this.props", prevProps, this.props);
    if (!prevProps.activePeriscope && this.props.activePeriscope) {
      console.log("activePeriscope", this.props.activePeriscope);
      this.growToVideo();
    } else if (!this.props.activePeriscope && prevProps.activePeriscope) {
      this.shrinkBackgroundBack();
    }
    // debugger;
    if (!prevProps.activeDesk && this.props.activeDesk) {
      this.showLinkAnimation.play();
    } else if (!this.props.activeDesk && prevProps.activeDesk) {
      this.showLinkAnimation.reverse();
    }
  }
  growToVideo() {
    console.log("heightDelta", this.props.heightDelta);
    let newHeight = window.innerHeight / 5 + this.props.heightDelta; //this.deskBackground.offsetHeight
    if (!this.animationTimeline) {
      this.animationTimeline = new TimelineLite();
      this.animationTimeline
        .to(this.deskBackground, 0.5, {
          height: "20%",
          "background-size": "100% 200%"
        })
        .to(this.deskBackground, 1, {
          height: newHeight,
          backgroundPosition: "32% 20%",
          backgroundSize: "114% 200%"
        });
    } else {
      this.animationTimeline.play();
    }
  }

  shrinkBackgroundBack() {
    this.animationTimeline.reverse();
  }
  handleOncomplete() {
    debugger;
  }
  render() {
    return (
      <div>
        <div
          className="background fade-in"
          ref={div => (this.deskBackground = div)}
        >
          <a
            className="git-card"
            href="https://github.com/ausrussell/homepage"
            ref={h => (this.cardHolder = h)}
            target="_blank"
          >
            <div className="ui card" ref={h => (this.card = h)}>
              <div className="content">
                <h2 className="card-1 ui header" ref={h => (this.header = h)}>
                  Code
                </h2>
                <div
                  className="code-link-content"
                  ref={h => (this.content = h)}
                >
                  on Github <img src={require("../images/git_mark.svg")} />
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="source-code-holder">
          <code className="source-code" ref={div => (this.sourceCode = div)} />
        </div>
      </div>
    );
  }
}

export default Desk;
