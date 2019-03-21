import React from "react";

// This file exports the Input, TextArea, and FormBtn components
export function FormGroup(props) {
  return (
    <div className="input-wrapper" {...props} />
);
}

export function Label(props) {
  return (
    <label className="input-label" {...props} />
);
}

export function Input(props) {
  return (
    <div className="input-group">
      <input className="w-25" {...props} />
      {/* <div className="input-group-append">
        <button className="btn btn-outline-primary ml-1" type="button">Submit</button>
      </div> */}
    </div>
  );
}

export function TextArea(props) {
  return (
    <form className="form-group mt-3">
      <textarea className="form-control" rows="10" cols="100" {...props} />
    </form>
  );
}

export function FormBtn(props) {
  return (
    <div className="input-group-append">
      <button type="submit" value="Submit" {...props} className="btn btn-primary">
        {props.children}
      </button>
    </div>
  );
}
export function IconItem(props) {
  return(
  <button className="dropdown-item" type="button" {...props}></button>
  );
}

export function IconIcon(props) {
  return(
  <i {...props}></i>
  );
}
