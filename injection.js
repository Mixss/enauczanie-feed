
function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];

    if (f) {
      var r = new FileReader();
      r.onload = function(e) {
        var contents = e.target.result;
    }
    r.readAsText(f);
    } else {
    console.log("readSingleFile: Failed to load file");
  }
}

function injectionTemplate() {

    return "<p>sadasd</p>"
}

var fs = require('fs');

    fs.readFile('injection-template.html', 'utf-8', function(err, data)) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
    }

console.log("dupa dupa");
console.log("chuj");

const injection = injectionTemplate();
document.getElementById("inject-here").insertAdjacentHTML("afterbegin", injection);
