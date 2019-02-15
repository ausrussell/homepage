import React from "react";
import { TweenLite, TimelineLite } from "gsap/TweenMax";

class EdgePlane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      approaching: null,
      x: 0,
      y: 0,
      isAnimating: null,
      isReceded: false,
      activePeriscope: null,
      recedeOverride: false,
      controlAnimation: null
      // animationTimeline = null
    };
    this.animationTimeline = null;
  }

  setupTimelines() {}

  updateBgt() {
    this.plane
      .css(
        "-webkit-filter",
        "brightness(" +
          Math.floor(this.brightnessObj.brightness * 1000) / 1000 +
          ")"
      )
      .css(
        "filter",
        "brightness(" +
          Math.floor(this.brightnessObj.brightness * 1000) / 1000 +
          ")"
      );
  }
  componentDidMount() {
    // this.props.setAnimatePlane(this.animatePlane);
  }

  componentDidUpdate(prevProps) {
    console.log(
      "Edgeplane componentDidUpdate this.props",
      this.props,
      "active plane is",
      this.props.activePlane,
      "state",
      this.state
    );
    if (
      this.props.activePlane &&
      this.props.activePlane === this &&
      this.props.controlAnimation
    ) {
      //this plane is active
      switch (this.props.planeclass) {
        case "planeRight":
          this.animateRight();
          break;
        case "planeLeft":
          this.animateLeft();
          break;
        default:
          break;
      }
    } else if (
      this.props.activePlane !== this &&
      this.state.isAnimating &&
      this.props.controlAnimation
    ) {
      console.log("starting reverse for ", this);
      this.reverseAnimation();
    } else {
      // debugger;
    }
  }

  recedeOthers(notThis) {
    // debugger;
    console.log("recede", this.props.planeclass, "and all but", notThis);
    if (this.props.planeclass !== notThis) {
      this.recedeTimeline = TweenLite.to(this.plane, 1, {
        className: "+=receded"
      });
      if (!this.state.isReceded) this.setState({ isReceded: true });
      console.log("receded state", this.state);
    }
  }

  unrecedeOthers(notThis) {
    // debugger;
    console.log("recede", this.props.planeclass, "and all but", notThis);
    if (this.props.planeclass !== notThis) {
      this.recedeTimeline = TweenLite.to(this.plane, 1, {
        className: "-=receded"
      });
    }
  }

  reverseAnimation() {
    this.animationTimeline.reverse();
    // this.setState({ isAnimating: false });
  }

  animateRight() {
    console.log("animateRight");
    if (!this.state.isAnimating) {
      this.setState({ isAnimating: true });
      let call = this.handleReverseComplete;

      this.animationTimeline = new TimelineLite();
      this.animationTimeline.to(this.plane, 3, {
        width: "80%",
        y: 0
      });
      this.animationTimeline.eventCallback("onReverseComplete", call, [this]);
    } else {
      this.animationTimeline.play();
    }
  }

  animateLeft() {
    console.log("animateLeft");
    if (!this.state.isAnimating) {
      this.setState({ isAnimating: true });
      // this.animationTimeline = new TimelineLite();
      if (!this.animationTimeline) {
        this.animationTimeline = new TimelineLite();
      } else {
        this.animationTimeline.stop();
      }

      let call = this.handleReverseComplete;
      this.animationTimeline.to(this.plane, 3, {
        width: "80%"
      });
      this.animationTimeline.eventCallback("onReverseComplete", call, [this]);
    } else {
      this.animationTimeline.play();
    }
  }

  handleReverseComplete(thisPlane) {
    thisPlane.animationTimeline = null;
    thisPlane.setState({ isAnimating: false });
  }

  render() {
    const recede =
      this !== this.props.activePlane &&
      this.props.activePlane &&
      !this.props.recedeOverride
        ? " receded"
        : ""; // add receded class if another plane is active and there's no recedeOverride
    return (
      <div>
        <div
          ref={p => (this.plane = p)}
          className={this.props.planeclass + `${recede}`}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default EdgePlane;
