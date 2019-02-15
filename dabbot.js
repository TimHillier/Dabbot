showVideo = false;
let video;
let img;
let dabs = [];
let notdabs = [];   
let train = [];  
let classifier; 
let doneTraining = false; 
let dabbing = false; 

function preload()
{ 
  //max dabs is 288
    for(let i = 0; i < 150; i ++)
    {
    notdabs.push("ResizedDabs/Train/NotDabs/NotDab"+i+".jpg");
    }
   for(let i = 0; i < 150; i++)
   {
    dabs.push("ResizedDabs/Train/Dabs/Dab"+i+".jpg");
   }
   for(let i = 1; i < 62; i++)
   {
       train.push("ResizedDabs/Predict/"+i+".jpg");
   }


}


function setup() {
    //createCanvas(224, 224);
    noCanvas();
    img = document.getElementById("predict");
    let features = ml5.featureExtractor('MobileNet',modelReady); //extracts features from ml5(mobilenet)
    classifier = features.classification(img,imgReady);
   


    print("Done Setup");
  }

  function draw() 
  {
    if(doneTraining)
    {
      isDab(); 
    }
    
  }

  //get result of classification.
  function getResults(err,result)
  {
    if(err)
    {
      print(err);
      //ahhhhhh
    }
    else
    {
      console.log("This is a " + result.toString());
    }
  }
  function loadData()
  {
    //put training images here;
    for(let i = 0; i < dabs.length; i++)
    {
       classifier.addImage("ResizedDabs/Train/Dabs/NotDab"+i+".jpg","Dab",temp); 
       print("Dab Pushed");
    } 
    for(let i = 0; i < notdabs.length; i++)
    {
      classifier.addImage("ResizedDabs/Train/NotDabs/NotDab"+i+".jpg","Not Dab",temp);
      print("Not Dab Pushed");
    }
    print(classifier);
  
  }
  
  function TrainModel()
  {
      print("TrainModel");
      classifier.train(function(lossValue) {
        if (lossValue) {
          loss = lossValue;
          print(loss)
        } else {
          doneTraining = true; 
    }
      });
   
  }
  
  function isDab()
  {
    print("IsDab");
    // classifier.classify(video,getResults);
    //classifier.classify(img,getResults);
    classifier.predict(getResults);
    // classifier.predict(video,getResults);
     
  }
  
  // A function to be called when the model has been loaded
  function modelReady() 
  {
    print("ModelReady");
    loadData(); 
  }

  function imgReady()
  {
    print("Image Ready");
  }
  
  function temp()
  {
    print("added");
  }