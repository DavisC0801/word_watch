import $ from 'jquery'

class WordWatch{
  constructor(){
    this.apiAddress = "https://wordwatch-api.herokuapp.com/api/v1"
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
    fetch(`${this.apiAddress}/top_word`)
    .then((response) => response.json())
    .then((topWord) => {
      this.renderTopWord(topWord["word"]);
    })
  }

  renderTopWord(word){
    let frame = document.getElementById('word-count-frame')
    this.cleanup(frame)
    console.log(Object.keys(word)[0])
    let topWord = this.createNode("h3")
    topWord.innerHTML = "Current Top Word: " + Object.keys(word)[0]
    let topWordCount = this.createNode("h3")
    topWordCount.innerHTML = "Current Top Word Count: " + Object.values(word)[0]
    frame.appendChild(topWord)
    frame.appendChild(topWordCount)
  }
}

let wordWatch = new WordWatch()

$(document).ready(() => {
  wordWatch.fetchTopWord();
})
