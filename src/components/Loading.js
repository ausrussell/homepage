import React from "react";

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
    arrayHolder.length === 0 && props.onImagesLoaded();
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
      <div className="planeLeft" />
      <h3>Loading Some Art</h3>
      <div className="progress">
        <div className="indeterminate" />
      </div>
    </div>
  );
};

export default Loading;
