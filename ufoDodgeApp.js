const app = new PIXI.Application();
const ufoList = [];
document.body.appendChild(app.view);

const rocket = PIXI.Sprite.from('ufoDodgeRocket.png')
rocket.x = 350;
rocket.y = 520;
rocket.scale.x = 0.05;
rocket.scale.y = 0.05;
app.stage.addChild(rocket);

gameInterval(function() {
    const ufo = PIXI.Sprite.from('ufoDodgeUfo'+ random(1, 2) +'.png')
    ufo.x = random(50, 650);
    ufo.y = -30;
    ufo.scale.x = 0.06;
    ufo.scale.y = 0.06;
    app.stage.addChild(ufo);
    ufoList.push(ufo);
    flyDown(ufo, 0.8);

    waitForCollision(ufo, rocket).then(function(){
        app.stage.removeChild(rocket);
        stopGame();
    }
)
}, 300);

function leftKeyPressed(){
    rocket.x = rocket.x - 7;
}
function rightKeyPressed(){
    rocket.x = rocket.x + 7;
}

function spaceKeyPressed(){
    const bullet = PIXI.Sprite.from('ufoDodgeBullet.png')
    bullet.x = rocket.x + 15;
    bullet.y = 510;
    bullet.scale.x = 0.02;
    bullet.scale.y = 0.02;
    flyUp(bullet, 7);
    app.stage.addChild(bullet);;

    waitForCollision(bullet, ufoList).then(function([bullet, ufo]){
        app.stage.removeChild(bullet);
        app.stage.removeChild(ufo);
    })
}