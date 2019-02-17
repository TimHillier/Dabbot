//vidClassifer
let mobilenet;
let classifier;
let video;
let label = 'test';
let ukeButton;
let whistleButton;
let trainButton;
let x = 480;
let y = 360; 
function modelReady() {
  console.log('Model is ready!!!');
}

function videoReady() {
  console.log('Video is ready!!!');
}

function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    classifier.classify(gotResults);
  } else {
    console.log(loss);
  }
}


function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    label = result;
    classifier.classify(gotResults);
  }
}
function preload()
{

}
function setup() {
  createCanvas(x, y);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);


  ukeButton = createButton('Dab');
  ukeButton.mousePressed(function() {
    classifier.addImage('Dab');
  });

  whistleButton = createButton('Not Dab');
  whistleButton.mousePressed(function() {
    classifier.addImage('Not Dab');
  });

  loadButton = createButton('load');
  loadButton.mousePressed(function() {
    LoadData();
    // classifier.train(whileTraining);
  });

  trainButton = createButton('train');
  trainButton.mousePressed(function() {
    classifier.train(whileTraining);
  });



}

function draw() {
  background(0);
  image(video, 0, 0, x, y);
  fill(255);
  textSize(16);
  text(label, 10, height - 10);
}


function LoadData()
{
    for(i = 0; i < 175; i++)
    {
        classifier.addImage("ResizedDabs/Train/Dabs/Dab" + i+".jpg","Dab");  
    }
    for(i=0; i<175; i++)
    {
        classifier.addImage("ResizedDabs/Train/NotDabs/NotDab" + i + ".jpg","Not Dab");
    }
    print("Load Complete");
}