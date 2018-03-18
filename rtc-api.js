function getLocalIPs(callback) {

    console.log("In getLocalIPs")

    var ips = [];

    var pc = new RTCPeerConnection();

    console.log("before Promise")

    return new Promise((resolve, reject) => {

        // Candidate found!
        pc.onicecandidate = function(e) {

            if (!e.candidate) { // Candidate gathering completed.
                pc.close();
                resolve(ips);
                return;
            }

            var ip = /^candidate:.+ (\S+) \d+ typ/.exec(e.candidate.candidate)[1];
            console.log(e.candidate)
            if (ips.indexOf(ip) == -1) // avoid duplicate entries (tcp/udp)
                ips.push(ip);
        };

        console.log("before createDataChannel")


        // Enable candidate gathering

        pc.createDataChannel('');

        console.log("before createoffer")


        pc.createOffer()
            .then(offer => {
                return pc.setLocalDescription(offer);
            })
            .catch(reason => {
                console.log(reason);
                reject(reason)
            });
    });
}


/* https://github.com/muaz-khan/DetectRTC/blob/master/DetectRTC.js#L839:53 */
function detectRTC() {
    var isWebRTCSupported = false;
    ['RTCPeerConnection',
        'webkitRTCPeerConnection',
        'mozRTCPeerConnection',
        'RTCIceGatherer'
    ].forEach(function(item) {
        if (item in window) {
            isWebRTCSupported = true;
        }
    });

    // Make sure datachannel create works
    try {
        var pc = new RTCPeerConnection();
        pc.createDataChannel('');
        pc.close();
    } catch (err) {
        isWebRTCSupported = false;
    }
    return new Promise((resolve, reject) => {
        if (isWebRTCSupported) {
            resolve(isWebRTCSupported);
        } else {
            reject(isWebRTCSupported);
        }
    });
}