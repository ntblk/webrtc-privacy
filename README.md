# webrtc-privacy

> a study of WebRTC privacy measures and IP leaks in current browser implementations

## About

WebRTC can be used to [detect your private IP address without any consent](https://security.stackexchange.com/questions/94783/why-is-my-internal-ip-address-private-visible-from-the-internet). 

In some browsers, however, [private IP addresses are only exposed if camera and/or microphone access has been granted](https://bugs.webkit.org/show_bug.cgi?id=176157#c5), which gives the user agency over their privacy, [but might complicate some use cases of WebRTC](https://bugs.webkit.org/show_bug.cgi?id=174500).

Demo website is [here](https://ntblk.github.io/webrtc-privacy/). The website asks for permission to access microphone. On Safari, we see that if this permission is denied then the **page does not get** host IP addresses. However, on Firefox and Chrome, user permission does not matter - the page JavaScript can access your private IP address anyway.

All JavaScript is client-side - we do not send your IP address anywhere. The code is open source for your browsing pleasure.


## See also

 * https://tools.ietf.org/html/draft-ietf-rtcweb-ip-handling-06
 * https://tools.ietf.org/html/draft-ietf-rtcweb-security-arch-14

## License

_webrtc-privacy_ is an Open Source project made available by the [NetBlocks.org project](https://netblocks.org) and contributors under the terms of the MIT license.

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
