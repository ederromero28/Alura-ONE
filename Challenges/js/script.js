const btnEncrypted = document.getElementById("btnEncrypted");
const btnDecrypted = document.getElementById("btnDecrypted");
const inputTextArea = document.getElementById("inputTextArea");
const outputTextArea = document.getElementById("outputTextArea");
const btnCopyResult = document.getElementById("btnCopyResult");
const pre_information = document.getElementsByClassName("pre-information");



const keysEncoded = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};

inputTextArea.addEventListener("input", validateText);

function encrypt() {
  if (inputTextArea.value !== "") {
    const text = inputTextArea.value;
    let encrypted = text;
    for (const key in keysEncoded) {
      const regex = new RegExp(key, "g");
      encrypted = encrypted.replace(regex, keysEncoded[key]);
    }
    writeResult(encrypted);
  }
}

function decrypt() {
  if (inputTextArea.value !== "") {
    const text = inputTextArea.value;
    let encrypted = text;
    for (const key in keysEncoded) {
      const regex = new RegExp(keysEncoded[key], "g");
      encrypted = encrypted.replace(regex, key);
    }
    writeResult(encrypted);
  }
}

function writeResult(text) {
  outputTextArea.value = text;
  showOrHiddenTextOutput("none", "block");
}

function copyResult() {
  outputTextArea.select();
  if (!navigator.clipboard) {
    document.execCommand("copy");
    return;
  }
  navigator.clipboard.writeText(outputTextArea.value);
}

function validateText() {
  if (inputTextArea.value === "") {
    showOrHiddenTextOutput("block", "none");
    return;
  }

  //FUNCION PARA NO PERMITIR CARACTERES ESPECIALES
  const regex =
    /[W]|[áéíóúÁÉÍÓÚ¿¡«»“”‘’'"´`+*()\-–—/\\=|#@^\[\]{}%$§&~;:<>!?]|[A-Z]/g;
  const cleanedText = inputTextArea.value.replace(regex, "");
  inputTextArea.value = cleanedText;
}

function showOrHiddenTextOutput(style1, style2) {
  for (let i = 0; i < pre_information.length; i++) {
    pre_information[i].style.display = style1;
  }
  outputTextArea.style.display = style2;
  btnCopyResult.style.display = style2;
}
