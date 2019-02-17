import React from "react";

class PreloadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      src: null
    };
  }

  componentDidMount() {
    if (this.props.lazy && "IntersectionObserver" in window) {
      this.setObserver();
    } else {
      this.setPreloader();
    }
  }

  setObserver() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.setPreloader();
          this.observer.disconnect();
        }
      });
    });

    this.observer.observe(this.el);
  }

  setPreloader() {
    this.preloader = new Image();

    this.preloader.onload = () =>
      this.setState({
        loaded: true,
        src: `url(${this.props.src})`
      });

    this.preloader.src = this.props.src;
  }

  componentWillUnmount() {
    if (this.observer) this.observer.disconnect();
    this.preloader.onload = null;
  }

  render() {
    return (
      <div
        // Required: Relative, absolute, or fixed position
        // Required: Width & height (explicitly or via top/right/bottom/left)
        // Optional: Background color or placeholder image
        className={this.props.className}
        style={{ ...this.props.style }}
        ref={el => (this.el = el)}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage: this.state.src,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transition: `opacity ${this.props.duration || "300ms"} ${this.props
              .ease || "cubic-bezier(0.215, 0.61, 0.355, 1)"}`,
            opacity: this.state.loaded ? 1 : 0
          }}
        />
      </div>
    );
  }
}

const panelBackgrounds = [
  "../images/desk.jpg",
  "../images/waterlandscape.jpg",
  "../images/domestic_interior_1.jpg",
  "../images/domestic_interior_2.jpg"
];

const Loading = props => {
  let arrayHolder = panelBackgrounds;
  const imageLoadedHandler = panel => {
    let index = arrayHolder.indexOf(panel);
    arrayHolder.splice(index, 1);
    console.log("splice", panel);
    // arrayHolder.length === 0 && props.onImagesLoaded();
  };

  panelBackgrounds.map((panel, index) => {
    console.log("panelBackgrounds", panel);
    let image = new Image();
    image.onload = () => imageLoadedHandler(panel);
    image.src = panel;
  });

  return (
    <div className="page-holder loading">
      <div className="planeRight" />
      <PreloadImage
        style={{
          position: "relative",
          width: "100%",
          height: "200px",
          backgroundColor: "#CFB264"
        }}
        src="../images/waterlandscape.jpg"
        lazy
      />
      <div className="planeLeft" />
      <h3>Loading Some Art</h3>
      <div className="progress">
        <div className="indeterminate" />
      </div>
    </div>
  );
};

export default Loading;
