import React from "react";
import {
  TimelineMax,
  CSSPlugin,
  Sine,
  TweenMax,
  Elastic,
  Bounce,
  Back
} from "gsap/TweenMax";

class ArtPanel extends React.Component {
  state = {
    windowWidth: 0,
    windowHeight: 0,
    backgroundLeft: 0,
    backgroundTop: 0,
    holderActive: false
  };
  constructor(props) {
    super(props);
    this.aspectRatio = 0;
  }
  componentDidMount() {
    this.updateWindowDimensions();
    this.setBackgroundPosition();
    this.setUpAnimations();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }
  componentDidUpdate(prevProps) {
    if (this.props.holderActive && !prevProps.holderActive) {
      console.log("start card tween");
      this.setBackgroundPosition();
      this.setState({ holderActive: true });
      this.animatePanelHolderOpen();
    } else if (!this.props.holderActive && prevProps.holderActive) {
      this.panelEdgeOpenAnimation.reverse();
      this.imageFlyoutAnimation.reverse();
    }
    if (this.props.artActive != prevProps.artActive) {
      if (this.props.id == this.props.artActive) {
        // this.props.hanldeArtClick(this.props.id);
        this.imageFlyoutAnimation.play();
      } else {
        this.imageFlyoutAnimation.reverse();
      }
    }
  }

  getFullBackgroundPosition = () => {
    // debugger;
    console.log("this.state.windowWidth", this.state.windowWidth);
    console.log("this.panelHolder", this.panelHolder.offsetLeft);
    console.log(
      "this.panelHolder parent ",
      this.panelHolder.parentElement.offsetWidth
    );

    // let offsetLeftPercentage =
    let newLeft =
      this.state.windowWidth *
      0.8 *
      (this.panelHolder.offsetLeft /
        this.panelHolder.parentElement.offsetWidth); //only need to update left value20; //
    return "-" + newLeft + "px " + "-" + this.panelHolder.offsetTop + "px";
  };

  setUpAnimations() {
    TweenMax.to(this.panelHolder, 0, {
      rotationY: "-45%",
      transformStyle: "preserve-3d"
    });
    TweenMax.to(this.artFlap, 1, {
      rotationX: "5%",
      transformStyle: "preserve-3d"
    });
    //Animation for when EdgePlane is opening -- to maintain correct bg
    this.boundBackgroundPosition = this.getFullBackgroundPosition;
    this.panelEdgeOpenAnimation = new TimelineMax();
    this.panelEdgeOpenAnimation
      .to(this.artFlap, 3, {
        backgroundPosition: this.boundBackgroundPosition,
        rotationX: "10%",
        transformStyle: "preserve-3d"
      })
      .to(
        this.panelHolder,
        3,
        {
          rotationY: "0%"
        },
        "-=3"
      );
    this.panelEdgeOpenAnimation.pause();

    //for opening and closing flap
    this.flapAnimation = new TimelineMax();
    this.flapAnimation.to(this.artFlap, 1, {
      rotationX: "40%",
      transformOrigin: "top center",
      transformStyle: "preserve-3d",

      ease: Back.easeOut
    });
    this.flapAnimation.pause();

    this.flapReverseAnimation = TweenMax.delayedCall(1, () => {
      this.flapAnimation.reverse();
    });
    this.flapReverseAnimation.pause();

    //for image fly out
    this.boundArtWidth = this.getArtCoords;
    this.imageFlyoutAnimation = new TimelineMax();
    this.imageFlyoutAnimation
      .to(this.panelHolder, 0.1, {
        zIndex: 1
      })
      .to(this.artHolder, 1, {
        width: "100%",
        rotationX: "70%",
        transformStyle: "preserve-3d",
        z: 35,
        zIndex: 1,
        // height: 300,
        y: 100,
        ease: Sine.easeOut
      })

      .to(this.artHolder, 2, {
        rotationX: "0%",
        transformStyle: "preserve-3d",
        zIndex: 2,
        z: 350,
        ease: Sine.easeOut
      })
      .to(
        this.artHolder,
        3,
        {
          boxShadow: "0 0 0 14px rgb(66,66,66)",
          rotationY: "-360%",
          width: () => this.boundArtWidth().width,
          height: () => this.boundArtWidth().height,
          x: () => this.boundArtWidth().left,
          y: () => this.boundArtWidth().top,
          ease: Sine.easeOut,
          z: 300
        },
        "-=2"
      );
    this.imageFlyoutAnimation.pause();
  }

