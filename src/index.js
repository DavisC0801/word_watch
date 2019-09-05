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

  renderError(errorMessage){
    let errorFrame = document.getElementById('error-frame')
    cleanup(errorFrame)
    let errorText = createNode("h1")
    errorText.innerHTML = errorMessage
    errorFrame.appendChild(errorText);
  }

  fetchTopWord(){
    fetch(`${this.apiAddress}/top_word`)
    .then((response) => response.json())
    .then((topWord) => {
      this.renderTopWord(topWord["word"])
    })
    .catch(error => {
      this.renderError(error)
    })
  }

  renderTopWord(word){
    let frame = document.getElementById('word-count-frame')
    this.cleanup(frame)
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
  wordWatch.cleanup(document.getElementById('error-frame'))
  wordWatch.fetchTopWord();
})
