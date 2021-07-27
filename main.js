Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach(camera);

function capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+ data_uri + '">';
    })
}

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/dd9TvXH-1/model.json",model_loaded());

function model_loaded(){
    console.log("model loaded");
}

function speak(){
    var synth= window.speechSynthesis;
    var speak_data_1 = "the first pridictiction is"+ Prediction_1;
    var utter_this= new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utter_this);
}

function identify(){
    img= document.getElementById("captured_image");
    classifier.classify(img, got_result);
    }
    
    function got_result(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log("result");
        document.getElementById("result_emotion_name").innerHTML= results[0].label;
        Prediction_1= results[0].label;
        speak();
        if(results[0].label == "amazing"){
            document.getElementById("update_emoji").innerHTML= "&#128076;";
        }
        if(results[0].label == "best"){
            document.getElementById("update_emoji").innerHTML= "&#128077;";
        }
        if(results[0].label == "victory"){
            document.getElementById("update_emoji").innerHTML= "&#9996;";
        }
      
    }
    }