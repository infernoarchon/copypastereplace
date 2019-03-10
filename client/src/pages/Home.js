import React, { Component } from "react";
import API from "../utils/API";
import { Input, TextArea, FormBtn } from "../components/Form";
import { isDate } from "util";

class Home extends Component {
  state = {
    stories: []
  };
    getWords = (token) => {
      let masterList = [];
      const wordTypes =["VMOD","DOBJ","POBJ","AMOD","NN","RCMOD","APPO","NSUBJ","XCOMP"]
      wordTypes.forEach(d => {
        let filteredArr = token.filter(function(o) {
          return o.dependencyEdge.label === d
        })
        filteredArr.forEach(e => {
          masterList.push(e.text.content + " (" + d + ")")
        })
      })
      return masterList
    }
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

          //Make these a switch case
          

          console.log(this.getWords(tok))
       
          // let vmods = tok.filter(function (o) {
          //   return o.dependencyEdge.label === "VMOD"
          // })
          // let dobjs = tok.filter(function (o) {
          //   return o.dependencyEdge.label === "DOBJ"
          // })
          // let pobjs = tok.filter(function (o) {
          //   return o.dependencyEdge.label === "POBJ"
          // })
          // let amods = tok.filter(function (o) {
          //   return o.dependencyEdge.label === "AMOD"
          // })
          // let nns = tok.filter(function (o) {
          //   return o.dependencyEdge.label === "NN"
          // })
          // let rcmods = tok.filter(function (o) {
          //   return o.dependencyEdge.label === "RCMOD"
          // })
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
          // console.log(response)
          // let masterList = []
          // roots.forEach(function(e) {
          //   masterList.push(e.text.content + " (ROOT Verb)")
          //   //Verb Type
          //   }
          // )
          // vmods.forEach(function(e) {
          //   masterList.push(e.text.content + " (VMOD Verb)")
          //   //Verb Type
          //   }
          // )

          // dobjs.forEach(function(e) {
          //   masterList.push(e.text.content + " (DOBJ Noun)")
          //   //Noun Type
          //   //Remove Proper nouns
          //   }
          // )
          // pobjs.forEach(function(e) {
          //   masterList.push(e.text.content + " (POBJ Noun)")
          //   //Noun Type
          //   //Remove Proper nouns
          //   }
          // )
          // amods.forEach(function(e) {
          //   masterList.push(e.text.content + " (AMOD Adjective)")
          //   //Adjective type
          //   }
          // )
          // nns.forEach(function(e) {
          //   masterList.push(e.text.content + " (NN Noun)")
          //   //Noun type
          //   //If the headTokenIndex is equal to the index of another NN, remove the other NN from replacement
          //   }
          
          // )

          // rcmods.forEach(function(e) {
          //   masterList.push(e.text.content + " (RCMOD Verb)")
          //   //Noun type
          //   //If the headTokenIndex is equal to the index of another NN, remove the other NN from replacement
          //   }
          
          // )
          // //Pull out duplicates
          // var masterUnique = Array.from(new Set(masterList))
          // console.log(masterUnique)
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