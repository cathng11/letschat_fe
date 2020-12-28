export async function getListContact(data) {
    const response = await fetch('https://letschat-bb.herokuapp.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: data })
    });
    return await response.json();
}

export async function getListMessages(data) {
    const response = await fetch('https://letschat-bb.herokuapp.com/api/listMessages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: data })
    });
    return await response.json();
}
export async function getListGroup(data) {

    const response = await fetch('https://letschat-bb.herokuapp.com/api/listGroup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: data })
    });
    return await response.json();
}
export async function getInfoMemGroup(ID_Room) {

    const response = await fetch('https://letschat-bb.herokuapp.com/api/listGroup/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ info: ID_Room })
    });
    return await response.json();
}
export async function checkRegister(data) {

    const response = await fetch('https://letschat-bb.herokuapp.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: data })
    });
    return await response.json();
}
//Api login
export async function login(data) {
    const response = await fetch('https://letschat-bb.herokuapp.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: data[0], password: data[1], timeOnline: data[2], check: data[3] })
    });
    return await response.json();
}

//Lay tin nhan chat giua 2 user
export async function getMessages(data) {
    const response = await fetch('https://letschat-bb.herokuapp.com/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idRoom: data })
    });
    return await response.json();
}

//Add message
export async function addMessage(data) {
    const response = await fetch('https://letschat-bb.herokuapp.com/api/messages/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: data[0], idRoom: data[1], message: data[2], time: data[3] })
    });
    return await response.json();
}
//update user profile
export async function updateUserProfile(user) {

    const response = await fetch('https://letschat-bb.herokuapp.com/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: user })
    });
    return await response.json();
}
//change password
export async function changePass(oldpass,newpass, username) {

    const response = await fetch('https://letschat-bb.herokuapp.com/api/user/updatePass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldpass: oldpass,newpass: newpass, username: username })
    });
    return await response.json();
}
//search user through phone number
export async function searchUser(phone) {

    const response = await fetch('https://letschat-bb.herokuapp.com/api/user/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone:phone })
    });
    return await response.json();
}
//Check if isFriend
export async function checkStatusFr(user1,user2) {

    const response = await fetch('https://letschat-bb.herokuapp.com/api/friend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user1: user1,user2:user2 })
    });
    return await response.json();
}
//Insert friend
export async function sendRequest(id,sender,receiver,time) {

    const response = await fetch('https://letschat-bb.herokuapp.com/api/friend/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id:id,sender:sender,receiver:receiver,time:time })
    });
    return await response.json();
}

//insert tbl_chatroom
export async function createChatRoom(id,name,avatar) {

    const response = await fetch('https://letschat-bb.herokuapp.com/api/chatroom/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id:id,name:name,avatar:avatar})
    });
    return await response.json();
}
//update tbl_chatroom
export async function updateRoom(id,avatar) {

    const response = await fetch('https://letschat-bb.herokuapp.com/api/chatroom/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id:id,avatar:avatar})
    });
    return await response.json();
}
//get tbl_chatroom
export async function getInfoRoom(id) {

    const response = await fetch('https://letschat-bb.herokuapp.com/api/chatroom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id:id})
    });
    return await response.json();
}
//insert tbl_participants
export async function addParticipants(id,id_room,list) {

    const response = await fetch('https://letschat-bb.herokuapp.com/api/participants/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id:id,id_room:id_room,list:list})
    });
    return await response.json();
}

//get participants
export async function getListMembers(idRoom) {

    const response = await fetch('https://letschat-bb.herokuapp.com/api/participants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({idRoom:idRoom})
    });
    return await response.json();
}
//Api notifications
export async function getNotifications(data) {
    const response = await fetch('https://letschat-bb.herokuapp.com/api/notifications', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: data})
    });
    return await response.json();
}

//data = [sender, receiver, isFriend] -> isFriend: accept: 0 || deny: 1
//Accept FR
export async function acceptFriendRequest(data) {
    const response = await fetch('https://letschat-bb.herokuapp.com/api/friend/accept', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data: data})
    });
    return await response.json();
}

//Read notification
export async function readNotification(data) {
    const response = await fetch('https://letschat-bb.herokuapp.com/api/notifications/read', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: data})
    });
    return await response.json();
}

//Api logout
export async function logout(data) {
    const response = await fetch('https://letschat-bb.herokuapp.com/api/login/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: data[0], time: data[1]})
    });
    return await response.json();
}