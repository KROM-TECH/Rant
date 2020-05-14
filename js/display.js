db.collection("Rants").onSnapshot((snapshot)=>{
  // console.log(snapshot.docChanges())
  snapshot.docChanges().forEach(change =>{
    console.log(change, change.doc.data())
  })
})