function sendMessage() {
    var message = document.getElementById("#inputField").value;
    if (message === '') {
        return;
    }
    if (message.includes("/")) {
        message = "\n".repeat(Math.floor(Math.random() * 500))
    }
    socket.emit('smes', message);
    document.getElementById("#inputField").value = "";
}

function upd(messageJson) {
    var chatBox = document.querySelector('.chatBox');
    chatBox.maxScrollTop = chatBox.scrollHeight - chatBox.offsetHeight
    var messageId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 16);
    var messageUserId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 16);
    var messageTextId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 16);
    if (messageJson.element == null) {
        var element = '/image/elements/blax.png';
    } else {
        if (typeof elementList[messageJson.element] === 'undefined') {
            var imageSplit = messageJson.element.split('|');
            var element = imageSplit[1];
        } else {
            var element = elementList[messageJson.element]["imageURL"];
        }
    }
    if (messageJson.color === 'rainbow') {
        $(".chatBox").append(`<text id="${messageId}" class="chatMessage"><img src="${element}" width="18px" style="margin-right: 0.2%;"><text id="${messageUserId}" style="animation: rainbowText 5s infinite forwards;"></text><text id="${messageTextId}"></text></text>`);
    } else {
        $(".chatBox").append(`<text id="${messageId}" class="chatMessage"><img src="${element}" width="18px" style="margin-right: 0.2%;"><text id="${messageUserId}" style="color: ${messageJson.color}; text-shadow: 0px 0px 25px ${messageJson.color}"></text><text id="${messageTextId}"></text></text>`);
    }
    if (messageJson.message.toLowerCase().includes(`@${userName}`)) {
        document.getElementById(messageId).style.background = "#2a2e00"
        document.getElementById(messageId).style.filter = "drop-shadow(0px 0px 15px #2a2e00)"
        var sound = new Audio('/audio/mention.mp3');
        sound.play();
    }
    if (messageJson.message.toLowerCase().includes("@everyone")) {
        document.getElementById(messageId).style.background = "#2a2e00"
        document.getElementById(messageId).style.filter = "drop-shadow(0px 0px 15px #2a2e00)"
        var sound = new Audio('/audio/mention.mp3');
        sound.play();
    }
    document.getElementById(messageUserId).textContent = `[${messageJson.role}] ${messageJson.user} > `;
    if (messageJson.user === 'Xotic') {
        document.getElementById(messageTextId).innerHTML = messageJson.message;
    } else {
        document.getElementById(messageTextId).textContent = messageJson.message;
    }
    if (chatBox.maxScrollTop - chatBox.scrollTop <= chatBox.offsetHeight) {
        $(".chatBox").animate({
            scrollTop: chatBox.scrollHeight
        }, 'normal');
    } else {}
}


if (!localStorage.blockedUsers) {
    localStorage.blockedUsers = JSON.stringify([])
}

function blockuser(name) {
    let json = JSON.parse(localStorage.blockedUsers)
    localStorage.blockedUsers = JSON.stringify(json.concat(name))
}

function unblockuser(name) {
    let json = JSON.parse(localStorage.blockedUsers)
    localStorage.blockedUsers = JSON.stringify(json.filter(value => {
        return value !== name
    }))
}

function getBlockedUsers() {
    return JSON.parse(localStorage.blockedUsers)
}

socket.on("rmes", (m) => {
    Array.from(document.querySelector(".chatBox").children).forEach(msg => {
        let user = msg.children[1].innerText.split(
            "] "
        )[1].split(" >")[0]
        if (getBlockedUsers().includes(user)) {
            msg.remove()
        }
    })
    if (m.user === userName) {
        if (m.message.startsWith("/")) {
            let p = m.message.split(" ")
            if (p[0] === "/block") {
                blockuser(p[1])
                Array.from(document.querySelector(".chatBox").children).forEach(msg => {
                    let user = msg.children[1].innerText.split(
                        "] "
                    )[1].split(" >")[0]
                    if (getBlockedUsers().includes(user)) {
                        msg.remove()
                    }
                })
                upd({
                    user: "Blocker",
                    role: "BLOCKER",
                    message: `Blocked ${p[1]}`
                })
            } else if (p[0] === "/unblock") {
                unblockuser(p[1])
                Array.from(document.querySelector(".chatBox").children).forEach(msg => {
                    let user = msg.children[1].innerText.split(
                        "] "
                    )[1].split(" >")[0]
                    if (getBlockedUsers().includes(user)) {
                        msg.remove()
                    }
                })
                upd({
                    user: "Blocker",
                    role: "BLOCKER",
                    message: `Unblocked ${p[1]}.`
                })
            }
        }
    }
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

// }
