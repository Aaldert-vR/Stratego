//De juiste achtergrond tonen
class Background{
    constructor(img,x,y,w,h){
        this.x=x;
        this.y=y;
        this.width=w;
        this.height=h;
        this.image=img;
    }
    draw(){
        image(this.image,this.x,this.y,this.width,this.height);
    }
}