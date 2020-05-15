const rant = document.querySelector('.collapsible')

db.collection("Rants").onSnapshot((snapshot)=>{
  // console.log(snapshot.docChanges())
  snapshot.docChanges().forEach(change =>{
   
    if (change.type === 'added') {
      //adding document data to webpage
      renderRant(change.doc.data())
    }
  })

  function renderRant(data){
    var rantRef = storageRef.child('Rants/' + `${data.title}`)
    rantRef.getDownloadURL().then(function (url) {
      console.log(data)
      const html = `
          <li>
            <div class="collapsible-header"><i class="material-icons">album</i>${data.title} <span class="blue-text"
                style="margin-left: 7rem;">Created on: ${data.time}</span></div>
            <div class="collapsible-body center-align"><span>${data.desc}</span>
              <br> <br> <br>
              <audio class="audio" controls="controls">
                <source type="audio/mpeg" src="${url}">
              </audio>
              <br>
              <p class="waves-effect waves-green btn-flat modal-trigger" href= '#commentmodal'>Comment</p>
            </div>
          </li>
    `;
      rant.innerHTML += html
    })
    
  }
})