import React, { Component } from "react";
import API from "../utils/API";
import { Input, TextArea, FormBtn } from "../components/Form";
import { isDate } from "util";
const a = require('indefinite');


class Word {
  constructor(content, number, label, help, word) {
    this.content=content;
    this.number=number;
    this.label=label;
    this.word=word;
    this.help=help;
  }
}

class Home extends Component {
  state = {
    stories: [],
    inputs: [],
    data: [],
    showTextArea: true,
    words: []
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
        let stripWords=[]
        this.state.inputs.forEach(h => {
          if(h.word) {
          stripWords.push(h.word)
          this.setState({words: this.state.words+1})
          } else{
            return
          }
        })
      if(this.state.inputs.length === stripWords.length) {
        document.getElementById("input-container").innerHTML = ''
        document.getElementById("counter").innerHTML = ''
        this.getStory()
      } else{
      event.target.nextSibling.focus();
      document.getElementById("input-container").firstChild.remove()
      }
    }
  }
    getWords = token => {
      let masterObj = [];
      const wordTypes =["VMOD","POBJ","AMOD","NN","RCMOD","APPO","NSUBJ", "CONJ"]
      wordTypes.forEach(d => {
        let filteredArr = token.filter(function(o) {
          return o.dependencyEdge.label === d
        })
        filteredArr.forEach(e => {
          let helpText;
          if(e.partOfSpeech.proper === "PROPER" || e.partOfSpeech.tag === "PRON" || e.partOfSpeech.tag === "NUM" || e.lemma === "be" || e.lemma === "which") {
            return
          } else{
            switch(e.dependencyEdge.label) {
              case "VMOD":
                if(e.partOfSpeech.tense === "PAST")
                  {helpText="Enter a verb in past tense..."} 
                else 
                  {helpText="Enter a verb that modifies a noun (e.g. buy, carry)..."}
                break;
              case "CONJ":
                if(e.partOfSpeech.tense === "PAST")
                  {helpText="Enter a verb in past tense... (e.g. bought, tried)"}
                else if(e.partOfSpeech.tense === "PRESENT") {
                  {helpText="Enter a verb in present tense... (e.g. marries, tickles)"}
                }
                else 
                  {helpText="Enter a verb..."}
                break;
              // case "DOBJ":
              //   if(e.partOfSpeech.number === "PLURAL")
              //     {helpText="Enter a plural noun..."} 
              //   else 
              //     {helpText="Enter a noun..."}
              //   break;
              case "POBJ":
                if(e.partOfSpeech.number === "PLURAL")
                  {helpText="Enter a plural noun..."} 
                else 
                  {helpText="Enter a noun..."}
                break;
              case "AMOD":
                  helpText="Enter an adjective..."
                  break;
              case "NN":
                helpText="Enter a descriptive noun (e.g. a _____ worker)..."
                break;
              case "RCMOD":
                helpText="Enter a descriptive verb (e.g. someone who _____ something)..."
                break;
              case "APPO":
                  if(e.partOfSpeech.number === "PLURAL")
                    {helpText="Enter a plural noun..."} 
                  else 
                    {helpText="Enter a noun..."}
                break;
              case "NSUBJ":
                  if(e.partOfSpeech.number === "PLURAL")
                    {helpText="Enter a plural noun..."} 
                  else 
                    {helpText="Enter a noun..."}
                break;
              // case "XCOMP":
              //   helpText="Enter a verb clausal complement (e.g. kidnap, ride)..."
              //   break;
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

    capitalizeString = string => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    joinWords = (token,list) => {
      let storyStr = []
      let stripText = []
      let indefCount = 0
      const indefinites = ["an", "a", "An", "A"]
      list.forEach(g => {
        stripText.push(g.content)
      })
      token.forEach(f => {
        if(stripText.includes(f.text.content)) {
          let targetIndex = token.indexOf(f)
          list.forEach(h => {
            if(h.number === targetIndex) {
              if(indefinites.includes(token[targetIndex - 1].lemma)) {
                console.log("found indefinite")
                if(token[targetIndex-1].lemma === "An" || token[targetIndex-1].lemma === "A") {
                  storyStr.push(this.capitalizeString(a(h.word)))
                  indefCount++
                  storyStr.splice(targetIndex-indefCount, 1)
                } else{
                  storyStr.push(a(h.word))
                  indefCount++
                  storyStr.splice(targetIndex-indefCount, 1)
                }
              } else{
              storyStr.push(h.word)
              }
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
          this.getWords(tok)
          this.randomizeInputs()
          document.getElementById("input-container").firstChild.focus()
          this.setState({data: tok})
          this.setState({showTextArea: false})
       
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
        console.log(this.state.inputs)
        document.getElementById("story-container").textContent = this.joinWords(this.state.data, this.state.inputs)
      }
      randomizeInputs = () => {

        let inputcontainer = document.querySelector('#input-container');
        for (var i = inputcontainer.children.length; i >= 0; i--) {
            inputcontainer.appendChild(inputcontainer.children[Math.random() * i | 0]);
        }
      }

    
    render() {
    return(
        <div className="container">
        <h3>Copy Paste Replace</h3>
        { !this.state.showTextArea ? <div id="counter">{this.state.words.length + 1}/{this.state.inputs.length}</div> : null }
            <form>
            { this.state.showTextArea ?
                <div>
              <TextArea name="synopsis" placeholder="Paste your story here..." onChange={this.handleInputChange} />
              <FormBtn disabled={!this.state.synopsis ? true : false} onClick={this.handleFormSubmit}>Submit Story</FormBtn>
                </div>
              : null}
            </form>
        <br/>
        <div id="input-container">
          {this.state.inputs.map(input => (
            <Input name={input.number} key={input.number} placeholder={input.help} onChange={this.handleInputChange} onKeyDown={this.handleKeyDownInput} />
              ))}
        </div>
        <div id="story-container"></div>
        </div>
    )
    }
}

export default Home;