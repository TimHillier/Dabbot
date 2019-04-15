# DabBot
DabBot is an AI that will classify weather you are dabbing or not. Built in Javascript using [ML5]([https://ml5js.org/](https://ml5js.org/)) and [p5Js]([https://p5js.org/](https://p5js.org/)), It uses your camera to classify weather you current body position is a dab. This was just a silly project where the main goal was to get more familiar with machine learning libraries and how to use them. I chose ML5 since it is built ontop of [TensorflowJS]([https://www.tensorflow.org/js](https://www.tensorflow.org/js)). 
I learned a lot while messing around with this, especially Collecting data, and Data Preprocessing. 

# How To Run
Running the bot is simple. All that needs to be done is to start a local server in directory. I have used a Python https server to do this. 
## Python3 
``
python3 -m http.server <Port>
``
## Python2
``
python -m SimpleHTTPServer <Port>
``

If no port is specified then it defaults to 8000. After the server is started, going to localhost:<Port> You will be greated by a camera window and a few buttons. From here Load the data, Train the Ai, and then you'll be able to eaisly classify dabs.
