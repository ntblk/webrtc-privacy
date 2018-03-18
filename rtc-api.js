
function getLocalIPs(callback) {

    var ips = [];

    var pc = new RTCPeerConnection();

    // Candidate found!
    pc.onicecandidate = function(e) {
        if (!e.candidate) { // Candidate gathering completed.
            pc.close();
            callback(ips);
            return;
        }
        var ip = e.candidate.ip;
        // var ip = /^candidate:.+ (\S+) \d+ typ/.exec(e.candidate.candidate)[1];
        if (ips.indexOf(ip) == -1) // avoid duplicate entries (tcp/udp)
            ips.push(ip);
    };

    // Enable candidate gathering
    pc.createDataChannel('');

    pc.createOffer().then(function(offer) {
      return pc.setLocalDescription(offer);
    })
    .catch(function(reason) {
      console.log(reason);
    });
}
