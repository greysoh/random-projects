import requests
import time

from pyngrok import ngrok

tunnel = ngrok.connect(8000)

url = tunnel.public_url.replace("http", "wss")
url = url.replace("https", "wss")

print("* ngrok running on: " + url)
print("* connecting to femboywm backend...")

password = input(" - Password: ")
param = {"url": url, "password": password}

request = requests.post(url="https://femboymc.greysoh.repl.co/api/v1/setIP", json=param)
request = request.json()

if request["error"] != "Ok.":
    print("* error: " + request["error"])
    exit()

print("* femboywm backend connected!")

while True:
    time.sleep(1)