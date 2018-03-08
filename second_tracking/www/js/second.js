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
      },
};


if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        app.inicio();
      }, false);
    }