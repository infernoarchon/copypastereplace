import React, { Component } from "react";
import API from "../utils/API";

class Home extends Component {
    testEnv = () => {
        API.sendText({
          document : {
              type: "PLAIN_TEXT",
              content: "In 1996, treasure hunter Brock Lovett and his team aboard the research vessel Akademik Mstislav Keldysh search the wreck of RMS Titanic for a necklace with a rare diamond, the Heart of the Ocean. They recover a safe containing a drawing of a young woman wearing only the necklace dated April 14, 1912, the day the ship struck the iceberg.[Note 1] Rose Dawson Calvert, the woman in the drawing, is brought aboard Keldysh and tells Lovett of her experiences aboard Titanic."
          }
        }).then(response => {
          console.log(response)
        })
      }
    render() {
    return(
        <div>
        <h1>Test Homepage</h1>
        <button onClick={this.testEnv}>Click Me!</button>
        </div>
    )
    }
}

export default Home;