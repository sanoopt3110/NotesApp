import Head from "next/head";
import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { wrapper } from "store/store";
import { ToastContainer } from "react-toastify";

import "styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { useSelector } from "react-redux";
import { userValueSelector } from "store/slice";
import { Nav } from "components/utils";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const userValue = useSelector(userValueSelector);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    setUser(userValue);
    const publicPaths = ["/account/login"];
    const path = url.split("?")[0];
    if (!userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/account/login",
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  }

  return (
    <>
      <Head>
        <title>My Notes</title>
      </Head>

      <div className={`app-container vh-100 ${user ? "bg-light" : ""}`}>
        <ToastContainer />
        {authorized && (
          <Fragment>
            <Nav />
            <Component {...pageProps} />
          </Fragment>
        )}
      </div>
    </>
  );
};

export default wrapper.withRedux(App);
