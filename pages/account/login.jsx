import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Layout } from "components/account";
import { useDispatch } from "react-redux";
import { loginUser } from "store/slice";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data) => {
    return dispatch(loginUser(data))
      .then((res) => {
        // get return url from query parameters or default to '/'
        const returnUrl = router.query.returnUrl || "/";
        router.push(returnUrl);
      })
      .catch((e) => console.error(e));
  };

  return (
    <Layout>
      <div className="card">
        <h4 className="card-header">Login</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-4">
              <label className="mb-2">Username</label>
              <input
                name="username"
                type="text"
                {...register("username")}
                className={`form-control ${errors.username ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.username?.message}</div>
            </div>
            <div className="form-group mb-4">
              <label className="mb-2">Password</label>
              <input
                name="password"
                type="password"
                {...register("password")}
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <div className="form-group d-flex flex-row-reverse">
              <button disabled={formState.isSubmitting} className="btn btn-primary">
                {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
