(function() {
    var signupEvent = "blinkwebinars.signup.success:",
        sendTrackingDataEvent = "blinkwebinars.signup.getTrackingData:";

    var eventMethod = window.addEventListener ? "addEventListener":"attachEvent",
        eventer = window[eventMethod],
        messageEvent = eventMethod == "attachEvent" ? "onmessage":"message";

    eventer(messageEvent, function(e) {
        var msg, se, te;

        try {
            msg = e.data;
        } catch(e) {
            return;
        }

        try {
            se = msg.indexOf(signupEvent) === 0;
        } catch(e) {
            se = false;
        }

        try {
            te = msg.indexOf(sendTrackingDataEvent) === 0;
        } catch(e) {
            te = false;
        }

        if (se) {
            signupSuccess(msg);

        } else if (te) {
            sendTrackingData();
        }
    }, false);

    function signupSuccess(msg) {
        window.location.replace(msg.replace(signupEvent, ""));
    }

    function sendTrackingData() {
        var iframe = document.getElementById("blinkwebinars-signup-widget").contentWindow,
            trackingDataMsg = "blinkwebinars.signup.trackingData:" + window.location.search;
        iframe.postMessage(trackingDataMsg, "*");
    }
})();
