if (!localStorage.blockedUsers) {
  localStorage.blockedUsers = JSON.stringify([])
}

function blockuser(name) {
  let json = JSON.parse(localStorage.blockedUsers)
  localStorage.blockedUsers = JSON.stringify(json.concat(name))
}

function unblockuser(name) {
  let json = JSON.parse(localStorage.blockedUsers)
  localStorage.blockedUsers = JSON.stringify(json.filter(value=>{
    return value !== name
  }))
}

function getBlockedUsers() {
  return JSON.parse(localStorage.blockedUsers)
}

socket.on("rmes", (m)=>{
  Array.from(document.querySelector(".chatBox").children).forEach(msg=>{
    let user = msg.children[1].innerText.split(
        "] "
    )[1].split(" >")[0]
    if (getBlockedUsers().includes(user)) {
      msg.remove()
    }
    })
})

// window.bumodal="";
// document.querySelector("body > div.chatBox").oncontextmenu = (e)=>{
//     e.preventDefault();
//     let chatmessage = e.target.parentNode;
//     let el = document.createElement("div")
//     el.innerHTML = `<div style="position: absolute; background-color: white; top:${event.pageY - 10}px;left:${event.pageX - 40}px" class="elementRightClickMenu"><p onclick="setAvatar()">Set Avatar</p></div>`
//     document.querySelector("body").appendChild(el)
//     window.bumodal = el
  
// }

// document.querySelector("body > div.chatBox").onclick = (e)=>{
//     e.preventDefault();
//     window.bumodal.remove();
//     window.bumodal = ""
 
}
