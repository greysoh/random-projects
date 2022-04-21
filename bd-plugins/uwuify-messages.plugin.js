//META{"name":"bottom"}*//

function rgblog(...args) {
  console.log("%c[uwuify]%c", "color: #0080ff", "", ...args);
}

class bottom {
  constructor() {
    this.initialized = false;
  }

  getName() {
    return "uwuify-messages";
  }
  getShortName() {
    return "uwuify";
  }
  getDescription() {
    return "Uwuifies your Discord messages";
  }
  getVersion() {
    return "0.1.0";
  }
  getAuthor() {
    return "greysoh";
  }

  getSettingsPanel() {
    return "touch grass";
  }

  load() {
    return true;
  }

  unload() {
    return true;
  }

  async start() {
    const button = document.createElement("button");

    button.type = "button";
    button.className =
      "button-f2h6uQ lookBlank-21BCro colorBrand-I6CyqQ grow-2sR_-F greysohIsNotAFurry--";
    button.ariaLabel = "UwUify your message";
    button.innerHTML = document.getElementsByClassName(
      "button-f2h6uQ lookBlank-21BCro colorBrand-I6CyqQ grow-2sR_-F"
    )[5].innerHTML;

    button.onclick = async () => {
      BdApi.showToast(
        "UwUifying your message... (Connecting to localhost:8080...)",
        { type: "info" }
      );

      let messageText = document
        .getElementsByClassName(
          "markup-eYLPri editor-H2NA06 slateTextArea-27tjG0 fontSize16Padding-XoMpjI"
        )[0]
        .getElementsByTagName("span")[1].innerText;
      try {
        const url = new URL("http://localhost:8080/");
        url.searchParams.append("text", messageText);

        const response = await fetch(url.href);
        const text = await response.text();

        console.log(response);

        document
          .getElementsByClassName(
            "markup-eYLPri editor-H2NA06 slateTextArea-27tjG0 fontSize16Padding-XoMpjI"
          )[0]
          .getElementsByTagName("span")[1].innerText = text;

        //document.getElementsByClassName("markup-eYLPri editor-H2NA06 slateTextArea-27tjG0 fontSize16Padding-XoMpjI")[0].getElementsByTagName("span")[1].dispatchEvent(new KeyboardEvent('keydown', {
        //  'key': 'a'
        //}));
      } catch (e) {
        //rgblog(e);
        BdApi.showToast("Error: " + e, { type: "error" });
      }
    };

    document
      .getElementsByClassName(
        "button-f2h6uQ lookBlank-21BCro colorBrand-I6CyqQ grow-2sR_-F"
      )[5]
      .parentNode.appendChild(button);>
      document.getElementsByClassName("greysohIsNotAFurry--")[i].remove();
  }

  initialize() {
    this.initialized = true;
  }
}
