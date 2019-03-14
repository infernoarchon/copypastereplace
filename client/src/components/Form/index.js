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
      <input {...props} />
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

export function SearchBox(props) {
  return (
    <div className="input-group preset-search-container">
      <input type="text" className="form-control search-input" {...props} />
      <div className="input-group-append">
      <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-search"></i></button>
        <div className="dropdown-menu dropdown-menu-right">
          <a className="dropdown-item" href="#">Movies & Shows</a>
          <a className="dropdown-item" href="#">Books</a>
          <a className="dropdown-item" href="#">News Articles</a>
          <a className="dropdown-item" href="#">News Headlines</a>
        </div>
      </div>
    </div>
  );
}