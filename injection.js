

function injectionTemplate() {
    return `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Mixss/enauczanie-feed@release-1-1-6/env/style.css"/>
    

    <div id="nickname">TwójNick</div>

    <div id="feed-section">
        <div class="tab-wrapper">
            <button class="tablinks" onclick="openTab(event, 'feed-wrapper')">Feed</button>
            <button class="tablinks" onclick="openTab(event,
            'feed-new-message')">Nowa wiadomość</button>
        </div>
        <div id="feed-wrapper" class="tabcontent">
        <h2>Trwa ładowanie wiadomości...</h2>
        </div>

        <div id="feed-new-message" class="tabcontent">
            <h2>Dodaj nową wiadomość</h2>
            <div id="message-form">
                Treść wiadomości:<br>
                <input id="input-message" type="text"/> <br>
                Link do obrazka (opcjonalnie):<br>
                <input id="input-image" type="text"/> <br/>
                <button class="btn btn-secondary" onclick="sendMessage()">Wyślij</button>
            </div>
        </div>
    </div>

    <script src="scripts.js"></script>
    `
}

const injection = injectionTemplate();
document.getElementById("inject-here").insertAdjacentHTML("afterbegin", injection);

var script = document.createElement('script');

script.src = "https://cdn.jsdelivr.net/gh/Mixss/enauczanie-feed@release-1-1-6/scripts.js"

document.getElementById("inject-here").appendChild(script);
