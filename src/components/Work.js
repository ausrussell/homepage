import React, { Component } from "react";
import "../css/work.css";
import { gsap } from "gsap";
import Card from "./Card";
import Video from "./Video";
import pdf from "../files/Russell_Ward_resume_December_2022.pdf";

const WorkContent = (props) => {
  return (
    <div className="ui card">
      <div className="content">{props.children}</div>
    </div>
  );
};

const LinkItem = ({
  link,
  linkBody,
  overrideLink,
  alt,
  imgSRC,
  header,
  subheader,
  handleSchoolClick,
}) => {
  return (
    <a
      className="item"
      href={link}
      onClick={(e) => handleSchoolClick(e, overrideLink)}
    >
      <img className="left floated mini ui image" alt={alt} src={imgSRC} />
      <div className="content">
        <div className="header">{header}</div>
        {linkBody && <div class="description">{linkBody}</div>}
        {subheader}
      </div>
    </a>
  );
};

const Iframe = ({ source, cssClass, overrideLink }) => {
  const src = source;
  return (
    // basic bootstrap classes. you can change with yours.
    <div className={`school-iframe ${cssClass}`}>
      <iframe src={source} title="work sample" />
      <div className="iframe-link">
        <a target="school" href={overrideLink || src}>
          Open in new tab <i className="external alternate icon" />
        </a>
      </div>
    </div>
  );
};

class Work extends Component {
  state = {
    approaching: null,
    url: null,
    playing: null,
    videoTitle: null,
    activeWork: null,
    iframeSrc: null,
    overrideLink: null,
  };
  constructor() {
    super();
    this.cards = [];
  }

