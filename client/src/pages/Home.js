import React, { Component } from "react";
import API from "../utils/API";
import { Input, TextArea, FormBtn } from "../components/Form";
import { isDate } from "util";

class Word {
  constructor(content, number, label, help, word) {
    this.content=content;
    this.number=number;
    this.label=label;
    this.help=help;
    this.word=word;
  }
}

class Home extends Component {
  state = {
    stories: [],
    inputs: [],
    data: []
  };
  constructor(...args) {
    super(...args);
    this.handleKeyDownInput = this.handleKeyDownInput.bind(this);
  }
  
  handleKeyDownInput(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      let targetName = event.target.name
      this.state.inputs.forEach(h => {
        if(h.number == targetName) {
          h.word = event.target.value
          // storyStr.push(h.word)
        } else{
          return
        }
      })
      event.target.nextSibling.focus();
    }
  }
    getWords = token => {
      let masterObj = [];
      const wordTypes =["VMOD","DOBJ","POBJ","AMOD","NN","RCMOD","APPO","NSUBJ","XCOMP"]
      wordTypes.forEach(d => {
        let filteredArr = token.filter(function(o) {
          return o.dependencyEdge.label === d
        })
        filteredArr.forEach(e => {
          let helpText;
          if(e.partOfSpeech.proper === "PROPER" || e.partOfSpeech.tag === "PRON" || e.lemma === "be") {
            return
          } else{
            switch(e.dependencyEdge.label) {
              case "VMOD":
                helpText="A verb that modifies a noun"
                break;
              case "DOBJ":
                helpText="A noun"
                break;
              case "POBJ":
                helpText="A noun"
                break;
              case "AMOD":
                helpText="An adjective"
                break;
              case "NN":
                helpText="A noun"
                break;
              case "RCMOD":
                helpText="A verb relative clause modifier (e.g. kills, sleeps with"
                break;
              case "APPO":
                helpText="A descriptive noun (e.g. bird, superhero, scuba diver"
                break;
              case "NSUBJ":
                helpText="A noun"
                break;
              case "XCOMP":
                helpText="A verb clausal complement (e.g. kidnap, ride)"
                break;
            }
            masterObj.push(new Word(e.text.content,token.indexOf(e),e.dependencyEdge.label, helpText))
          }
        })
      })
      // var masterUnique = Array.from(new Set(masterList))
      this.setState({inputs: masterObj})
      console.log(this.state.inputs)
      return masterObj
    }

    joinWords = (token,list) => {
      let storyStr = []
      let stripText = []
      list.forEach(g => {
        stripText.push(g.content)
      })
      token.forEach(f => {
        if(stripText.includes(f.text.content)) {
          let targetWord;
          let targetIndex = token.indexOf(f)
          list.forEach(h => {
            if(h.number === targetIndex) {
              storyStr.push(h.word)
            } else{
              return
            }
          })
        } else{
          storyStr.push(f.text.content)
        }
      })
      let joinedStr = storyStr.join(' ')
      joinedStr = joinedStr.replace(/\s+(\W)/g,"$1");
      joinedStr = joinedStr.replace(/-\s/g,"-");
      return joinedStr
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
          
          console.log(tok)
          let wordList = this.getWords(tok)
          this.setState({data: tok})
       
        })
      }

      handleWordSubmit = event => {
        event.preventDefault()

      }
      
      handleInputChange = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { name, value } = event.target;
    
    
        // Set the state for the appropriate input field
        this.setState({
          [name]: value //NOTE: using a variable as a property name would set a new property
        });
      };

      handleKeyPress = event => {
        if(event.key == "Enter") {
          console.log('pressed enter')
        }
      }
      getStory = ()=> {
        console.log("creating story")
        console.log(this.joinWords(this.state.data, this.state.inputs))
      }

    
    render() {
    return(
        <div>
        <h1>Copy Paste Replace</h1>
            <form>
              <TextArea name="synopsis" placeholder="Type here..." onChange={this.handleInputChange} />
              <FormBtn disabled={!this.state.synopsis ? true : false} onClick={this.handleFormSubmit}>Submit Story</FormBtn>
            </form>
        <br/>
        <div>
          {this.state.inputs.map(input => (
            <Input name={input.number} key={input.number} placeholder={input.help} onChange={this.handleInputChange} onKeyDown={this.handleKeyDownInput} />
              ))}
        </div>
            <FormBtn onClick={this.getStory}>Done</FormBtn>
  
        </div>
    )
    }
}

export default Home;