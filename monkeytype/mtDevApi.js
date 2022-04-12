const mtDevApi = {
  showNotif: async function (notifTitle, notifBody) {
    let elem = document.createElement("div");
    elem.className = "notif good";
    elem.id = "7";
    elem.innerHTML += `<div class="icon"><i class="fas fa-fw fa-check"></i></div>\n<div class="message"><div class="title">${notifTitle}</div>${notifBody}</div>`;
    elem.style = " ";

    elem.onclick = function () {
        let opacity = 1;
        let interval = setInterval(function () {
            opacity -= 0.012;
            elem.style.opacity = opacity;
            if (opacity <= 0) {
                clearInterval(interval);
                elem.remove();
            }
        });
    }

    document.getElementsByClassName("history")[0].appendChild(elem);

    await mtDevApi.niceToHaves.sleep(3000);
    elem.click();
  },
  niceToHaves: {
    sleep: function (ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
};
