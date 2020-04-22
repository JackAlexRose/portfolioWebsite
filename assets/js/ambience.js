let ambiencecontext = new AudioContext();
var url  = 'assets/audio/ambience.wav';

const ambienceGainNode = ambiencecontext.createGain();
ambienceGainNode.gain.value = 0.2;
ambienceGainNode.connect(ambiencecontext.destination);

source = ambiencecontext.createBufferSource();
source.connect(ambienceGainNode);

 //load buffer
 var request = new XMLHttpRequest();
 //open the request
 request.open('GET', url, true); 
 //webaudio paramaters
 request.responseType = 'arraybuffer';
 //Once the request has completed... do this
 request.onload = function() {
    ambiencecontext.decodeAudioData(request.response, function(response) {
         // --- play the sound AFTER the buffer loaded --- 
         //set the buffer to the response we just received.
         source.buffer = response;
         //start(0) should play asap.
         source.start(0);
         source.loop = true;
     }, function () { console.error('The request failed.'); } );
 }
 //Now that the request has been defined, actually make the request. (send it)
 request.send();

 