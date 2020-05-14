
    const record = document.querySelector('#record');
    const pause = document.querySelector('#pause');
    const stop = document.querySelector('#stop');
    const soundClips = document.querySelector('#sound-clips');

    // disable stop button while not recording
    stop.disabled = true;
    pause.disabled = true;


    // visualiser setup - create web audio api context and canvas Not done yet.

    // const audioCtx = new (window.AudioContext || webkitAudioContext)();
    // const canvasCtx = canvas.getContext("2d");

    //main block for doing the audio recording

    if (navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia supported.');

      let chunks = [];

      const onSuccess = (stream) => {

        const mediaRecorder = new MediaRecorder(stream);

        record.onclick = function () {
          if (mediaRecorder.state == 'inactive') {
            mediaRecorder.start();
            stop.disabled = false;
            record.disabled = true;
            pause.disabled = false;
          } else {
            mediaRecorder.resume();
            stop.disabled = false;
            record.disabled = true;
            pause.disabled = false;
          }


        }

        pause.onclick = function () {
          mediaRecorder.pause();
          stop.disabled = false;
          record.disabled = false;
          pause.disabled = true;

        }

        stop.onclick = function () {
          mediaRecorder.stop();
          stop.disabled = true;
          record.disabled = false;
          pause.disabled = true;

        }

        mediaRecorder.onstop = function (e) {
          let clipContainer = document.createElement('article');
          let audio = document.createElement('audio');
          let deleteButton = document.createElement('button');
          let uploadButton = document.createElement('upload')
          let space = document.createElement('br')

          clipContainer.classList.add('clip');
          audio.setAttribute('controls', '');
          deleteButton.textContent = 'Delete';
          deleteButton.className = 'delete btr waves-effect waves-light btn';
          uploadButton.textContent = 'Upload';
          uploadButton.className = 'save btr waves-effect waves-light btn';
          console.log(audio)

          clipContainer.appendChild(audio);
          clipContainer.appendChild(space);
          clipContainer.appendChild(deleteButton);
          clipContainer.appendChild(uploadButton);
          soundClips.appendChild(clipContainer);

          audio.controls = true;
          let blob = new Blob(chunks, { 'type': 'audio/mpeg; codecs=opus' });
          chunks = [];
          let audioURL = window.URL.createObjectURL(blob);
          audio.src = audioURL;
          console.log("recorder stopped");

          deleteButton.onclick = (e) => {
            evtTgt = e.target;
            evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
          }

          saveButton.onclick = (e) => {
            console.log(blob)
            alert(`Save sends this ${blob.size}-bit audio blob to server`)
          }
        }

        mediaRecorder.ondataavailable = function (e) {
          chunks.push(e.data);
        }
      } // onSuccess

      const onError = (err) => {
        console.log('The following error occured: ' + err);
      }

      navigator.mediaDevices.getUserMedia({ audio: true }).then(onSuccess, onError);

    } else {
      console.log('getUserMedia not supported on your browser!');
    }