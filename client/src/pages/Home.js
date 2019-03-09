import React, { Component } from "react";
import API from "../utils/API";
import { Input, TextArea, FormBtn } from "../components/Form";
import { isDate } from "util";

class Home extends Component {
  state = {
    stories: []
  };
    handleFormSubmit = event => {
      event.preventDefault()
        API.sendText({
          document : {
              type: "PLAIN_TEXT",
              content: this.state.synopsis
          }
        }).then(response => {
          const ent = response.data.entities
          const tok = response.data.tokens
          let roots = tok.filter(function (o) {
            return o.dependencyEdge.label === "ROOT"
          })
          let dobjs = tok.filter(function (o) {
            return o.dependencyEdge.label === "DOBJ"
          })
          let amods = tok.filter(function (o) {
            return o.dependencyEdge.label === "AMOD"
          })
          // let salients = ent. 
          // var nouns = tok.filter(function (o) {
          //   return o.partOfSpeech.tag === "NOUN"
          // })
          // var verbs = tok.filter(function (o) {
          //   return o.partOfSpeech.tag === "VERB"
          // })
          // var adjectives = tok.filter(function (o) {
          //   return o.partOfSpeech.tag === "ADJ"
          // })
          // var adverbs = tok.filter(function (o) {
          //   return o.partOfSpeech.tag === "ADV"
          // })
          let masterList = []
          ent.forEach(function(e) {
            masterList.push(e.name)
            }
          )
          roots.forEach(function(e) {
            masterList.push(e.text.content)
            }
          )
          dobjs.forEach(function(e) {
            masterList.push(e.text.content)
            }
          )
          var masterUnique = Array.from(new Set(masterList))
          console.log(masterUnique)
          // console.log(nouns, verbs, adjectives, adverbs)
      })
      }
      
      handleInputChange = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { name, value } = event.target;
    
    
        // Set the state for the appropriate input field
        this.setState({
          [name]: value //NOTE: using a variable as a property name would set a new property
        });
      };
  

    
    render() {
    return(
        <div>
        <h1>Test Homepage</h1>
            <form>
              <TextArea name="synopsis" placeholder="Type here..." onChange={this.handleInputChange} />
              <FormBtn disabled={!this.state.synopsis ? true : false} onClick={this.handleFormSubmit}>Submit Story</FormBtn>
            </form>
        <br/>
        </div>
    )
    }
}

export default Home;