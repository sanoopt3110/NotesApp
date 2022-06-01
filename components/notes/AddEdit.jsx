import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerNotes, updateNotes } from "store/slice";

const AddEdit = (props) => {
  const dispatch = useDispatch();
  const note = props?.note;
  const isAddMode = !note;
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    body: Yup.string().required("Body is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // set default form values if in edit mode
  if (!isAddMode) {
    formOptions.defaultValues = props.note;
  } else {
    formOptions.defaultValues = { title: "", body: "" };
  }
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    if (note) {
      reset(note);
    } else {
      reset(formOptions.defaultValues);
    }
  }, [note]);

  function onSubmit(data) {
    return isAddMode ? createNote(data) : updateNote(note.id, data);
  }

  function createNote(data) {
    return dispatch(registerNotes(data))
      .then(() => {
        toast.success("Notes added successfully");
        router.push(".");
        props?.setIsOpen && props.setIsOpen(false);
      })
      .catch(() => toast.error("Unexpected error occurred"));
  }

  function updateNote(id, data) {
    return dispatch(updateNotes({ id, params: data }))
      .then(() => {
        toast.success("Notes updated successfully");
        router.push("..");
        props?.setIsOpen && props.setIsOpen(false);
      })
      .catch(() => toast.error("Unexpected error occurred"));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <div className="form-group col">
          <label>Title</label>
          <input
            name="title"
            type="text"
            {...register("title")}
            className={`form-control mb-3 mt-2 ${
              errors.title ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback">{errors.title?.message}</div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col">
          <label>Body</label>
          <textarea
            name="body"
            type="text"
            {...register("body")}
            className={`form-control mb-3 mt-2 ${
              errors.body ? "is-invalid" : ""
            }`}
            rows="10"
          />
          <div className="invalid-feedback">{errors.body?.message}</div>
        </div>
      </div>
      <div className="form-group d-flex flex-row-reverse">
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="btn btn-primary float-end"
        >
          {formState.isSubmitting && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          {isAddMode ? "Save" : "Update"}
        </button>
      </div>
    </form>
  );
};

export { AddEdit };
