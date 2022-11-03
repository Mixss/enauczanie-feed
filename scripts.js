const api_url = "https://enauczanie-feed.herokuapp.com"
// https://enauczanie-feed.herokuapp.com

var feed_messages_to_show = 3;

function checkIfSingleDigit(value){
    if(value<10){
        return "0" + value;
    }
    return value;
}
function formatDate(secs){
    var date = new Date(1970, 0, 1);
    date.setMilliseconds(secs)
    var offset = date.getTimezoneOffset()
    date.setTime(date.getTime() - (offset * 60000))

    var hrs = checkIfSingleDigit(date.getHours());
    var mins = checkIfSingleDigit(date.getMinutes());
    var d = checkIfSingleDigit(date.getDate());
    var month = checkIfSingleDigit(date.getMonth()+1);
    var year = date.getFullYear();

    return hrs + ":" + mins + ", " + d + "." + month + "." + year;
}

function openTab(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

async function getMessages(){
    let response = await fetch(api_url+"/message/newest/"+feed_messages_to_show);
    let data = await response.json();
    return data;
}

function sendMessage(){
    let messageContent = document.getElementById("input-message").value;
    if (messageContent == "") {
        alert("Message content cannot be empty");
        return;
    }
    if (messageContent.length > 1000) {
        alert("Message content cannot be longer than a thousand characters");
        return;
    }

    var mesgImg = document.getElementById("input-image").value;
    let messageImage = mesgImg == "" ? null : mesgImg;

    // let messageImage = document.getElementById("input-message").value;
    var author = "";
    let userinitials = document.getElementsByClassName("userinitials")[0];
    if(typeof userinitials != "undefined"){
        author = document.getElementsByClassName("userinitials")[0].innerHTML;
    }
    else {
        let avatar_image = document.getElementsByClassName("userpicture")[0];
        author = `<img src='`+avatar_image.src+`' class='userpicture' alt='' width='35' height='35'>`
    }

    // sending POST to api

    var xhr = new XMLHttpRequest();
    var url = api_url+"/message/add";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

    }
    };
    var dataToSend = JSON.stringify(
        {
            "message" : messageContent,
            "author" : author,
            "date" : null,
            "image" : messageImage
        }
    )
    xhr.send(dataToSend)
   
    alert("Wiadomość została wysłana!")
    document.location.reload();
}

function showOlderMessages(){
    feed_messages_to_show += 3;
    loadFeedMessages();

}

function addShowMoreMessage(){
    let feedWrapper = document.getElementById("feed-wrapper");
    let morebutton_div = document.createElement("div");
    morebutton_div.setAttribute("class", "morebutton");

    let morebutton = document.createElement("a");
    morebutton.setAttribute("onclick", "showOlderMessages()");
    morebutton.setAttribute("href", "#feed-wrapper");
    morebutton.innerHTML = "Zobacz starsze wiadomości";

    morebutton_div.append(morebutton);

    feedWrapper.append(morebutton_div);
}

function addFeedMessage(messageText, messageAuthor, messageDate, messageImage ,index){
    var feedWrapper = document.getElementById("feed-wrapper");

    let mainDiv = document.createElement("div")
    mainDiv.setAttribute("id", "msg-"+toString(index))
    mainDiv.setAttribute("class", "message-body")

    let msgp = document.createElement("p")
    msgp.setAttribute("class", "message-text")
    msgp.innerHTML = messageText;

    mainDiv.append(msgp)

    if(messageImage != null){
        let msgImgDiv = document.createElement("div");
        msgImgDiv.setAttribute("class", "message-image-div")
        let msgImg = document.createElement("img");
        msgImg.setAttribute("class", "message-image");
        msgImg.setAttribute("src", messageImage)

        msgImgDiv.append(msgImg);
        mainDiv.append(msgImgDiv)
    }



    let msgspan = document.createElement("span");
    msgspan.setAttribute("class", "message-author");
    msgspan.innerHTML = messageAuthor;

    mainDiv.append(msgspan);

    let msgtime = document.createElement("time");
    msgtime.setAttribute("class", "message-date")
    msgtime.innerHTML = formatDate(messageDate);

    mainDiv.append(msgtime)


    feedWrapper.append(mainDiv)
}

function loadFeedMessages(){
    document.getElementById("feed-wrapper").innerHTML = "";
    getMessages().then(messages => {
        console.log("Pobrano")
        for(let i=0; i<messages.length; i++){
            msg = messages[i];
            addFeedMessage(msg.message, msg.author, msg.date, msg.image, i);
        }
        if(messages.length >= feed_messages_to_show)
            addShowMoreMessage();
    })
    openTab(event, 'feed-wrapper')
}


loadFeedMessages();



