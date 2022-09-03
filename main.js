object=[];
statuscoco="";
function setup(){
    canvas = createCanvas(1240,336);
	canvas.parent('canvas');

    video=createCapture(VIDEO);
	video.size(800,400);
	video.parent('vidcam');
    video.hide();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById('status').innerHTML="Status : detecting objects";
    gotinput=docuent.getElementById('inputobject').value;

}
function modelLoaded(){
    console.log("modelisloaded");
    statuscoco=true;
}
function gotResult(error,results){

    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;    
}


function draw(){
    Image(video,0,0,800,400);

    if(statuscoco!=""){
    objectDetector.detect(video,results);
for(i=0; i<objects.length; i++)
{
    fill("red");
conf=floor(objects[i].confidence *100);
text(obects[i].label + " "+conf +"%",objects[i].x,objects[i].y);
nofill();
stroke("red");
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

    
    if(objects[i].label==gotinput){
        video.stop();
        objectDetector.detect(gotResult);
        document.getElementById('status2').innerHTML="found";
        synth=window.speechSynthesis;
        utterThis=new SpeechSynthesisUtterance(gotinput+"found");
        synth.speak(utterThis);
    }
    else{
        document.getElementById("status2").innerHTML="notfound";
    }
}
}
}
