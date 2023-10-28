
// Randomly select a mirror URL
// it's useless for decoying anything at the front-end, 
// but it's still slightly better than listing all URLs explicitly...
function getRandomMirror() {
    
    var mirrors = [
        "https://cmx.205777.xyz",
        "https://cmx.000010086.xyz",
        "https://cmx.0500000.xyz",
    ];

    // Loop through all mirrors and check if they are accessible
    // if accessible, add to a new list
    var reachableMirrors = [];
    mirrors.forEach(mirror => {
        fetch(mirror + '/api/v1/instance', {mode: 'no-cors'}).then(r=>{
        // Wait for 1 second before adding to the list
        console.log(mirror + ' reachable');
        reachableMirrors.push(mirror);
        })
        .catch(e=>{
        console.log(mirror + ' unreachable');
        });
    });

    // Display the loading text
    document.getElementById("mirror-addresses-loading").style.display = "inline-block";

    // Wait for 5 seconds before checking the list
    // if the list is empty, return a random mirror
    setTimeout(function(){
        if (reachableMirrors.length == 0) {
        console.log('no reachable mirrors');
        var randomIndex = Math.floor(Math.random() * mirrors.length);
        document.getElementById("mirror-login").href = mirrors[randomIndex];
        } else {
        console.log('reachable mirrors: ' + reachableMirrors);

        // Get the current hour
        var currentHour = new Date().getHours();
        console.log('currentHour: ' + currentHour);

        // Determine the selected mirror based on the current hour and the number of domains in the list
        var numberOfMirrors = reachableMirrors.length;
        console.log('numberOfMirrors: ' + numberOfMirrors);
        var selectedMirrorIndex = Math.floor(currentHour / (24 / numberOfMirrors));
        console.log('selectedMirrorIndex: ' + selectedMirrorIndex);

        // Ensure the selectedMirrorIndex is within the array bounds
        selectedMirrorIndex = Math.min(selectedMirrorIndex, numberOfMirrors - 1);

        // Select the mirror
        var selectedMirror = reachableMirrors[selectedMirrorIndex];
        console.log('Selected mirror: ' + selectedMirror);

        // Add link to the mirror login button
        document.getElementById("mirror-login").href = selectedMirror;

        // Enable the mirror login button
        document.getElementById("mirror-login").removeAttribute("disabled");
        }

        // Hide the loading text
        document.getElementById("mirror-addresses-loading").style.display = "none";

    }, 10000);

    }

    // Check if m.cmx.im is accessible
    fetch('https://m.cmx.im/api/v1/instance', {mode: 'no-cors'}).then(r=>{
    console.log('mastodon reachable');
    document.getElementById("walled-ok").style.display = "inline-block";
    })
    .catch(e=>{

    console.log('mastodon unreachable');
    document.getElementById("walled-warning").style.display = "inline-block";
    document.getElementById("mirror-login").style.display = "inline-block";
    getRandomMirror();

    // Check if google is accessible
    fetch('	https://www.google.com/generate_204', {mode: 'no-cors'}).then(r=>{
        console.log('google reachable');
        document.getElementById("proxy-missing-filter-warning").style.display = "inline-block";
    })
    .catch(e=>{
        console.log('google unreachable');
    })

    // Clear browser cache for the fetched sites
    caches.keys().then(function(names) {
        for (let name of names)
            caches.delete(name);
    });

})