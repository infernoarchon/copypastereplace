import axios from 'axios'
import React, { Component } from "react";
import API from "../utils/API";
import { Label, FormGroup, Input, TextArea, FormBtn, ColorDropdown, IconItem, IconIcon } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
import { NavLink } from 'react-router-dom'
// import { Redirect } from 'react-router-dom'

const json = require('../data/wordnet.json'); //with path
const jsonQuery = require('json-query')
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

  constructor() {
    super()
    this.state = {
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
      password: [],
      search: "movie",
      newusername: [],
      newpassword: [],
      newcolor: [],
      newicon: [],
      showsignup: false,
      showsignin: true,
      categories: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.handleKeyDownInput = this.handleKeyDownInput.bind(this);
    this.handleSearchType = this.handleSearchType.bind(this)
    this.handleNewSubmit = this.handleNewSubmit.bind(this)


  }    


    getWords = token => {
      let masterObj = [];
      const wordTypes =["ACOMP", "APPOS","AMOD","RCMOD", "NSUBJ", "POBJ"]
      wordTypes.forEach(d => {
        let filteredArr = token.filter(function(o) {
          return o.dependencyEdge.label === d
        })
        filteredArr.forEach(e => {
          let helpText;
          //General exceptions to replacing a word
          if(e.partOfSpeech.tag === "DET" 
          || e.partOfSpeech.proper === "PROPER" 
          || e.partOfSpeech.tag === "PRON" 
          || e.partOfSpeech.tag === "NUM" 
          || e.lemma === "be" 
          || e.lemma === "which" 
          || e.lemma === "make" 
          || e.lemma === "that" 
          || e.lemma === "have" 
          || e.lemma === "own"
          || e.lemma === "put"
          || e.lemma === "charge"
          || e.lemma === "full"
          || e.lemma === "order"
          || e.lemma === "plan"
          || e.lemma === "long"
          || e.lemma === "few"
          || e.lemma === "responsible"
          || e.lemma === "series"
          || e.lemma === "let"
          || e.lemma === "search"
          || e.partOfSpeech.mood === "INDICATIVE") {
            return
          }
          //Exclude amod verbs
          if(e.partOfSpeech.tag === "VERB" && e.dependencyEdge.label === "AMOD") {
            return
          }
          if(this.handleCats(this.getword(e.lemma)) === "blank") {
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
              // case "ADVPHMOD":
              //   helpText="Enter an adverb."
              //   break;
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
                  { let cat = this.handleCats(this.getword(e.lemma))
                    // console.log(e.lemma, cat)
                    helpText=cat + " (plural)."
                    this.setState({categories: []})}
                else if(e.partOfSpeech.number === "SINGULAR")
                  { let cat = this.handleCats(this.getword(e.lemma))
                    // console.log(e.lemma, cat)
                    helpText=cat + " (singular)."
                    this.setState({categories: []})}
                else 
                  {helpText="Enter an idea."}
                break;
              case "NSUBJ":
                if(e.partOfSpeech.number === "PLURAL")
                  { let cat = this.handleCats(this.getword(e.lemma))
                    // console.log(e.lemma, cat)
                    helpText=cat + " (plural)."
                    this.setState({categories: []})}
                else if(e.partOfSpeech.number === "SINGULAR")
                  { let cat = this.handleCats(this.getword(e.lemma))
                    // console.log(e.lemma, cat)
                    helpText=cat + " (singular)."
                    this.setState({categories: []})}
                else 
                  {helpText="Enter an idea."}
                break;
              case "APPOS":
                if(e.partOfSpeech.number === "PLURAL")
                  { let cat = this.handleCats(this.getword(e.lemma))
                    // console.log(e.lemma, cat)
                    helpText=cat + " (plural)."
                    this.setState({categories: []})}
                else if(e.partOfSpeech.number === "SINGULAR")
                  { let cat = this.handleCats(this.getword(e.lemma))
                    // console.log(e.lemma, cat)
                    helpText=cat + " (singular)."
                    this.setState({categories: []})}
                else 
                  {helpText="Enter an idea."}
                break;
              case "AMOD":
                  helpText="Enter an adjective."
                  break;
              case "ACOMP":
                  helpText="Enter an adjective."
                  break;
              // case "NN":
              //   helpText="Enter an adjective..."
              //   break;
              case "RCMOD":
                if(e.partOfSpeech.tense === "PAST")
                  {helpText="Enter a verb in past tense (e.g. flew, kissed, won)."} 
                else
                  {e.text.content.match(/ing/g) ? helpText="Enter a verb ending in -ing." : helpText="Enter a verb in present tense (e.g. drive, make, dance)."}
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

    handleCats = input => {
      if(input.includes("social_group") || input.includes("group")) {
        return "Enter a group or club"
      }
      else if(input.includes("organization")) {
        return "Enter a company or organization"
      }
      else if(input.includes("event") || input.includes("activity")) {
        return "Enter an event or activity"
      }
      else if(input.includes("location") || input.includes("area") || input.includes("structure") || input.includes("land")) {
        return "Enter a location"
      }
      else if(input.includes("property")) {
        return "Enter a superpower"
      }
      else if(input.includes("living_thing")) {
        return "Enter a living thing"
      }
      else if(input.includes("object")) {
        return "Enter an object"
      }
      else {
        return "blank"
      }
    }
    
    getcat = input => {
      let cats = [
          "organization", "social_group", "group",
          "event", "activity", 
          "location", "area", "structure", "land",
          "property",
          "living_thing",   
          "object"] // if contains object, return object, otherwise return noun
      let serial = input[0].synset 
      if(cats.includes(json.synset[serial].word[0])) {
          return this.setState({categories: [...this.state.categories, json.synset[serial].word[0]] })
      } else if (json.synset[serial].word[0] === "entity") {
          return 
      }
      else {
          // console.log("next synset is" + json.synset[serial].pointer[0].synset)
          this.getcat(json.synset[serial].pointer)
      }
  }

   getword = input => {
      let result = jsonQuery('synset[**][*:filterWord]', {
          data: json,
          locals: {
            filterWord: function (item) {
              let word = item.word
              return word.includes(input) && item.pos === "n"
            }
          }
        }).value
        for(var i = 0; i < result.length; i++) {
          this.getcat(result[i].pointer)
        }
        return this.state.categories
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
      joinedStr = joinedStr.replace(/\s([!.,?;:\/$%&+]*)/g,"$1 ")
      // joinedStr = joinedStr.replace(/\s+(\W)/g,"$1");
      joinedStr = joinedStr.replace(/\s-\s/g,"-");
      joinedStr = joinedStr.replace(/\s's\s/g,"'s ");


      // joinedStr = joinedStr.replace(/\(\s/g," ( ");
      // joinedStr = joinedStr.replace(/'\s/g," ' ");
      // joinedStr = joinedStr.replace(/'\./g," '.");
      joinedStr = joinedStr.replace(/'\s([0-9a-zA-Z\s'.,]*)\s'/g,"'$1'");
      joinedStr = joinedStr.replace(/\(\s([0-9a-zA-Z\s'.,]*)\s\)/g,"($1)");
      joinedStr = joinedStr.replace(/"\s([0-9a-zA-Z\s'.,]*)\s"/g,"\"$1\"");


      // joinedStr = joinedStr.replace(/"\s([\W\w]*)\s"/g,"\"$1\"");
      // joinedStr = joinedStr.replace(/\[\s/g," [");

      //Fix lowercase contractions
      joinedStr = joinedStr.replace(/are\sn't/g,"aren't");
      joinedStr = joinedStr.replace(/ai\sn't/g,"ain't");
      joinedStr = joinedStr.replace(/ca\sn't/g,"can't");
      joinedStr = joinedStr.replace(/could\sn't/g,"couldn't");
      joinedStr = joinedStr.replace(/did\sn't/g,"didn't");
      joinedStr = joinedStr.replace(/does\sn't/g,"doesn't");
      joinedStr = joinedStr.replace(/do\sn't/g,"don't");
      joinedStr = joinedStr.replace(/had\sn't/g,"hadn't");
      joinedStr = joinedStr.replace(/has\n't/g,"hasn't");
      joinedStr = joinedStr.replace(/have\sn't/g,"haven't");
      joinedStr = joinedStr.replace(/is\sn't/g,"isn't");
      joinedStr = joinedStr.replace(/might\sn't/g,"mightn't");
      joinedStr = joinedStr.replace(/sha\sn't/g,"shan't");
      joinedStr = joinedStr.replace(/must\sn't/g,"mustn't");
      joinedStr = joinedStr.replace(/should\sn't/g,"shouldn't");
      joinedStr = joinedStr.replace(/were\sn't/g,"weren't");
      joinedStr = joinedStr.replace(/wo\sn't/g,"won't");
      joinedStr = joinedStr.replace(/would\sn't/g,"wouldn't");
      joinedStr = joinedStr.replace(/wan\sna/g,"wanna");
      joinedStr = joinedStr.replace(/got\sta/g,"gotta");
      joinedStr = joinedStr.replace(/gon\sna/g,"gonna");
      joinedStr = joinedStr.replace(/gim\sme/g,"gimme");
      joinedStr = joinedStr.replace(/lem\sme/g,"lemme");
      joinedStr = joinedStr.replace(/got\sta/g,"gotta");
      //Fix uppercase contractions
      joinedStr = joinedStr.replace(/Are\sn't/g,"Aren't");
      joinedStr = joinedStr.replace(/Ai\sn't/g,"Ain't");
      joinedStr = joinedStr.replace(/Ca\sn't/g,"Can't");
      joinedStr = joinedStr.replace(/Could\sn't/g,"Couldn't");
      joinedStr = joinedStr.replace(/Did\sn't/g,"Didn't");
      joinedStr = joinedStr.replace(/Does\sn't/g,"Doesn't");
      joinedStr = joinedStr.replace(/Do\sn't/g,"Don't");
      joinedStr = joinedStr.replace(/Had\sn't/g,"Hadn't");
      joinedStr = joinedStr.replace(/Has\n't/g,"Hasn't");
      joinedStr = joinedStr.replace(/Have\sn't/g,"Haven't");
      joinedStr = joinedStr.replace(/Is\sn't/g,"Isn't");
      joinedStr = joinedStr.replace(/Might\sn't/g,"Mightn't");
      joinedStr = joinedStr.replace(/Sha\sn't/g,"Shan't");
      joinedStr = joinedStr.replace(/Must\sn't/g,"Mustn't");
      joinedStr = joinedStr.replace(/Should\sn't/g,"Shouldn't");
      joinedStr = joinedStr.replace(/Were\sn't/g,"Weren't");
      joinedStr = joinedStr.replace(/Wo\sn't/g,"Won't");
      joinedStr = joinedStr.replace(/Would\sn't/g,"Wouldn't");
      joinedStr = joinedStr.replace(/Wan\sna/g,"Wanna");
      joinedStr = joinedStr.replace(/Got\sta/g,"Gotta");
      joinedStr = joinedStr.replace(/Gon\sna/g,"Gonna");
      joinedStr = joinedStr.replace(/Gim\sme/g,"Gimme");
      joinedStr = joinedStr.replace(/Lem\sme/g,"Lemme");
      joinedStr = joinedStr.replace(/Got\sta/g,"Gotta");

      joinedStr = joinedStr.charAt(0).toUpperCase() + joinedStr.slice(1)
      return joinedStr
    }

    handleFormSubmit = event => {
      event.preventDefault()
        document.getElementById("create-button").className += " loading animate-flicker"
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
          // console.log(document.getElementById("input-container").firstChild.firstChild.nextSibling.firstChild)
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
        // console.log(this.state.username, this.state.password)
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
        document.getElementById("story-input").value = ''
        API.searchOMDB(event.target.value).then( response => {
          if(response.data.Response==="False") {
            return
          } else{
            document.getElementById("story-input").value=response.data.Plot
            this.setState({pasted:response.data.Plot})
            document.getElementById("preset-search").value=''
            console.log(this.state.pasted)
          }
        })
        }
      }

      handleBookSearch = event => {
        if (event.key === 'Enter') {
          event.preventDefault();
          document.getElementById("story-input").value = ''
          API.searchBooks(event.target.value).then( response => {
            if(response.data.totalItems > 0) {
              if(!response.data.items[0].volumeInfo.description) {
                return
              } else{
              document.getElementById("story-input").value=response.data.items[0].volumeInfo.description
              this.setState({pasted:response.data.items[0].volumeInfo.description})
              console.log(this.state.pasted)
              document.getElementById("preset-search").value=''
              }
            } else{
              return
            }
          })
          }
        }

        

      getStory = ()=> {
        console.log("creating story")
        let finalStory = this.joinWords(this.state.data, this.state.inputs)
        console.log(finalStory)
        document.getElementById("story-container").innerHTML = finalStory
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
        console.log("submitting story")
        axios.post('/api/save', {
          title: this.state.title,
          author: this.props.userName,
          content: this.state.final,
          base64: this.state.audio,
          color: this.props.userColor,
          icon: this.props.userIcon
        })
          .then(response => {
            console.log(response)
            if(!response.data.error) {
              console.log('succesful save')
              // this.setState({
              //   redirectTo: '/signin'
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

      handleSearchType(event) {
        switch (event.target.id) {
          case "movie-search" :
            this.setState({search : "movie"})
          break;
          case "book-search" :
            this.setState({search : "book"})
          break;
        }
      }
  
      handleNewSubmit(event) {
        event.preventDefault()

        axios.post('/user/', {
          username: this.state.newusername,
          password: this.state.newpassword,
          color: this.state.newcolor,
          icon: this.state.newicon
        })
          .then( response => {
            // console.log(response)
            if(!response.data.error) {
              console.log('succesful signup')
              this.setState({showsignup: false})
              this.setState({showsignin: true})
              // this.setState({
              //   redirectTo: '/signin'
              // })
            } else {
              console.log('username already taken')
            }
            }).catch(error => {
              console.log(error)
            })
        }
      handleColorSelect = (event) => {
        event.preventDefault()
        this.setState({newcolor: event.target.value})
      }
      handleIconSelect = (event) => {
        event.preventDefault()
        this.setState({newicon: event.target.value})
      }

      toggleSignUp = (event) => {
        event.preventDefault()
        this.setState({showsignup: true})
        this.setState({showsignin: false})
      }

      toggleSignIn = (event) => {
        event.preventDefault()
        this.setState({showsignup: false})
        this.setState({showsignin: true})
      }

      refreshPage = (event) => {
        event.preventDefault()
        window.location.reload()
      }

    
    render() {
      // console.log(this.state)
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
          { this.state.showTextArea ? 
          
          // <SearchBox name="preset" id="preset-search" placeholder="Movie or Show" onChange={this.handleInputChange} onKeyDown={this.handleMovieSearch}/> 
          <div className="input-group preset-search-container">
          { this.state.search === "movie" && <input type="text" className="form-control search-input" name="preset" id="preset-search" placeholder="Movie or Show" onChange={this.handleInputChange} onKeyDown={this.handleMovieSearch} /> }
          { this.state.search === "book" && <input type="text" className="form-control search-input" name="preset" id="preset-search" placeholder="Book" onChange={this.handleInputChange} onKeyDown={this.handleBookSearch} /> }



          <div className="input-group-append">
          <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-search"></i></button>
            <div className="dropdown-menu dropdown-menu-right search-dropdown">
              <a className="dropdown-item" href="#" id="movie-search" onClick={this.handleSearchType}><i className="fas fa-tv"></i> Movies & Shows</a>
              <a className="dropdown-item" href="#" id="book-search" onClick={this.handleSearchType}><i className="fas fa-book-open"></i> Books</a>


            </div>
          </div>
        </div>
          
          : null}
        </div>
        </div>
            { this.state.showTextArea ?
                <div>
              <TextArea id="story-input" name="pasted" placeholder="Paste your story here..." onChange={this.handleInputChange} />
              <FormBtn disabled={this.state.pasted.length === 0 ? true : false} onClick={this.handleFormSubmit}><span id="create-button" className="create-text"></span></FormBtn>
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
          <div className="audio-container justify-content-center d-flex mt-4">
            <audio controls src={"data:audio/mp3;base64," + this.state.audio}></audio>
          </div>
          <div className="justify-content-center d-flex mt-4 mb-5">
            <FormBtn onClick={this.refreshPage}><i className="fas fa-redo-alt"></i>Play Again</FormBtn>
          </div>
          <hr />
                {!this.props.userName && this.state.showsignin ? 

                <form className="mt-4">
                <p className="sign-in-prompt">
                  Sign in to save this story. Not a member yet? <a href="#"><span className="sign-up-link" onClick={this.toggleSignUp}>Sign Up!</span></a>
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
                
                
                
                : null
                  
                }

                {this.props.userName ? 
              <form className="mt-4">
              <Label htmlFor="title">Story Title</Label>
              <Input name="title" type="text" className="w-50" value={this.state.title} onChange={this.handleInputChange} />

              <button
                className="btn btn-primary mt-2"
                onClick={this.handleSubmit}
              >Save Story</button>
            </form> : null  
              }

                {this.state.showsignup ? 
                        <form className="mt-4">
                          <p className="sign-in-prompt">Create an account to save your story. Already a member? <a href="#"><span className="sign-up-link" onClick={this.toggleSignIn}>Sign In.</span></a></p>

                          <Label htmlFor="username">Username</Label>
                          <Input name="newusername" type="text" value={this.state.newusername} onChange={this.handleInputChange} />
                          <Label className="mt-3" htmlFor="password">Password</Label>
                          <Input name="newpassword" type="password" value={this.state.newpassword} onChange={this.handleInputChange} />
                          <Label className="mt-3" htmlFor="colorDropdown">Your Favorite Color</Label>
                          <div className="row w-25 p-0">
                            <div className="col-2 p-0"><div className="swatch"><div className="swatch-preview" style={{ backgroundColor: this.state.newcolor}}></div></div></div>
                            <div className="col-10 p-0">
                            <div className="dropdown">
                              <button className="btn btn-secondary-outline dropdown-toggle text-left" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Choose a Color
                              </button>
                                  <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                    <button className="dropdown-item color-drop" style={{backgroundColor: '#ff4436'}} onClick={this.handleColorSelect} value="#f44336" type="button"></button>
                                    <button className="dropdown-item color-drop" style={{backgroundColor: '#9c27b0'}} onClick={this.handleColorSelect} value="#9c27b0" type="button"></button>
                                    <button className="dropdown-item color-drop" style={{backgroundColor: '#3f51b5'}} onClick={this.handleColorSelect} value="#3f51b5" type="button"></button>
                                    <button className="dropdown-item color-drop" style={{backgroundColor: '#2196f3'}} onClick={this.handleColorSelect} value="#2196f3" type="button"></button>
                                    <button className="dropdown-item color-drop" style={{backgroundColor: '#009688'}} onClick={this.handleColorSelect} value="#009688" type="button"></button>
                                    <button className="dropdown-item color-drop" style={{backgroundColor: '#8bc34a'}} onClick={this.handleColorSelect} value="#8bc34a" type="button"></button>
                                    <button className="dropdown-item color-drop" style={{backgroundColor: '#d8bf00'}} onClick={this.handleColorSelect} value="#d8bf00" type="button"></button>
                                    <button className="dropdown-item color-drop" style={{backgroundColor: '#ff9800'}} onClick={this.handleColorSelect} value="#ff9800" type="button"></button>
                
                
                
                                  </div>
                                </div>
                
                            </div>
                          </div>
                          <Label className="mt-3" htmlFor="iconDropdown">Your Profile Pic</Label>
                          <div className="row w-25 p-0">
                            <div className="col-2 p-0"><div className="icon-preview"><i style={{backgroundColor: this.state.newcolor}} className={this.state.newicon}></i></div></div>
                            <div className="col-10 p-0">
                            <div className="dropdown">
                            <button className="btn btn-secondary-outline dropdown-toggle text-left" type="button" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Choose an Icon
                            </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenu3">
                                  <IconItem value="fas fa-flushed" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-flushed" />
                                  </IconItem>
                                  <IconItem value="fas fa-frown-open" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-frown-open" />
                                  </IconItem>
                                  <IconItem value="fas fa-grimace" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-grimace" />
                                  </IconItem>
                                  <IconItem value="fas fa-grin" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-grin" />
                                  </IconItem>
                                  <IconItem value="fas fa-grin-alt" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-grin-alt" />
                                  </IconItem>
                                  <IconItem value="fas fa-grin-beam" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-grin-beam" />
                                  </IconItem>
                                  <IconItem value="fas fa-grin-beam-sweat" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-grin-beam-sweat" />
                                  </IconItem>
                                  <IconItem value="fas fa-grin-hearts" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-grin-hearts" />
                                  </IconItem>
                                  <IconItem value="fas fa-grin-squint" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-grin-squint" />
                                  </IconItem>
                                  <IconItem value="fas fa-grin-squint-tears" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-grin-squint-tears" />
                                  </IconItem>
                                  <IconItem value="fas fa-grin-stars" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-grin-stars" />
                                  </IconItem>
                                  <IconItem value="fas fa-grin-tears" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-grin-tears" />
                                  </IconItem>
                                  <IconItem value="fas fa-grin-tongue" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-grin-tongue" />
                                  </IconItem>
                                  <IconItem value="fas fa-grin-tongue-squint" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-grin-tongue-squint" />
                                  </IconItem>
                                  <IconItem value="fas fa-grin-tongue-wink" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-grin-tongue-wink" />
                                  </IconItem>
                                  <IconItem value="fas fa-grin-wink" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-grin-wink" />
                                  </IconItem>
                                  <IconItem value="fas fa-kiss" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-kiss" />
                                  </IconItem>
                                  <IconItem value="fas fa-kiss-beam" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-kiss-beam" />
                                  </IconItem>
                                  <IconItem value="fas fa-kiss-wink-heart" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-kiss-wink-heart" />
                                  </IconItem>
                                  <IconItem value="fas fa-laugh" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-laugh" />
                                  </IconItem>
                                  <IconItem value="fas fa-laugh-beam" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-laugh-beam" />
                                  </IconItem>
                                  <IconItem value="fas fa-laugh-squint" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-laugh-squint" />
                                  </IconItem>
                                  <IconItem value="fas fa-laugh-wink" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-laugh-wink" />
                                  </IconItem>
                                  <IconItem value="fas fa-meh" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-meh" />
                                  </IconItem>
                                  <IconItem value="fas fa-meh-blank" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-meh-blank" />
                                  </IconItem>
                                  <IconItem value="fas fa-meh-rolling-eyes" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-meh-rolling-eyes" />
                                  </IconItem>
                                  <IconItem value="fas fa-sad-cry" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-sad-cry" />
                                  </IconItem>
                                  <IconItem value="fas fa-smile" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-smile" />
                                  </IconItem>
                                  <IconItem value="fas fa-smile-beam" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-smile-beam" />
                                  </IconItem>
                                  <IconItem value="fas fa-smile-wink" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-smile-wink" />
                                  </IconItem>
                                  <IconItem value="fas fa-surprise" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-surprise" />
                                  </IconItem>
                                  <IconItem value="fas fa-user-astronaut" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-user-astronaut" />
                                  </IconItem>
                                  <IconItem value="fas fa-user-ninja" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-user-ninja" />
                                  </IconItem>
                                  <IconItem value="fas fa-user-secret" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-user-secret" />
                                  </IconItem>
                                  <IconItem value="fas fa-user-tie" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-user-tie" />
                                  </IconItem>
                                  <IconItem value="fas fa-cat" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-cat" />
                                  </IconItem>
                                  <IconItem value="fas fa-crow" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-crow" />
                                  </IconItem>
                                  <IconItem value="fas fa-dog" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-dog" />
                                  </IconItem>
                                  <IconItem value="fas fa-dove" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-dove" />
                                  </IconItem>
                                  <IconItem value="fas fa-dragon" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-dragon" />
                                  </IconItem>
                                  <IconItem value="fas fa-fish" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-fish" />
                                  </IconItem>
                                  <IconItem value="fas fa-frog" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-frog" />
                                  </IconItem>
                                  <IconItem value="fas fa-hippo" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-hippo" />
                                  </IconItem>
                                  <IconItem value="fas fa-horse" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-horse" />
                                  </IconItem>
                                  <IconItem value="fas fa-horse-head" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-horse-head" />
                                  </IconItem>
                                  <IconItem value="fas fa-kiwi-bird" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-kiwi-bird" />
                                  </IconItem>
                                  <IconItem value="fas fa-otter" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-otter" />
                                  </IconItem>
                                  <IconItem value="fas fa-spider" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-spider" />
                                  </IconItem>
                                  <IconItem value="fas fa-bug" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-bug" />
                                  </IconItem>
                                  <IconItem value="fas fa-chess-rook" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-chess-rook" />
                                  </IconItem>
                                  <IconItem value="fas fa-chess-queen" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-chess-queen" />
                                  </IconItem>
                                  <IconItem value="fas fa-chess-pawn" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-chess-pawn" />
                                  </IconItem>
                                  <IconItem value="fas fa-chess-knight" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-chess-knight" />
                                  </IconItem>
                                  <IconItem value="fas fa-chess-king" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-chess-king" />
                                  </IconItem>
                                  <IconItem value="fas fa-chess-bishop" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-chess-bishop" />
                                  </IconItem>
                                  <IconItem value="fas fa-snowman" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-snowman" />
                                  </IconItem>
                                  <IconItem value="fas fa-ghost" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-ghost" />
                                  </IconItem>
                                  <IconItem value="fas fa-poo" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-poo" />
                                  </IconItem>
                                  <IconItem value="fas fa-skull" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-skull" />
                                  </IconItem>
                                  <IconItem value="fas fa-robot" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-robot" />
                                  </IconItem>
                                  <IconItem value="fas fa-pastafarianism" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-pastafarianism" />
                                  </IconItem>
                                  <IconItem value="fas fa-car-side" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-car-side" />
                                  </IconItem>
                                  <IconItem value="fas fa-motorcycle" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-motorcycle" />
                                  </IconItem>
                                  <IconItem value="fas fa-hamburger" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-hamburger" />
                                  </IconItem>
                                  <IconItem value="fas fa-carrot" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-carrot" />
                                  </IconItem>
                                  <IconItem value="fas fa-pizza-slice" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-pizza-slice" />
                                  </IconItem>
                                  <IconItem value="fas fa-pepper-hot" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-pepper-hot" />
                                  </IconItem>
                                  <IconItem value="fas fa-football-ball" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-football-ball" />
                                  </IconItem>
                                  <IconItem value="fas fa-futbol" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-futbol" />
                                  </IconItem>
                                  <IconItem value="fas fa-basketball-ball" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-basketball-ball" />
                                  </IconItem>
                                  <IconItem value="fas fa-baseball-ball" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-baseball-ball" />
                                  </IconItem>
                                  <IconItem value="fas fa-volleyball-ball" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-volleyball-ball" />
                                  </IconItem>
                                  <IconItem value="fas fa-snowboarding" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-snowboarding" />
                                  </IconItem>
                                  <IconItem value="fas fa-toilet-paper" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-toilet-paper" />
                                  </IconItem>
                                  <IconItem value="fas fa-paper-plane" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-paper-plane" />
                                  </IconItem>
                                  <IconItem value="fas fa-tree" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-tree" />
                                  </IconItem>
                                  <IconItem value="fas fa-air-freshener" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-air-freshener" />
                                  </IconItem>
                                  <IconItem value="fas fa-umbrella" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-umbrella" />
                                  </IconItem>
                                  <IconItem value="fas fa-bomb" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-bomb" />
                                  </IconItem>
                                  <IconItem value="fas fa-atom" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-atom" />
                                  </IconItem>
                                  <IconItem value="fas fa-brain" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-brain" />
                                  </IconItem>
                                  <IconItem value="fas fa-meteor" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-meteor" />
                                  </IconItem>
                                  <IconItem value="fas fa-yin-yang" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-yin-yang" />
                                  </IconItem>
                                  <IconItem value="fas fa-dice-d20" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-dice-d20" />
                                  </IconItem>
                                  <IconItem value="fas fa-hand-spock" onClick={this.handleIconSelect}>
                                    <IconIcon className="fas fa-hand-spock" />
                                  </IconItem>
                                  
                
                
                                </div>
                            </div>
                            </div>
                          </div>
                          <button
                            className="btn btn-primary mt-3"
                            onClick={this.handleNewSubmit}
                            type="submit"
                          >Sign Up</button>
                        </form> 
                        : null
              
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