  handleWindowResize = () => {
    this.setBackgroundPosition();
    this.updateWindowDimensions();
  };

  updateWindowDimensions = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  };

  handleHolderEnter = event => {
    this.flapAnimation.play();
  };

  handleHolderLeave = event => {
    this.flapReverseAnimation.play();
  };

  setBackgroundPosition = () => {
    this.setState({
      backgroundLeft: this.panelHolder.offsetLeft,
      backgroundTop: this.panelHolder.offsetTop
    });
  };

  animatePanelHolderOpen() {
    this.panelEdgeOpenAnimation.play();
  }
  handleImageLoaded(event) {
    // debugger;
    let imageHeight = event.currentTarget.naturalHeight;
    let imageWidth = event.currentTarget.naturalWidth;
    this.aspectRatio = imageWidth / imageHeight;
    console.log("this.aspectRatio", this.aspectRatio);
  }
  handleArtClick(e) {
    this.props.hanldeArtClick(this.props.id);
    if (this.imageFlyoutAnimation.progress() > 0) {
      this.imageFlyoutAnimation.reverse();
    } else {
      this.imageFlyoutAnimation.play();
    }
  }

  getArtCoords = () => {
    let holder = this.props.fullArtsHolder;

    let holderWidth = holder.offsetWidth;
    let holderHeight = holder.offsetHeight;
    let useLandscapeFormat = this.aspectRatio > holderWidth / holderHeight;

    let width = useLandscapeFormat
      ? holderWidth
      : holderHeight * this.aspectRatio;
    let height = useLandscapeFormat
      ? holderWidth / this.aspectRatio
      : holderHeight;
    let leftOff = -this.panelHolder.offsetLeft + holder.offsetLeft;
    let left = useLandscapeFormat
      ? leftOff
      : leftOff + (holderWidth - width) / 2;
    let topOff = -this.panelHolder.offsetTop + holder.offsetTop;
    let top = useLandscapeFormat
      ? topOff + (holderHeight - height) / 4 //by 4 just to make it higher
      : topOff;
    console.log("coords", width, height, this.aspectRatio);

    return { width, height, left, top };
  };
  render() {
    let activityClass = "";
    if (this.props.artActive != null) {
      activityClass =
        this.props.artActive != this.props.id ? "receded" : "active";
    }

    return (
      <div
        key={this.props.id}
        className={`each-panel-holder ${this.props.classCSS} ${activityClass}`}
        ref={div => (this.panelHolder = div)}
        onMouseEnter={() => this.handleHolderEnter()}
        onMouseLeave={() => this.handleHolderLeave()}
        onClick={e => this.handleArtClick(e)}
      >
        <div
          className={`panel ${activityClass}`}
          ref={div => (this.artFlap = div)}
          style={{
            backgroundPosition: `-${this.state.backgroundLeft}px -${
              this.state.backgroundTop
            }px`
          }}
        />
        <div
          className="panel-art"
          ref={div => (this.artHolder = div)}
          onMouseEnter={() => this.handleHolderEnter()}
        >
          <img
            src={require("../images/" + `${this.props.image}` + ".jpg")}
            className="art-img"
            onLoad={e => this.handleImageLoaded(e)}
            ref={div => {
              this.artImgRef = div;
            }}
            onClick={e => this.handleArtClick(e)}
          />
        </div>
      </div>
    );
  }
}

export default ArtPanel;
