import React, { Component } from "react";
import "../css/desk.css";

import { TimelineMax, TimelineLite } from "gsap/TweenMax";

class Desk extends Component {
  state = {
    activePeriscope: null,
    heightDelta: null
  };

  componentDidMount() {
    var doctext = document.getElementsByTagName("html")[0].innerHTML;
    this.sourceCode.textContent = doctext;
    this.setupAnimations();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.activePeriscope && this.props.activePeriscope) {
      this.growToVideo();
    } else if (!this.props.activePeriscope && prevProps.activePeriscope) {
      this.shrinkFromVideo();
    }
    if (!prevProps.activeDesk && this.props.activeDesk) {
      this.showLinkAnimation.play();
    } else if (!this.props.activeDesk && prevProps.activeDesk) {
      this.showLinkAnimation.reverse();
    }
  }
  getNewHeight = () => {
    return window.innerHeight / 5 + this.props.heightDelta; //this.deskBackground.offsetHeight
  };
  setupAnimations() {
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
    this.growToLinkAnimation = new TimelineLite();
    this.growToLinkAnimation
      .to(this.deskBackground, 0.5, {
        height: "20%",
        "background-size": "100% 200%"
      })
      .to(this.deskBackground, 1, {
        height: () => this.getNewHeight(),
        backgroundPosition: "32% 20%",
        backgroundSize: "114% 200%"
      });
    this.growToLinkAnimation.pause();
  }
  growToVideo() {
    this.growToLinkAnimation.play();
  }

  shrinkFromVideo() {
    this.growToLinkAnimation.reverse();
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
            rel="noopener noreferrer"
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
                  on Github{" "}
                  <img
                    src={require("../images/git_mark.svg")}
                    alt="Git Hub mark"
                  />
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
