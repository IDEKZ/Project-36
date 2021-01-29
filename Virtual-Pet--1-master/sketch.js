var dog, happyDog;
var database;
var foodS, foodStock;
var dogImage, happyDogImage;
var fedTime,lastFed;
var foodObj
function preload()
{
  dogImage=loadImage("images/dogImg.png");
  happyDogImage=loadImage("images/dogImg1.png")
}

function setup() {
  database=firebase.database();
  createCanvas(1000, 500);

  dog=createSprite(850,250,10,10);
  dog.addImage(dogImage);
  dog.scale=0.35;

  foodObj=new Food();
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  //background(46,139,87);
  currentTime=hour()
  
  foodObj.display();

  fedTime=database.ref('FedTime');
  fedTime.on("value",function(data){
  lastFed=data.val();
});
  drawSprites();
}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog.addImage(happyDogImage);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
  Food:foodObj.getFoodStock(),
  feedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


