import * as lib from "./lib.js";

async function fetchMail(mail) {
  let messageBody = JSON.parse(
    await lib.default.fetch(
      `https://www.1secmail.com/api/v1/?action=getMessages&login=${
        mail.split("@")[0]
      }&domain=${mail.split("@")[1]}`
    )
  );
  let msgResponse = [];

  for (let i = 0; i < messageBody.length; i++) {
    const getMessageData = JSON.parse(
      await lib.default.fetch(
        `https://www.1secmail.com/api/v1/?action=readMessage&login=${
          mail.split("@")[0]
        }&domain=${mail.split("@")[1]}&id=${messageBody[i].id}`
      )
    );

    msgResponse.push(getMessageData);
  }

  return msgResponse;
}

let Mail = "";

console.log("Generating Geforce Now email...");
let email = await lib.default.fetch(
  "https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1",
  "POST",
  {}
);

Mail = JSON.parse(email)[0];

console.log("Your email is: " + Mail);

while (true) {
  console.log("Fetching mail...");
  let mail = await fetchMail(Mail);

  for (let i = 0; i < mail.length; i++) {
    if (mail[0].subject == "NVIDIA Account Created") {
      let htmlBody = mail[0].htmlBody;

      let activationCode = htmlBody.split("\n");
      for (let i = 0; i < activationCode.length; i++) {
        let noSpacesActivation = activationCode[i].replaceAll(" ", "");

        if (noSpacesActivation.startsWith(`<tdalign="center"class="em_font"`)) {
          console.log(
            "(NVidia) Activation link found at line " +
              i +
              " is: " +
              activationCode[i].split('<a href="')[1].split('"')[0]
          );
          break;
        }
      }
    }
  }

  await lib.default.sleep(10000);
}
