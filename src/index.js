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

  renderMessage(newMessage){
    let messageFrame = document.getElementById('message-frame')
    this.cleanup(messageFrame)
    let messageText = this.createNode("h1")
    messageText.innerHTML = newMessage
    messageFrame.appendChild(messageText);
  }

  fetchTopWord(){
    fetch(`${this.apiAddress}/top_word`)
    .then(response => response.json())
    .then(topWord => {
      this.renderTopWord(topWord["word"])
    })
    .catch(error => {
      this.renderMessage(error)
    })
  }

  renderTopWord(word){
    let frame = document.getElementById('word-count-frame')
    this.cleanup(frame)
    let topWord = this.createNode("h2")
    topWord.innerHTML = `Current Top Word: ${Object.keys(word)[0]} <br> Current Top Word Count: ${Object.values(word)[0]}`
    frame.appendChild(topWord)
  }

  addNewWords(){
    let wordField = document.getElementById('new-word-input')
    let inputArray = wordField.value.split(" ")
    inputArray.forEach(word => {
      let trimmedWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
      fetch(`${this.apiAddress}/words`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({word: {value: trimmedWord.trim()}})
      })
      .then((response) => this.renderMessage("Words Successfully Added"))
      .catch(error => {
        this.renderMessage(error)
      })
    })
    wordField.value = ''
    this.fetchTopWord();
  }
}

let wordWatch = new WordWatch()

$(document).ready(() => {
  wordWatch.fetchTopWord();
  let breakDownButton = document.getElementById('break-down-submit')
  breakDownButton.addEventListener("click",  () => {wordWatch.addNewWords()});
})
