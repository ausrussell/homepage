import React, { Component } from "react";
import "../css/work.css";
import {
  TweenMax,
  TweenLite,
  Power2,
  TimelineLite,
  CSSPlugin
} from "gsap/TweenMax";
import Card from "./Card";

import Video from "./Video";
import pdf from "../files/russell_ward_resume_2019.pdf";

const WorkContent = props => {
  return (
    <div className="ui card">
      <div className="content">{props.children}</div>
    </div>
  );
};

const LinkItem = ({
  link,
  alt,
  imgSRC,
  header,
  subheader,
  handleSchoolClick
}) => {
  return (
    <a className="item" href={link} onClick={e => handleSchoolClick(e)}>
      <img className="ui avatar image" alt={alt} src={imgSRC} />
      <div className="content">
        <div className="header">{header}</div>
        {subheader}
      </div>
    </a>
  );
};

const Iframe = ({ source, cssClass }) => {
  const src = source;
  return (
    // basic bootstrap classes. you can change with yours.
    <div className={`school-iframe ${cssClass}`}>
      <iframe src={src} />
      <div className="iframe-link">
        <a target="school" href={src}>
          Open in new tab <i className="external alternate icon" />
        </a>
      </div>
    </div>
  );
};

class Work extends React.Component {
  state = {
    approaching: null,
    url: null,
    playing: null,
    videoTitle: null,
    activeWork: null,
    iframeSrc: null
  };
  constructor() {
    super();
    this.cards = [];
  }

  componentDidMount() {
    this.setUpAnimations();
  }

  setUpAnimations() {
    TweenLite.set(this.col1, { perspective: 800 });
    this.initialCardsState = new TimelineLite();
    this.initialCardsState.to(this.cards, 0.5, {
      transformStyle: "preserve-3d",
      rotationY: 45,
      autoAlpha: 0.7
    });
    // fades in work area
    this.showWorkAnimation = new TimelineLite();
    this.showWorkAnimation.to(this.workHolder, 1, { autoAlpha: 1 });
    this.showWorkAnimation.pause();
    //straightens out cards
    this.cardsAnimation = new TimelineLite();
    this.cardsAnimation.to(this.cards, 3, {
      rotationY: 0,
      autoAlpha: 1,
      transform: "translate3d(0,0,0)"
    });
    this.cardsAnimation.pause();
  }

  componentDidUpdate(prevProps) {
    console.log("WORK this.props", prevProps, this.props, this.state);

    if (this.props.activeWork && !prevProps.activeWork) {
      console.log("start card tween");
      this.cardsAnimation.play();
    } else if (!this.props.activeWork && prevProps.activeWork) {
      this.cardsAnimation.reverse();
      this.showWorkAnimation.reverse();
      this.setState({ url: null, iframeSrc: null });
    }
  }

  handleClick(url, videoTitle) {
    if (url !== this.state.url) {
      this.setState({
        url: url,
        playing: true,
        videoTitle: videoTitle,
        iframeSrc: null
      });
    }
    this.showWorkAnimation.play();
  }

  handleSchoolClick = event => {
    event.preventDefault();
    this.showWorkAnimation.play();
    this.setState({ iframeSrc: event.currentTarget.href, url: null });
  };
  setVideo = (src, videoTitle) => {
    this.setState({ url: src, playing: true, videoTitle: videoTitle });
  };
  render() {
    const activeWorkContent = this.state.url ? "video" : "iframe";
    return (
      <div className="work-wrapper">
        <div className="work-container">
          <div className="work-col1" ref={c => (this.col1 = c)}>
            <h2 className="card-1 ui header" ref={c => this.cards.push(c)}>
              Work
            </h2>
            <div className="card-1" ref={c => this.cards.push(c)}>
              <Card>
                <h2 className="header">Make websites</h2>
                Thousands of school websites are being built by teachers and
                staff using the UI I created with Javascript. Dear Bob narrates
                how easy it is.
                <div className="play-holder">
                  <button
                    onClick={e =>
                      this.handleClick(
                        "https://schoolloop.wistia.com/medias/xu5t3jbhq1",
                        "A CMS and website builder"
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
            <div className="card-1" ref={c => this.cards.push(c)}>
              <Card>
                <div className="header">Live sites made with my maker</div>
                <div className="ui middle aligned divided list">
                  <LinkItem
                    link="https://wces-capousd-ca.schoolloop.com"
                    alt="Wood Canoyon logo"
                    imgSRC="https://cdn.schoolloop.com/uimgcdn/aHR0cHM6Ly93Y2VzLWNhcG91c2QtY2Euc2Nob29sbG9vcC5jb20vdWltZy9maWxlLzE1MDAxNzg5NzQzODYvMTIxOTg5MzA1ODg5MS82ODkwMzM5Mjk5NzQyNzEyNTA5LnBuZw=="
                    header="Wood Canyon"
                    subheader="Academy of Arts"
                    handleSchoolClick={this.handleSchoolClick}
                  />
                  <LinkItem
                    link="https://btb.lausd.net/"
                    alt="Beyond the Bell LAUSD logo"
                    imgSRC="https://btb-lausd-ca.schoolloop.com/uimg/file/1500178972311/1346924393783/8523245557304495102.svg"
                    header="Beyond the Bell LAUSD"
                    subheader="Expanded Day Programs"
                    handleSchoolClick={this.handleSchoolClick}
                  />
                  <LinkItem
                    link="https://www.husd.us"
                    alt="Hayward USD logo"
                    imgSRC="https://pbs.twimg.com/profile_images/890247040365731840/uaBbA-EX_400x400.jpg"
                    header="Hayward"
                    subheader="Unified School District"
                    handleSchoolClick={this.handleSchoolClick}
                  />
                  <LinkItem
                    link="https://capousd-ca.schoolloop.com"
                    alt="Capistrano USD logo"
                    imgSRC="http://www.goboinfo.com/Logo-Repository/capistrano_usd_500.png"
                    header="Capistrano"
                    subheader="Unified School District"
                    handleSchoolClick={this.handleSchoolClick}
                  />
                </div>
              </Card>
            </div>
            <div className="card-1" ref={c => this.cards.push(c)}>
              <Card>
                <div className="header">Handbags</div>
                Here's a video of the UI I made in Actionscript for a Build Your
                Own Handbag web app a few years
                <div className="play-holder">
                  <button
                    onClick={e =>
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
            <div className="card-1" ref={c => this.cards.push(c)}>
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
            <div ref={wc => (this.workHolder = wc)} className="video-container">
              <WorkContent>
                <Video
                  cssClass={activeWorkContent}
                  url={this.state.url}
                  playing={this.state.playing}
                  videoTitle={this.state.videoTitle}
                />
                <Iframe
                  source={this.state.iframeSrc}
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
