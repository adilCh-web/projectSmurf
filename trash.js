let container = document.querySelector(".container")


//generatin the clouds
function cloudGenerating(){
  
    let randomTimeFrames = [500,800,1000,1500,2000,1000] //timeframes in ms
    let index = Math.floor(Math.random() * randomTimeFrames.length)
    console.log("clicked")
    //creating an image (cloudObject)
    let cloud = document.createElement("img")
    cloud.className = "cloud";//giving it a class
    cloud.setAttribute("src","./img/pngwing.png") //sitting a source
    cloud.style.left="3000px"
    container.appendChild(cloud)
    let myInerval = setInterval(()=>{
        cloud.style.left = (parseFloat(cloud.style.left.replace("px","")) - 5) + "px";
        //console.log(cloud.style.left)
        if(Number(cloud.style.left.replace("px",""))<-300)
        {
            clearInterval(myInerval)
            cloud.remove()
            setTimeout(()=>{
                cloudGenerating()
            },randomTimeFrames[index])
            
        }

    },randomTimeFrames[index])

}

cloudGenerating()

//setting the position of the smurf
let smurf = document.getElementById("smurf")
smurf.style.left = "200px"
smurf.style.top=  "500px"
smurf.style.transform = "scaleX(-1)"//we turn the smurf by default to the right side
let facedright = true;



// an Object smurf

let  smurfObject = {
    positionLeft: Number(smurf.style.left.replace("px","")),
    positionTop: Number(smurf.style.top.replace("px","")),
    facedright:true,
    canJump:true,
    movingLeft(){
        smurfObject.positionLeft= smurfObject.positionLeft - 10
        smurf.style.left = smurfObject.positionLeft+"px"
        if(smurfObject.facedright==true){
            smurf.style.transform = "scaleX(1)"
            console.log("should turn left")
            smurfObject.facedright=false;
        }
    },

    movingrRight(){
        smurfObject.positionLeft= smurfObject.positionLeft + 10
        smurf.style.left = smurfObject.positionLeft +"px";
        if(smurfObject.facedright==false){
            smurf.style.transform = "scaleX(-1)"
            console.log("should turn right")
            smurfObject.facedright=true
        }


    },
    jumping(){
        if(smurfObject.canJump){

            /*creating an interval for every 100ms the smurf jump 10px untill it reaches 440px then we clear the interval */
            smurfObject.canJump=false
            let jumpUp = setInterval(()=>{
                smurfObject.positionTop = smurfObject.positionTop-10;
                smurf.style.top = smurfObject.positionTop+"px"
                console.log(smurfObject.positionTop)
                if(smurfObject.positionTop==440){
                    clearInterval(jumpUp)
                    /* creating another interval once the smurf jump 60px to bring bring him back to the floor */
                    let jumpDown = setInterval(()=>{
                        console.log("fwrgrrherhy")
                        smurfObject.positionTop = smurfObject.positionTop+10;
                        smurf.style.top = smurfObject.positionTop+"px"
                        //once in the floor we clear the interval
                        if(smurfObject.positionTop==500){
                            clearInterval(jumpDown)
                            smurfObject.canJump=true
                        }
        
                    },100)
                }},100)
        }

    }

}

document.querySelector("body").addEventListener("keyup", (e) => {
    if (e.keyCode == 37) {
        smurfObject.movingLeft()
        console.log(smurfObject.positionLeft)
       //console.log(smurf.style.top.replace("px",""))
    }
    else if(e.keyCode ==39){
        smurfObject.movingrRight()
        //console.log(smurfObject.positionLeft)
        
    }
    })


document.querySelector("body").addEventListener("keyup", (e)=>{
    if(e.keyCode==38){
        smurfObject.jumping()
    };  

})


let trees = [{url:"./img/trees/cartoon-tree-1.png",height:300},
{url:"./img/trees/cartoon-tree-2.png",height:250},{url:"./img/trees/cartoon-tree-3.png",height:400},{url:"./img/trees/cartoon-tree-4.png",height:550},{url:"./img/trees/cartoon-tree-5.png",height:500},{url:"./img/trees/cartoon-tree-6.png",height:450}]
for(let i=0;i<10;i++){
    let div = document.createElement("div")
    div.className = "square";
    div.style.left = Math.floor(Math.random() * 3000) +"px";
    let img = document.createElement("img")
    let treeObj = trees[Math.floor(Math.random()*6)]
    img.setAttribute("src",treeObj.url)
    img.style.position ="absolute"
    img.style.left = Math.floor(Math.random() * 3000) +"px";
    img.style.height = treeObj.height + "px"
    img.style.top =  (600 - treeObj.height) +"px"
    console.log(treeObj.height)   
    console.log(treeObj.url)   
    container.appendChild(img)
    container.appendChild(div)

}



function myFunction(event) {
    let previous = smurf.style.left.replace("px","")
    var x = event.touches[0].clientX;
    //var y = event.touches[0].clientY;
    if(previous > x){
        smurf.style.left =  x + "px"
        smurf.style.transform = "scaleX(-1)"
        let walking = setInterval(() => {
            smurf.style.left = (Number(smurf.style.left.replace("px","") ) - 3) + "px"
            if(Number(smurf.style.left.replace("px",""))<x){
                clearInterval(walking)
            }
        }, 500);
    }
    else if(previous<x){
        smurf.style.left =  x + "px";
        //smurf.style.top =  y + "px";
        smurf.style.transform = "scaleX(1)"
        let walking = setInterval(() => {
            smurf.style.left = (Number(smurf.style.left.replace("px","") ) + 3) + "px"
            if(Number(smurf.style.left.replace("px",""))>x){
                clearInterval(walking)
            }
        }, 500);
    }
    else
    {

    }
    
  }