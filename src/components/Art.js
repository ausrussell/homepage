import React, { Component } from "react";
import ArtPanel from "./ArtPanel";

import { TweenMax } from "gsap/TweenMax";
import "../css/art.css";
import "../css/app.css";

const panelData = [
  {
    id: 0,

    classCSS: "panel1",
    image: "waterlandscape", // needs a .jpg suffix in images
    left: 0.15, // * 100 if you need percentage
    top: 0.2
  },
  {
    id: 1,
    classCSS: "panel2",
    image: "self",
    left: 0.15
  },
  {
    id: 2,
    classCSS: "panel3",
    image: "mum_breakfast",
    left: 0.4
  },
  {
    id: 3,
    classCSS: "panel4",
    flap: "flap", //this holds the ref to the flap
    image: "lighthouse",
    left: 0.4
  },
  {
    id: 4,
    classCSS: "panel5",
    flap: "flap", //this holds the ref to the flap
    image: "jacqueline",
    left: 0.4
  },
  {
    id: 5,
    classCSS: "panel6",
    flap: "flap", //this holds the ref to the flap
    image: "ferry",
    left: 0.4
  },
  {
    id: 6,
    classCSS: "panel7",
    image: "gallery"
  },
  {
    id: 7,
    classCSS: "panel8",
    image: "pool"
  },
  {
    id: 8,
    classCSS: "panel9",
    image: "piano"
  },
  {
    id: 9,
    classCSS: "panel10",
    image: "couch"
  },
  {
    id: 10,
    classCSS: "panel11",
    image: "russianriver"
  },
  {
    id: 11,
    classCSS: "panel12",
    image: "merrit"
  }
];

class Art extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeArtPanel: null,
      holderActive: false
    };
    this.panels = [];
    this.eachPanelHolderRef = [];
    this.artArrayRef = [];
    this.artFlapRef = [];
    this.artImgRef = [];

    this.state = {
      width: 0,
      height: 0,
      holderDimensions: {
        width: -1,
        height: -1
      },
      artActive: null
    };
    this.panelsHolder = React.createRef();
  }

  componentDidMount() {
    // return;
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions.bind(this));
    TweenMax.to(this.artTitle, 0, {
      rotationY: -45,
      autoAlpha: 0.7
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeArt && !prevProps.activeArt) {
      this.setState({ holderActive: true });
      TweenMax.to(this.artTitle, 3, {
        rotationY: 0,
        autoAlpha: 1
      });
    } else if (!this.props.activeArt && prevProps.activeArt) {
      this.setState({ holderActive: false });
      TweenMax.to(this.artTitle, 3, {
        rotationY: -45,
        autoAlpha: 0.7
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener(
      "resize",
      this.updateWindowDimensions.bind(this)
    );
  }

  handleImageLoaded(event) {
    let imageHeight = event.currentTarget.offsetHeight;
    let imageWidth = event.currentTarget.offsetWidth;
    event.currentTarget.proportion = imageWidth / imageHeight;
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  getFullBackgroundPosition(index) {
    let parent = this.artFlapRef[index].offsetParent;
    let newLeft = this.state.width * 0.8 * panelData[index].left; //only need to update left value20; //
    return "-" + newLeft + "px -" + parent.offsetTop + "px";
  }

  handleArtClick = artID => {
    this.setState({ artActive: artID });
  };

  render() {
    return (
      <div className="panel-holder" ref={div => (this.panelsHolder = div)}>
        <h2 className="art-header ui header" ref={div => (this.artTitle = div)}>
          Art
        </h2>
        <div
          className="full-art-holder"
          ref={div => (this.fullArtHolder = div)}
        />

        {// map through the panels
        panelData.map(({ id, classCSS, image }) => (
          <ArtPanel
            key={id}
            id={id}
            classCSS={classCSS}
            image={image}
            holderActive={this.state.holderActive}
            hanldeArtClick={this.handleArtClick}
            artActive={this.state.artActive}
            fullArtsHolder={this.fullArtHolder}
          />
        ))}
      </div>
    );
  }
}

export default Art;
