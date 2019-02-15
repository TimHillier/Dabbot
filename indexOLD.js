//not the best Going to try posenet
//posenet info
// 5	leftShoulder   <--
// 6	rightShoulder  <--
// 7	leftElbow      <--
// 8	rightElbow     <--
// 9	leftWrist      <--
// 10	rightWrist     <--

//left 5,7,9
//right 6,8,10



let video;
let poseNet;
let poses = [];
let skeletons = [];
let SHead,SHlefthand,SHrighthand,SHbody;
let shrekify = false; 
let img;
let dabs = [];
let notdabs = [];    
let classifier; 
let v = true; 
let t = true; 
let doneTraining = false; 
let dabbing = false; 
let score = 0; 

function preload()
{ 
  for(let i = 0; i < 150; i ++)
  {
   notdabs.push("ResizedDabs/Train/NotDabs/NotDab"+i+".jpg");
   print("Dab Pushed");
  }
   for(let i = 0; i < 150; i++)
   {
    dabs.push("ResizedDabs/Train/Dabs/Dab"+i+".jpg");
    print("Dab Pushed");
   }
   
  

}
function videoReady()
{
  //just a call back
  print("Video Ready");
}

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  let features = ml5.featureExtractor('MobileNet',modelReady); //extracts features from ml5(mobilenet)
  classifier = features.classification(video,videoReady);  //create the classifier. 
  //train
  
}

function draw() 
{
  if(doneTraining)
  {
    // isDab(); 
  }
  if(v)
  {
  // dabo(); 
  image(video, 0, 0, width, height);
  }

  // We can call both functions to draw all keypoints and the skeletons
  //drawKeyPoints();
  // drawSkeleton();
}


// A function to draw ellipses over the detected keypoints
function drawKeyPoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = poses[i].pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        //draw left and right different colors. 
        fill(255, 0, 0);

        if(shrekify) //paint shrek 
        {
        switch(j)
        {
          case 0: 
          image(SHead,keypoint.position.x-SHead.width/2,keypoint.position.y-SHead.height/2); 
          break;
          case 9:
          image(SHlefthand,keypoint.position.x-SHlefthand.width/2,keypoint.position.y-SHlefthand.height/2); 
          break;
          case 10:
          image(SHrighthand,keypoint.position.x-SHrighthand.width/2,keypoint.position.y-SHrighthand.height/2); 
          break;
        }
      }


        noStroke();
        // ellipse(keypoint.position.x, keypoint.position.y, 50, 50);
      }
      }
    }
  }



  // A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    // For every skeleton, loop through all body connections
    for (let j = 0; j < poses[i].skeleton.length; j++) {
      let partA = poses[i].skeleton[j][0];
      let partB = poses[i].skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

// The callback that gets called every time there's an update from the model
function gotPoses(results) {
  poses = results;
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
    // console.log("This is a " + result.toString());
    label = results[0].className;
    classifier.classify(video,getResults);
    // print(reslut[0].className);
    // print(result.toString());

  }
}

function dabo()
{
  isDab.innerHTML = "not a dab"; 
}

function loadData()
{
  //put training images here;
  for(let i = 0; i < dabs.length; i++)
  {
     classifier.addImage(dabs[i],"Dab",temp); 
     print("Dab Pushed");
  } 
  for(let i = 0; i < notdabs.length; i++)
  {
    classifier.addImage(notdabs[i],"Not Dab",temp);
    print("Not Dab Pushed");
  }
  print(classifier);

  //this is being called before the data has been added

  // TrainModel();

}

function TrainModel()
{
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
  
  classifier.classify(video,getResults);
  // classifier.predict(getResults);
   
}
function Shrekify()
{
  shrekify = !shrekify;  
}

// A function to be called when the model has been loaded
function modelReady() 
{
  print("Model REady");
  loadData(); 
}

function temp()
{
  print("added");
}

