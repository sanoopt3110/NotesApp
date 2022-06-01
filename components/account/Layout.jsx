import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { userValueSelector } from "store/slice";

const Layout = ({ children }) => {
  const router = useRouter();
  const userValue = useSelector(userValueSelector);
  useEffect(() => {
    // redirect to home if already logged in
    if (userValue) {
      router.push("/");
    }
  }, []);

  return <div className="col-md-6 offset-md-3 mt-5">{children}</div>;
};

export { Layout };
