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
    cloud.style.left="2700px"
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
smurf.style.animationPlayState ="paused"
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

    movingRight(){
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
        smurfObject.movingRight()
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
for(let i=0;i<20;i++){
    let div = document.createElement("div")
    div.className = "square";
    div.style.left = Math.floor(Math.random() * 7700) +"px";
    let img = document.createElement("img")
    let treeObj = trees[Math.floor(Math.random()*6)]
    img.setAttribute("src",treeObj.url)
    img.style.position ="absolute"
    img.style.left = Math.floor(Math.random() * 7700) +"px";
    img.style.height = treeObj.height + "px"
    img.style.top =  (600 - treeObj.height) +"px"
    img.style.zIndex = 40
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

let sun = document.getElementById("sun");

let count = 0
sun.style.top ="10px"
sun.style.left ="40%"

let switch_ =true

  function switchingNight(){
    if(switch_){
        //this should be the background color rgb(39, 39, 41) when the sun is completly gone
        //ps:the actual is rgb(39, 112, 247);
        let g=112
        let b = 247
        //we assign the switch to false so we cant trigger the function till we are out of the interval --- see code below setinterval and clear
        switch_ =false
        // to display the moon:
        let opacity=0
    
        let changeDayNight = setInterval(()=>{
            sun.style.top = (Number(sun.style.top.replace("px",""))+5) + "px"
            sun.style.left = (Number(sun.style.left.replace("px",""))-1) + "px";
            console.log(Number(sun.style.left.replace("px","")))
            count+=1
            console.log(count) // the count will be 160 untill it dessapear completly
            g-=(112-39)/160
            b-=(247-41)/160
            container.style.backgroundColor= `rgb(39,${g},${b})`
            console.log(`rgb(39,${g},${b})`)

            if(count>100){
                document.getElementById("moon").style.opacity =opacity
                opacity+=0.030
                //console.log(opacity + "this is the opacity")
            }
            //here we change from fixed to absolute when the sun goes at the bottom of the container because fixed is fixed to the page and absolute is to the container

            if(Number(sun.style.top.replace("px",""))>800){
                clearInterval(changeDayNight)
                switch_ =true
            }
        },100)
    }



  }

  sun.addEventListener("click",switchingNight)

let birds = document.getElementById("birds")
birds.style.left = "6000px"

function movingBird(){

    let movingBirdsInterval = setInterval(()=>{
        if(Number(birds.style.left.replace("px",""))>-240){
            birds.style.left=(Number(birds.style.left.replace("px",""))-5) + "px"

        }
        else{
            clearInterval(movingBirdsInterval)
            birds.style.left = "7700px"
            movingBird()
        }

    },200)
}
movingBird()


function switchingDay(){
    //this is the opposite of the previos switchinNight
    if(switch_){
        //ps:the actual is rgb(39,39.45625000000045,42.28750000000078);
        let g=39.45625000000045
        let b = 42.28750000000078
        //we assign the switch to false so we cant trigger the function till we are out of the interval --- see code below setinterval and clear
        switch_ =false
        // to display the moon:
        let opacity=1
    
        let changeDayNight = setInterval(()=>{
            sun.style.top = (Number(sun.style.top.replace("px",""))-5) + "px"
            sun.style.left = (Number(sun.style.left.replace("px",""))+1) + "px";
            console.log(Number(sun.style.left.replace("px","")))
            count-=1
            console.log(count) // the count will be 160 untill it dessapear completly
            g+=(112-39)/160
            b+=(247-41)/160
            container.style.backgroundColor= `rgb(39,${g},${b})`
            console.log(`rgb(39,${g},${b})`)

            if(count<159){
                document.getElementById("moon").style.opacity =opacity
                opacity-=0.020
                //console.log(opacity + "this is the opacity")
            }
            //here we change from fixed to absolute when the sun goes at the bottom of the container because fixed is fixed to the page and absolute is to the container

            if(Number(sun.style.top.replace("px",""))<11){
                clearInterval(changeDayNight)
                switch_ =true
            }
        },100)
    };}

    document.getElementById("moon").addEventListener("click",switchingDay)