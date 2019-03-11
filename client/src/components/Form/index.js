import React from "react";

// This file exports the Input, TextArea, and FormBtn components
export function FormGroup(props) {
  return (
    <form className="input-wrapper mb-2" {...props} />
);
}

export function Label(props) {
  return (
    <label {...props} />
);
}

export function Input(props) {
  return (
      <input type="text" className="form-control" {...props} />
  );
}

export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control" rows="10" cols="100" {...props} />
    </div>
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
