function make_table() {
    var table = '<table><thead><th>Name</th><th>Links</th></thead><tbody>';
    for (var i = 0; i < myarray.length; i++) {
        table += '<tr><td>' + myarray[i][0] + '</td><td>' + myarray[i][1] + '</td></tr>';
    };

    var w = window.open("");
    w.document.write(table);
}

var c = 0
var skipped = 0
var x = document.querySelectorAll("a");
var myarray = []
var item_counter = 0
var skipped_array = []

function randomIntFromInterval(min, max){ // min an max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function fetchFile(url, filename) {
    fetch(url).then(res => res.blob()).then(file => {
        let tempUrl = URL.createObjectURL(file);
        const aTag = document.createElement("a");
        aTag.href = tempUrl;
        aTag.download = filename;
        document.body.appendChild(aTag);
        aTag.click();
        console.log(url + " fetched!")
        c++
        console.log("Downloaded " + c + "/" + item_counter + " items! Skipped " + skipped + " items!")
        if(c == (item_counter + skipped)){
            console.log("All files fetched.")
        }
    }).catch(file => {
        console.log(error)
        console.log("Unable to fetch from: " + url)
        console.log("Downloaded " + c + "/" + item_counter + " items! Skipped " + skipped + " items!")
        skipped++
        skipped_array.push(url)
        if(c == (item_counter + skipped)){
            console.log("All files fetched.")
        }
    });
}
for (var i = 0; i < x.length; i++) {
    if (x[i].textContent.includes(".jpg") || x[i].textContent.includes(".jpeg") || x[i].textContent.includes(".png") || x[i].textContent.includes(".mov") || x[i].textContent.includes(".mp4") || x[i].textContent.includes(".swf") || x[i].textContent.includes(".WebP") || x[i].textContent.includes(".zip") || x[i].textContent.includes(".pdf")) {
        item_counter++
    }
}
console.log("There are " + item_counter + " items available to download!")
for (var i = 0; i < x.length; i++) {
    if (x[i].textContent.includes(".jpg") || x[i].textContent.includes(".jpeg") || x[i].textContent.includes(".png") || x[i].textContent.includes(".mov") || x[i].textContent.includes(".mp4") || x[i].textContent.includes(".swf") || x[i].textContent.includes(".WebP") || x[i].textContent.includes(".zip") || x[i].textContent.includes(".pdf")) {
        var nametext = x[i].textContent;
        var cleantext = nametext.replace(/\s+/g, ' ').trim();
        var cleanlink = x[i].href;
        myarray.push([cleantext, cleanlink]);
        setTimeout(fetchFile(x[i].href, cleantext), randomIntFromInterval(15, 200));
    }
};

function retry() {
    if (skipped_array.length > 0) {
        console.log("Retrying skipped items.")
        item_counter = skipped_array.length
        c = 0
        skipped = 0
        x = skipped_array
        skipped_array = []
        for (var i = 0; i < x.length; i++) {
            if (x[i].textContent.includes(".jpg") || x[i].textContent.includes(".jpeg") || x[i].textContent.includes(".png") || x[i].textContent.includes(".mov") || x[i].textContent.includes(".mp4") || x[i].textContent.includes(".swf") || x[i].textContent.includes(".WebP") || x[i].textContent.includes(".zip") || x[i].textContent.includes(".pdf")) {
                var nametext = x[i].textContent;
                var cleantext = nametext.replace(/\s+/g, ' ').trim();
                var cleanlink = x[i].href;
                myarray.push([cleantext, cleanlink]);
                setTimeout(fetchFile(x[i].href, cleantext), randomIntFromInterval(15, 200));
            }
        };
    }


}

retry()
retry()
retry()

if (skipped_array.length > 0) {
    console.log(skipped_array)
}