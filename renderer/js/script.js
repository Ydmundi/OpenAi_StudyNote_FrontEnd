const form = document.getElementById("form-sentence");
const inputField = document.getElementById("inputField");
const sendButton = document.getElementById("sendButton");
const maxHeight = 100;

if (form) {
  form.onsubmit = async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    console.log(formData.get("Input"));
    const response = await window.axios.openAI(formData.get("Input"));

    const outputArea = document.getElementById("outputArea");
    const responseText = response.choices[0].text;


    outputArea.innerHTML = "Here are the 5 keypoints when you study about " + formData.get("Input") + ":\n\n" + responseText;

    console.log(responseText);
    inputField.value = "";
  };
}

inputField.addEventListener("input", () => {
  inputField.style.height = "auto";
  inputField.style.height = inputField.scrollHeight + "px";

  // Adjust height when removing text
  if (inputField.scrollHeight > maxHeight) {
    inputField.style.overflowY = "scroll";
    inputField.style.height = maxHeight + "px";
  } else if (inputField.value === "") {
    inputField.style.height = "20px"; // Set the default height when there is no text
  } else {
    inputField.style.overflowY = "hidden";
  }
});

inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission
    sendButton.click(); // Trigger click event on the send button
  }
});

inputField.addEventListener("input", () => {
  if (inputField.value.trim() !== "") {
    sendButton.style.display = "inline-block";
  } else {
    sendButton.style.display = "none";
  }
});

sendButton.addEventListener("click", sendMessage);

function sendMessage() {
  inputField.style.overflowY = "hidden";
  inputField.style.height = "20px";
  sendButton.style.display = "none";
}
