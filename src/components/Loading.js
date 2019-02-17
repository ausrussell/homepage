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
    console.log("splice", panel);
    arrayHolder.length === 0 && props.onImagesLoaded();
  };

  panelBackgrounds.map((panel, index) => {
    console.log("panelBackgrounds", panel);
    let image = new Image();
    image.onload = () => imageLoadedHandler(panel);
    image.src = "../images/" + panel + ".jpg";
  });

  return (
    <div className="page-holder loading">
      <div className="planeRight" />
      <div className="planeLeft" />
      <h3>Loading Some Art</h3>
      <div className="progress">
        <div className="indeterminate" />
      </div>
    </div>
  );
};

export default Loading;
