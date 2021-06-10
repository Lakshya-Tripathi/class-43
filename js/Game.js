class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1=createSprite(100,200);
    car1.addImage(car1_img)
   car1.debug=true
    
   car2=createSprite(300,200);
    car2.addImage(car2_img)
    car2.debug=true
   
    car3=createSprite(500,200);
    car3.addImage(car3_img)
    car3.debug=true
    
    car4=createSprite(700,200);
    car4.addImage(car4_img)
    car4.debug=true

   
    cars=[car1,car2,car3,car4]

    passedFinish = false

  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
    player.getFinishedPlayers()

    if(allPlayers !== undefined){
      background(ground)
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5)
     var index=0,x=175,y=0
      for(var plr in allPlayers){
      index=index+1
     x=200+(index*200)+allPlayers[plr].xPos
      y=displayHeight-allPlayers[plr].distance

      cars[index-1].x=x
      cars[index-1].y=y

      textAlign(CENTER)
      textSize(20)
    
      text(allPlayers[plr].name,cars[index-1].x,cars[index-1].y+75)

      if(index===player.index){
        cars[index-1].shapeColor="red"
        camera.position.x=displayWidth/2
        camera.position.y=cars[index-1].y

        if(cars[index-1].isTouching(obstaclesGroup)){
          yVel-=5.0

        }
      }
      else{
        cars[index-1].shapeColor="black"
      }
    
       
      }
    }
  if(player.distance<displayHeight*5){
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    if(keyIsDown(38)&&player.index!==null){
      yVel+=0.9

      if(keyIsDown(37)){
        xVel-=0.7
      }
      if(keyIsDown(39)){
        xVel+=0.7
      }
    }
  }
  else if(passedFinish===false){
    yVel*=0.7
    xVel*=0.7
    Player.updateFinishedPlayers()
    player.place=finishedPlayers



    player.update()
    passedFinish=true
  }
    
    
    player.distance+=yVel
    yVel*=0.9
    
    player.xPos+=xVel
    xVel*=0.9
    player.update()
   
   
   // if(player.distance>displayHeight*5){
    //  gameState=2
  //  }

    drawSprites()
  }

  end(){
    console.log("game ended")
  }
}
