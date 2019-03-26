import React, {Component} from "react";


class Chart extends Component {
    render() {
        console.log(this.props)
    return(
      <div className="progress" style={{height: '36px'}}>
                                  
        <div className="progress-bar" role="progressbar" style={{width: "66%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{this.props.percentage}</div>
  
      </div>
    );
}
}

  export default Chart