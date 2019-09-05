import $ from 'jquery'

class WordWatch(){
  constructor(){
    this.apiAddress = "https://wordwatch-api.herokuapp.com"
  }

  fetchTopWord(){
    fetch(this.apiAddress)
    .then((response) => response.json())
    .then((topWord) => {
      this.renderTopWord(topWord);
    })
  }
}

$(document).ready(() => {
  // have fun!
})
