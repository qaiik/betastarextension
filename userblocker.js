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