  componentDidMount() {
    this.setUpAnimations();
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeWork && !prevProps.activeWork) {
      console.log("start card tween");
      this.cardsAnimation.play();
    } else if (!this.props.activeWork && prevProps.activeWork) {
      this.cardsAnimation.reverse();
      this.showWorkAnimation.reverse();
      this.setState({ url: null, iframeSrc: null });
    }
  }

  getCardAngle = () => {
    return this.props.sideAngle;
  };

  setUpAnimations() {
    let tl = gsap.timeline();
    tl.set(this.col1, { perspective: 800 });
    this.initialCardsState = gsap.timeline();
    this.initialCardsState.to(this.cards, {
      duration: 0.5,
      transformStyle: "preserve-3d",
      rotationY: () => this.getCardAngle(),
      autoAlpha: 0.7,
      transformOrigin: "left top",
    });
    // fades in work area
    this.showWorkAnimation = gsap.timeline();
    this.showWorkAnimation.to(this.workHolder, { duration: 1, autoAlpha: 1 });
    this.showWorkAnimation.pause();
    //straightens out cards
    this.cardsAnimation = gsap.timeline();
    this.cardsAnimation.to(this.cards, {
      duration: 3,
      rotationY: 0,
      autoAlpha: 1,
      // transform: "translate3d(0,0,0)"
    });
    this.cardsAnimation.pause();
  }

  handleClick(url, videoTitle) {
    if (url !== this.state.url) {
      this.setState({
        url: url,
        playing: true,
        videoTitle: videoTitle,
        iframeSrc: null,
      });
    }
    this.showWorkAnimation.play();
  }

  handleSchoolClick = (event, overrideLink) => {
    event.preventDefault();
    this.showWorkAnimation.play();
    // let iframeUrl = overrideLink || event.currentTarget.href;
    console.log("overrideLink", overrideLink);
    this.setState({
      iframeSrc: event.currentTarget.href,
      url: null,
      overrideLink,
    });
  };
  setVideo = (src, videoTitle) => {
    this.setState({ url: src, playing: true, videoTitle: videoTitle });
  };
  render() {
    const activeWorkContent = this.state.url ? "video" : "iframe";
    return (
      <div className="work-wrapper">
        <div className="work-container">
          <div className="work-col1" ref={(c) => (this.col1 = c)}>
            <h2 className="card-1 ui header" ref={(c) => this.cards.push(c)}>
              Work
            </h2>

            <div className="card-1" ref={(c) => this.cards.push(c)}>
              <Card>
                <div className="header">2021 - 2022 </div>
                <div>Click for previews of some recent work</div>
                <div className="ui middle aligned divided list">
                  <LinkItem
                    link="https://hangar.social/"
                    alt="https://hangar.social/"
                    imgSRC="../images/horseLogo.png"
                    header="a world of 3d galleries"
                    linkBody="built with React, Redux, Three"
                    subheader="Hangar.social"
                    handleSchoolClick={this.handleSchoolClick}
                  />
                  <LinkItem
                    link="https://hangar.social/"
                    alt="https://hangar.social/"
                    imgSRC="../images/safari-pinned-tab.svg"
                    header="helping home owners build"
                    linkBody="Front End created with VUE"
                    subheader="MyPad"
                    handleSchoolClick={this.handleSchoolClick}
                  />
                  <LinkItem
                    link="https://uscpr.org/map/"
                    overrideLink="https://uscpr.org/activist-resource/us-military-funding-to-israel-map/"
                    alt="U.S. Military Funding to Israel Map"
                    imgSRC="../images/uscpr_logo.png"
                    header="interactive map"
                    linkBody="and the database behind it"
                    subheader="USCPR military funding map"
                    handleSchoolClick={this.handleSchoolClick}
                  />
                </div>
              </Card>
            </div>

            <div className="card-1" ref={(c) => this.cards.push(c)}>
              <Card>
                <h2 className="header">UI for a CMS</h2>I built the CMS in
                Javascript used by 1000s of schools for accessible, responsive
                websites and portals.
                <div className="play-holder">
                  <button
                    onClick={(e) =>
                      this.handleClick(
                        "https://youtu.be/0Zirpe4nuwA",
                        "A CMS and website builder"
                      )
                    }
                    className="ui button active"
                  >
                    <i className="play icon" />
                    Play
                  </button>
                </div>
                <h4>Live Sites</h4>
                <div className="ui middle aligned divided list">
                  <LinkItem
                    link="https://alameda-aps-nm.schoolloop.com/"
                    alt="Wood Canoyon logo"
                    imgSRC="../images/horseLogo.png"
                    header="Alameda, Albuquerque"
                    subheader="Elementary School"
                    handleSchoolClick={this.handleSchoolClick}
                  />
                  <LinkItem
                    link="https://btb.lausd.net/"
                    alt="Beyond the Bell LAUSD logo"
                    imgSRC="https://btb-lausd-ca.schoolloop.com/uimg/file/1500178972311/1346924393783/8523245557304495102.svg"
                    header="Los Angeles, California"
                    subheader="Expanded Day Programs"
                    handleSchoolClick={this.handleSchoolClick}
                  />
                  <LinkItem
                    link="https://shs-bcss-ga.schoolloop.com/"
                    alt="Statesboro HS logo"
                    imgSRC="../images/statesboroLogo.png"
                    header="Statesboro, Georgia"
                    subheader="High School"
                    handleSchoolClick={this.handleSchoolClick}
                  />
                  <LinkItem
                    link="https://ahs-amsd-nm.schoolloop.com/"
                    alt="Aztec HS logo"
                    imgSRC="../images/aztec_logo.png"
                    header="Aztec, New Mexico"
                    subheader="High School"
                    handleSchoolClick={this.handleSchoolClick}
                  />
                </div>
              </Card>
            </div>

            <div className="card-1" ref={(c) => this.cards.push(c)}>
              <Card>
                <div className="header">Prototypes</div>
                <div className="ui middle aligned divided list">
                  <LinkItem
                    link="https://russellward406402.invisionapp.com/prototype/designed-proto-v4-3-clickable-ck2qjs03q00k1jq01s13j79rg"
                    alt="Casa logo"
                    imgSRC="../images/casa_logo.png"
                    header="Made with InVision"
                    subheader="CASA, a start-up"
                    handleSchoolClick={this.handleSchoolClick}
                  />
                </div>
              </Card>
            </div>
            <div className="card-1" ref={(c) => this.cards.push(c)}>
              <Card>
                <div className="header">Handbags</div>
                Here's a video of the UI I made for a Build Your Own Handbag web
                app a few years back
                <div className="play-holder">
                  <button
                    onClick={(e) =>
                      this.handleClick(
                        "https://www.youtube.com/watch?v=2KYXXdj8DOs",
                        "How to build a bag"
                      )
                    }
                    className="ui button active"
                  >
                    <i className="play icon" />
                    Play
                  </button>
                </div>
              </Card>
            </div>
            <div className="card-1" ref={(c) => this.cards.push(c)}>
              <Card>
                <div className="header">Resume</div>
                <a href={pdf} target="cv">
                  Click here for my resume&nbsp;
                  <i className="external alternate icon" />
                </a>
              </Card>
            </div>
          </div>
          <div className="work-col2">
            <div
              ref={(wc) => (this.workHolder = wc)}
              className="video-container"
            >
              <WorkContent>
                <Video
                  cssClass={activeWorkContent}
                  url={this.state.url}
                  playing={this.state.playing}
                  videoTitle={this.state.videoTitle}
                />
                <Iframe
                  source={this.state.iframeSrc}
                  overrideLink={this.state.overrideLink}
                  cssClass={activeWorkContent}
                />
              </WorkContent>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Work;
