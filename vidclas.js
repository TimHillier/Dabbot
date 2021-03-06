//vidClassifer
let mobilenet;
let classifier;
let video;
let label = 'Load and Train';
let ukeButton;
let whistleButton;
let trainButton;
let x = 480;
let y = 360;

averageResult = []


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
        // label = result;
      //this should average it out
      if (averageResult.length() < 10)
      {
          if(result == "Dab")
          {
              averageResult.push(1)
          }
          else
          {
              averageResult.push(-1)
          }

      }
      else
      {
          sum = averageResult.reduce(add);
          averageResult = [];
          label = getLabel(sum);

      }



    //what if i averaged them?
    classifier.classify(gotResults);
  }
}

function getLabel(S)
{
    if(S > 0)
    {
        return "Dab"
    }
    else
    {
        return "Not Dab"
    }


}

function setup() {
  createCanvas(x, y);
  // can.position((windowWidth - width /2),(windowHeight - height) /2);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);

  //These 2 buttons are to add your own dabs and not dabs to the ai.
  // ukeButton = createButton('Dab');
  // ukeButton.position();
  // ukeButton.mousePressed(function() {
  //   classifier.addImage('Dab');
  // });
  //
  // whistleButton = createButton('Not Dab');
  // whistleButton.position();
  // whistleButton.mousePressed(function() {
  //   classifier.addImage('Not Dab');
  // });

  loadButton = createButton('Load');
  loadButton.position();
  loadButton.mousePressed(function() {
    LoadData();
  });

  trainButton = createButton('Train');
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

const add = (a,b) => a + b