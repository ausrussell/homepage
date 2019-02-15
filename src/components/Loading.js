import React from "react";

const panelBackgrounds = [
  "desk",
  "waterlandscape",
  "domestic_interior_1",
  "domestic_interior_2"
];

const Loading = props => {
  let arrayHolder = panelBackgrounds;
  const imageLoadedHandler = panel => {
    let index = arrayHolder.indexOf(panel);
    arrayHolder.splice(index, 1);
    // arrayHolder.length === 0 && props.onImagesLoaded();
  };

  return (
    <div className="page-holder loading">
      <div className="planeRight" />
      <div className="planeLeft" />
      <h3>Loading Some Art</h3>
      <div className="progress">
        <div className="indeterminate" />
      </div>
      {// map through the backgrounds
      panelBackgrounds.map((panel, index) => (
        <img
          key={"image-" + index}
          src={require("../images/" + panel + ".jpg")}
          className="image-loader-holder"
          onLoad={e => imageLoadedHandler(panel)}
          alt={panel}
        />
      ))}
    </div>
  );
};

export default Loading;
