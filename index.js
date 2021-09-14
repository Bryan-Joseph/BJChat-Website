document.getElementById("login").onclick = function() {
    var name = document.getElementById("nameI").value;
    var room = document.getElementById("roomI").value;

    localStorage.setItem("user-name", name);
    localStorage.setItem("room-name", room);

    window.location = "chat.html";
};
