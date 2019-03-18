import axios from 'axios'

import React, { Component } from "react";
import API from "../utils/API";
import { Label, FormGroup, Input, TextArea, FormBtn, SearchBox } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
// import { Redirect } from 'react-router-dom'

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

class Create extends Component {
  state = {
    stories: [],
    inputs: [],
    data: [],
    showTextArea: true,
    words: [],
    pasted: [],
    final: [],
    audio: [],
    title: [],
    redirectTo: null,
    username: [],
    password: []
  };
  constructor(...args) {
    super(...args);
    this.handleKeyDownInput = this.handleKeyDownInput.bind(this);
  }


  componentDidMount() {
    console.log("Create Mounted")
  }

    getWords = token => {
      let masterObj = [];
      const wordTypes =["POBJ","AMOD","RCMOD", "ADVPHMOD"]
      wordTypes.forEach(d => {
        let filteredArr = token.filter(function(o) {
          return o.dependencyEdge.label === d
        })
        filteredArr.forEach(e => {
          let helpText;
          //General exceptions to replacing a word
          if(e.partOfSpeech.proper === "PROPER" || e.partOfSpeech.tag === "PRON" || e.partOfSpeech.tag === "NUM" || e.lemma === "be" || e.lemma === "which" || e.lemma === "make" || e.lemma === "that" || e.lemma === "have" || e.partOfSpeech.mood === "INDICATIVE") {
            return
          }
          else{
            switch(e.dependencyEdge.label) {
              // case "VMOD":
              //   if(e.partOfSpeech.tense === "PAST")
              //     {helpText="Enter a targeted verb in past tense (carried, eloped with)"} 
              //   else 
              //     {helpText="Enter a targeted verb (buy, carry)..."}
              //   break;
              case "ADVPHMOD":
                helpText="Enter an adverb."
                break;
              // case "CONJ":
              //   if(e.partOfSpeech.tag === "NOUN")
              //     {e.partOfSpeech.number === "PLURAL" ? helpText="Enter a plural noun." : helpText="Enter a singular noun."}
              //   else if(e.partOfSpeech.tense === "PAST")
              //     {helpText="Enter a verb in past tense (e.g. she _____ed yesterday)."}
              //   else if(e.partOfSpeech.tense === "PRESENT") {
              //     {helpText="Enter a verb in present tense (e.g. he _____s his car)."}
              //   }
              //   else 
              //     {helpText="Enter a state of being (frustrated, gigantic)."}
              //   break;
              case "POBJ":
                if(e.partOfSpeech.number === "PLURAL")
                  {helpText="Enter a plural noun."} 
                else 
                  {helpText="Enter a singular noun."}
                break;
              case "AMOD":
                  helpText="Enter an adjective."
                  break;
              // case "NN":
              //   helpText="Enter an adjective..."
              //   break;
              case "RCMOD":
                if(e.partOfSpeech.tense === "PAST")
                  {helpText="Enter a descriptive verb in past tense (e.g. I _____ed yesterday)."} 
                else
                  {e.text.content.match(/ing/g) ? helpText="Enter a verb ending in -ing." : helpText="Enter a descriptive verb in present tense (e.g. he _____s a lot)."}
                break;
              // case "APPOS":
              //     if(e.partOfSpeech.number === "PLURAL")
              //       {helpText="Enter a plural noun..."} 
              //     else 
              //       {helpText="Enter a singular noun..."}
              //   break;
              // case "NSUBJ":
              //     if(e.partOfSpeech.number === "PLURAL")
              //       {helpText="Enter a plural noun."} 
              //     else 
              //       {helpText="Enter a singular noun."}
              //   break;
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
      console.log(token)
      console.log(this.state.inputs)
      return masterObj
    }

    capitalizeString = string => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    joinWords = (token,list) => {
      let storyStr = []
      let stripText = []
      let stripNumbers = []
      const indefinites = ["an", "a", "An", "A"]
      list.forEach(g => {
        stripText.push(g.content)
        stripNumbers.push(g.number)
      })

      token.forEach(f => {
        if(stripNumbers.includes(token.indexOf(f))) {
          let targetIndex = token.indexOf(f)
          list.forEach(h => {

            //1: If input list item h index is equal to token item f index,
            if(h.number === targetIndex) {
              //1A: Set a or an and push input word to story string
              if(token[targetIndex - 1] ? indefinites.includes(token[targetIndex - 1].lemma) : false) {
                if(token[targetIndex-1].lemma === "An" || token[targetIndex-1].lemma === "A") {
                  storyStr.push(this.capitalizeString(a(h.word)))
                  storyStr.splice(storyStr.length-2, 1)
                } else{
                  storyStr.push(a(h.word))
                  storyStr.splice(storyStr.length-2, 1)
                }
              } else{
              //1B: Push input word into story string

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
      joinedStr = joinedStr.replace(/\(\s/g," (");
      joinedStr = joinedStr.replace(/\(\s/g," (");
      joinedStr = joinedStr.replace(/"\s/g," ");
      joinedStr = joinedStr.replace(/'\s/g," ");
      // joinedStr = joinedStr.replace(/\s"/g,"\"");
      joinedStr = joinedStr.replace(/\[\s/g," [");
      joinedStr = joinedStr.charAt(0).toUpperCase() + joinedStr.slice(1)
      return joinedStr
    }

    handleFormSubmit = event => {
      event.preventDefault()
        API.sendText({
          document : {
              type: "PLAIN_TEXT",
              content: this.state.pasted
          }
        }).then(response => {
          const ent = response.data.entities
          const tok = response.data.tokens
          
          this.getWords(tok)
          this.randomizeInputs()
          console.log(document.getElementById("input-container").firstChild.firstChild.nextSibling.firstChild)
          document.getElementById("input-container").firstChild.firstChild.nextSibling.firstChild.focus()
          
          this.setState({data: tok})
          this.setState({showTextArea: false})
       
        })
      }

      
      handleInputChange = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { name, value } = event.target;
    
    
        // Set the state for the appropriate input field
        this.setState({
          [name]: value //NOTE: using a variable as a property name would set a new property
        });
        console.log(this.state.username, this.state.password)
      };

      handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        })
      }
  

      handleKeyDownInput(event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          this.state.inputs.forEach(h => {
            if(h.number == event.target.name) {
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
            this.getStory()
          } else{
          document.getElementById("input-container").firstChild.nextSibling.firstChild.nextSibling.nextSibling.firstChild.focus();
          // event.target.parentNode.parentNode.firstChild.nextSibling.firstChild.nextSibling.firstChild.focus();
          document.getElementById("input-container").firstChild.remove()
          }
        }
      }

      handleMovieSearch = event => {
        if (event.key === 'Enter') {
          event.preventDefault();
          API.searchOMDB(event.target.value).then( response => {
            if(response.data.Response==="False") {
              return
            } else{
              console.log("did not find anything")
              document.getElementById("story-input").value=response.data.Plot
              this.setState({pasted:response.data.Plot})
              document.getElementById("preset-search").value=''
              console.log(this.state.pasted)
            }
          })
      }
    }

      getStory = ()=> {
        console.log("creating story")
        let finalStory = this.joinWords(this.state.data, this.state.inputs)
        document.getElementById("story-container").textContent = finalStory
        this.setState({final: finalStory})
        API.sendTextToSpeech(finalStory).then(response =>{
          this.setState({audio: response.data.audioContent})
        })
          
      }
      randomizeInputs = () => {

        let inputcontainer = document.querySelector('#input-container');
        for (var i = inputcontainer.children.length; i >= 0; i--) {
            inputcontainer.appendChild(inputcontainer.children[Math.random() * i | 0]);
        }
      }

      handleSubmit = () => {
        console.log(this.state.title)
        axios.post('/api/save', {
          title: this.state.title,
          author: this.props.userName,
          content: this.state.final,
          base64: this.state.audio,
          color: this.props.userColor,
          icon: this.props.userIcon
        })
          .then( response => {
            console.log(response)
            if(!response.data.error) {
              console.log('succesful save')
              // this.setState({
              //   redirectTo: '/latest'
              // })
            } else {
              console.log('error occured')
            }
            }).catch(error => {
              console.log(error)
            })
        }

        handleLoginSubmit = (event) => {
          event.preventDefault()
          console.log('handleSubmit')
  
          axios
              .post('/user/login', {
                  username: this.state.username,
                  password: this.state.password
              })
              .then(response => {
                  console.log('login response: ')
                  console.log(response)
                  if (response.status === 200) {
                    this.getPic(response.data.username)
                      // update App.js state
                      // update the state to redirect to home
                      this.setState({
                          redirectTo: '/'
                      })
                  }
              }).catch(error => {
                  console.log('login error: ')
                  console.log(error);
                  
              })
      }
      getPic(user) {
        axios.get('/user/icon',user).then(response => {
          this.props.updateUser({
            loggedIn: true,
            username: user,
            icon: response.data.icon,
            color: response.data.color
        })
          console.log(this.state.color, this.state.icon)
        })
      }

    
    render() {
    return(
      <Container fluid>
      <Row>
        <Col size="md-12">

        <div className="wrapper card">
        <div className="row p-0">
        <div className="col-5 p-0">
          <h1>Create Story</h1>
        </div>
        <div className="col-7 p-0 d-flex justify-content-end">
          { this.state.showTextArea ? <SearchBox name="preset" id="preset-search" placeholder="Movie or Show" onChange={this.handleInputChange} onKeyDown={this.handleMovieSearch}/> : null}
        </div>
        </div>
            { this.state.showTextArea ?
                <div>
              <TextArea id="story-input" name="pasted" placeholder="Paste your story here..." onChange={this.handleInputChange} />
              <FormBtn disabled={this.state.pasted.length === 0 ? true : false} onClick={this.handleFormSubmit}>Start Replacing</FormBtn>
                </div>
              : null}
        <br/>
        <div id="input-container">
          {this.state.inputs.map(input => (
            <FormGroup key={input.number}>
                    { !this.state.showTextArea ? <div id="counter"><span className="input-labels">{this.state.words.length + 1}/{this.state.inputs.length}</span></div> : null }

              <Label htmlFor={input.number}><span className="input-labels">{input.help}</span></Label>
              <Input id={"input-" + input.number} className="word-input form-control" name={input.number} placeholder="Type here..." onChange={this.handleInputChange} onKeyDown={this.handleKeyDownInput} />
            </FormGroup>
            
            ))}
            
        </div>
        <div id="story-container"></div>
          {this.state.final.length === 0 ? null : 
          <div>
          <div className="audio-container justify-content-center d-flex mt-4 mb-5">
            <audio controls src={"data:audio/mp3;base64," + this.state.audio}></audio>
          </div>
          <hr />
                {!this.props.userName ? 

                <form className="mt-4">
                <p className="sign-in-prompt">
                  Sign in to save this story. Not a member yet? Sign up!
                </p>
                <Label htmlFor="username">Username</Label>
                <Input name="username" type="text" value={this.state.username} onChange={this.handleInputChange} />
                <Label className="mt-3" htmlFor="password">Password</Label>
                <Input name="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
                <button
                  className="btn btn-primary mt-3"
                  onClick={this.handleLoginSubmit}
                  type="submit"
                >Sign In</button>
              </form>
                
                
                
                : 
                  <form className="mt-5">
                  <Label htmlFor="title">Story Title</Label>
                  <Input name="title" type="text" className="w-50" value={this.state.title} onChange={this.handleInputChange} />

                  <button
                    className="btn btn-primary mt-2"
                    onClick={this.handleSubmit}
                  >Save Story</button>
                </form>
                }

            </div>
          }
        </div>
        </Col>
      </Row>
    </Container>
    )
    }
  }


export default Create;