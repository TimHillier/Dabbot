//DabBotV2
notDabs = [];
dabs = [];
trainData = [];
let feature; 
let classifier; 
let imageToCheck; 
let loss; 
let TrainButton; 

function preload()
{
    dabs.push(loadImage("/ResizedDabs/Train/Dabs/Dab3.jpg"));
    print("Loaded");
}


function setup()
{
    noCanvas();
    imageToCheck = createImg('ResizedDabs/Predict/25.jpg');
    // feature = ml5.featureExtractor('mobilenet',modelReady);
    // classifier = feature.classification(imageToCheck,imageReady);
    classifier = ml5.imageClassifier('MobileNet',modelReady);
    TrainButton = createButton("Train");
    TrainButton.mousePressed(TrainModel);

    LoadButton = createButton("Load");
    LoadButton.mousePressed(Loadimg);
}

function draw()
{
    
}

function modelReady()
{
    console.log("Model is Ready");
    classifier.predict(imageToCheck,gotResults);

}

function imageReady()
{
    console.log("Image is Ready");
}

function LoadData()
{
    for(i = 0; i < 150; i++)
    {
        // img = createImg("ResizedDabs/Train/Dabs/Dab"+i+".jpg");
        // img.hide();
        classifier.addImage("ResizedDabs/Train/Dabs/Dab" + i+".jpg","Dab");
        
    }
    for(i=0; i<150; i++)
    {
        // img = createImg("ResizedDabs/Train/NotDabs/NotDab"+i+".jpg")
        img = loadImage("ResizedDabs/Train/NotDabs/NotDab" + i + ".jpg");
        classifier.addImage(img,"Not Dab");

        // img.hide();
        // classifier.addImage("ResizedDabs/Train/NotDabs/NotDab" + i + ".jpg","Not Dab");
    }
}

function Loadimg()
{
    classifier.addImage(dabs[0],"Dab");
}

function TrainModel()
{
    classifier.train(function(lossValue) {
        console.log("loss is: ",lossValue)
    });
}

function classify()
{
    classifier.classify(imageToCheck,gotResults);
}

function gotResults(error,result)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        classifier.predict(imageToCheck,gotResults);
        // console.log(results);

    }
}