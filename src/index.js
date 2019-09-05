import $ from 'jquery'

class WordWatch(){
  constructor(){
    this.apiAddress = "https://wordwatch-api.herokuapp.com"
  }

  cleanup(element){
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  createNode(element){
    return document.createElement(element);
  }

  fetchTopWord(){
    fetch(this.apiAddress)
    .then((response) => response.json())
    .then((topWord) => {
      this.renderTopWord(topWord);
    })
  }

  renderTopWord(word){
    let frame = document.getElementById('top-word-frame')
    this.cleanup(frame)
  }

}

$(document).ready(() => {
  // have fun!
})
