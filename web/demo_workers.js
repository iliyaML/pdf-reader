self.onmessage = function (msg) {
    if(msg.data.bounds){
        console.log(msg.data.bounds);
    }
}

var i = 0;

function timedCount() {
    i = i + 1;
    //let indexedDB = indexedDB;
    var req = indexedDB.open('localforage', 2);

    req.onupgradeneeded = function (e) {
        self.postMessage('successfully upgraded db');
    };
    req.onsuccess = function (e) {
        self.postMessage('successfully opened db');
        var db = req.result;
        var tx = db.transaction("keyvaluepairs", "readwrite");
        var store = tx.objectStore("keyvaluepairs");
        // Query the data
        var getJohn = store.get('key');
        getJohn.onsuccess = function() {
            console.log(getJohn.result);  // => "John"
        };

    };
    req.onerror = function (e) {
        self.postMessage('error');
    }
}

self.postMessage('Running...');
timedCount();

// fetch('http://localhost:60433/api/products/heatmap')
//     .then(function(resp){
//         return resp.json();
//     })
//     .then(function(response){
//         timedCount();
//     });