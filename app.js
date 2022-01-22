const jokesList = document.querySelector(".jokes");

document.querySelector(".get-jokes").addEventListener("click", getJokes);

function getJokes(e) {
  const numberInput = document.querySelector("#number");
  if (numberInput.value) {
    const url = `http://api.icndb.com/jokes/random/${numberInput.value}`;
    handleAjaxCall("GET", url, function (response) {
      showJoke(response.value);
    });
  } else {
    showAlert("Fill Number Field");
  }
  e.preventDefault();
}

function showJoke(jokes) {
  let liTag = "";
  jokes.forEach(function (joke) {
    liTag += `<li>${joke.joke}</li>`;
  });
  jokesList.innerHTML = liTag;
}

function showAlert(text) {
  const container = document.querySelector(".container");
  const form = document.querySelector("form");

  const message = document.createElement("span");
  message.className = "alert";

  message.appendChild(document.createTextNode(text));

  container.insertBefore(message, form);
  jokesList.innerHTML = "";
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 2000);
}

function handleAjaxCall(method, url, callBack) {
  const xhr = new XMLHttpRequest();

  xhr.open(method, url, true);

  xhr.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      callBack(response);
    }
  };

  xhr.send();
}
