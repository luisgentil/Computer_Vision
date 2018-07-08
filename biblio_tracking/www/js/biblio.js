// es como second tracking, con modificaciones.
// el index es similar, con inclusiones para pruebas en fotos en vez de webcam (comentadas)

var app = {
  inicio: function() {

 /* BlancoYNegro = function() {
  var pixels = document.getElementById('myOther');
  var ctx = pixels.getContext("2d");
  var imgData=ctx.getImageData(10,10,50,50);
  ctx.putImageData(imgData,10,70);
 // tracking.Image.grayscale(pixels, 400, 300);
},*/

    document.getElementById('notas').innerText ="OK!";

    navigator.mediaDevices.getUserMedia({
      'video': {
        'facingMode': 'environment'
      }
    }).then(function(mediaStream) {
      var mediaControl = document.querySelector('video');
      mediaControl.srcObject = mediaStream;
      mediaControl.src = URL.createObjectURL(mediaStream);
    });
    
    /*tracking.ColorTracker.registerColor('white', function(r, g, b) {
    if (r > 240 && g > 240 && b > 240) {
      return true;
    }
    return false;
  });*/
  //var colors = new tracking.ColorTracker(['white']);
  var tracker = new tracking.ObjectTracker(['cascade']);
  tracker.setStepSize(1.7);

  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  /*colors.on('track', function(event) {
  //  context.strokeStyle = '#fff';
    context.clearRect(0, 0, canvas.width, canvas.height);
    var orden = 0;
    if (event.data.length === 0) {
      // No colors were detected in this frame.
    } else {
      console.log(event.data);
      event.data.forEach(function(rect) {
        orden +=1;
        context.strokeStyle = 'red';//rect.color;
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    //    console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
        context.font = '11px Helvetica';
        context.fillStyle = 'red';//rect.color;
        context.fillText(orden, rect.x + rect.width -15, rect.y + 11);
      });
    }
  });*/

  tracker.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var orden = 0;
    if (event.data.length === 0) {
      // No colors were detected in this frame.
    } else {
      console.log(event.data);
      event.data.forEach(function(rect) {
        //orden +=1;
        context.strokeStyle = 'red';//rect.color;
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
        context.font = '11px Helvetica';
        context.fillStyle = 'red';//rect.color;
        context.fillText(orden, rect.x + rect.width -15, rect.y + 11);
          });
    }
  });



 // tracking.track('#myVideo', colors, {camera: true}); // OJOOOO: colors no está definido ahora

   tracking.track('#myVideo', tracker);  //¿ hay que añadir camera true ?


      }, // cierre fuction inicio
};        // cierre var app


if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        app.inicio();
      }, false);
    }