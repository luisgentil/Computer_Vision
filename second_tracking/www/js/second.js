var app = {
  inicio: function() {
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
    
  var colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
/*/añadido elige camara
  var videoSource = "";

  navigator.mediaDevices.enumerateDevices().then(function (devices) {
    for(var i = 0; i < devices.length; i ++){
        var device = devices[i];
        console.log(devices[i], devices[i]);
        //Microsoft LifeCam Studio (045e:0772)
        //Logitech HD Pro Webcam C920 (046d:082d)
        if (device.kind === 'videoinput' && device.label === camera) {
          videoSource = device.deviceId;
        }
    };
  }).then(function(){
    var constraints = {
          video: {deviceId: videoSource ? {exact: videoSource} : undefined},
    };
    
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        try {
                  element.src = window.URL.createObjectURL(stream);
              }catch (err) {
                element.src = stream;
              }
        video.onloadedmetadata = function(e) {
          video.play();
        };
      })
      .catch(function(err) {
        console.log(err.name + ": " + err.message);
      });
  });
//fin añadido */

  colors.on('track', function(event) {
  //  context.strokeStyle = '#fff';
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (event.data.length === 0) {
      // No colors were detected in this frame.
    } else {
     // console.log(event.data);
      event.data.forEach(function(rect) {
        context.strokeStyle = rect.color;
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    //    console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
        context.font = '11px Helvetica';
        context.fillStyle = rect.color;
        context.fillText(rect.color, rect.x + rect.width + 5, rect.y + 11);
      });
    }
  });

  tracking.track('#myVideo', colors, {camera: true});
  }
}


if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        app.inicio();
      }, false);
    }
