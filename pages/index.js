import { Fragment } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { BrowserScreen, MobileScreen } from "components/home";

const Home = () => {
  return (
    <Fragment>
      <BrowserView>
        <BrowserScreen></BrowserScreen>
      </BrowserView>
      <MobileView>
        <MobileScreen></MobileScreen>
      </MobileView>
    </Fragment>
  );
};

export default Home;
