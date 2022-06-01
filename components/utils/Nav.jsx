import { useSelector, useDispatch } from "react-redux";
import { userValueSelector, logoutUser } from "store/slice";
import { Fragment } from "react";

const Nav = () => {
  const user = useSelector(userValueSelector);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <Fragment>
      {user ? (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav container-fluid">
            <div>
              <a exact className="nav-item nav-link">
                <b>Welcome</b> {user?.firstName} {user?.lastName}
              </a>
            </div>
            <div className="form-group d-flex flex-row-reverse">
              <a onClick={() => logout()} className="nav-item nav-link">
                Logout
              </a>
            </div>
          </div>
        </nav>
      ) : null}
    </Fragment>
  );
};

export { Nav };
