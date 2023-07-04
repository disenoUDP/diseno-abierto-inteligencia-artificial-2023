

/*
Hand Tracking + KNN Classifier

The example lets you train a knn algorithm to classify handposes

Built with handPose model from tf.js, knn-classifier from ml5js and p5js

Created by Yining Shi & Andreas Refsgaard 2020
*/

let distanciaDedos = 0;

let palabra = null;

let model, video, keypoints, predictions = [];
// Create a KNN classifier
const classifier = knnClassifier.create();

function preload() {
  video = createCapture(VIDEO, () => {
    loadHandTrackingModel();
  });
  video.hide();
}

function setup() {
  const canvas = createCanvas(600, 400);
  canvas.parent('canvasContainer');
  noStroke();
  palabra = createP('distancia');
  palabra.style('color', 'magenta');
  palabra.style('font-size', '16px');
}

async function loadHandTrackingModel() {
  // Load the MediaPipe handpose model.
  model = await handpose.load();
  predictHand();
}

function draw() {
  background(255);
  if (model) image(video, 0, 0);
  if (predictions.length > 0) {
    drawKeypoints();
  }
}

async function predictHand() {
  // Pass in a video stream (or an image, canvas, or 3D tensor) to obtain a hand prediction from the MediaPipe graph.
  predictions = await model.estimateHands(video.elt);

  setTimeout(() => predictHand(), 100);
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  let prediction = predictions[0];
  
  let thumbFinger = prediction.landmarks[4];
  fill(255, 255, 0);
  ellipse(thumbFinger[0], thumbFinger[1], 10, 10);
  
  let indexFinger = prediction.landmarks[8];
  fill(255, 0, 255);
  ellipse(indexFinger[0], indexFinger[1], 10, 10);
  
  distancia = sqrt(pow((thumbFinger[0] - indexFinger[0]), 2) + ((thumbFinger[1] - indexFinger[1]), 2));
  // console.log(distancia);
  palabra.position( 0.5 * (thumbFinger[0] + indexFinger[0]), 0.5 * (thumbFinger[1] + indexFinger[1]));
  console.log(palabra.style('letter-spacing'));
 palabra.style('letter-spacing', 0.5*distancia + 'px'); 
}
