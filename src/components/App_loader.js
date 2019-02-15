import React, { Component, Suspense } from "react";
// import Homepage from "./Homepage";
// import Loadable from "react-loadable";

const LoadingPage = () => {
  return <h4>Loading some art</h4>;
};

const Homepage = React.lazy(() => import("./Homepage"));
const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Homepage />
    </Suspense>
  );
};

export default App;

// const LoadableComponent = Loadable({
//   loader: () => import("./Homepage"),
//   loading: LoadingPage
// });
//
// export default class App extends React.Component {
//   render() {
//     return <LoadableComponent />;
//   }
// }
