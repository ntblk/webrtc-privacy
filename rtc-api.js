function getLocalIPs(callback) {

    var ips = [];

    var pc = new RTCPeerConnection();

    return new Promise((resolve, reject) => {

        // Candidate found!
        pc.onicecandidate = function(e) {
            if (!e.candidate) { // Candidate gathering completed.
                pc.close();
                resolve(ips);
                return;
            }
            var ip = e.candidate.ip;
            // var ip = /^candidate:.+ (\S+) \d+ typ/.exec(e.candidate.candidate)[1];
            if (ips.indexOf(ip) == -1) // avoid duplicate entries (tcp/udp)
                ips.push(ip);
        };

        // Enable candidate gathering
        pc.createDataChannel('');

        pc.createOffer()
            .then(offer => {
                return pc.setLocalDescription(offer);
            })
            .catch(reason => reject(reason));
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
            console.log(item);
            isWebRTCSupported = true;
        }
    });
    return new Promise((resolve, reject) => {
        if (isWebRTCSupported) {
            resolve(isWebRTCSupported);
        } else {
            reject(isWebRTCSupported);
        }
    });
}