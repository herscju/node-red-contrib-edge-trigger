module.exports = function(RED) {
    function HysteresisNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.on('input', function(msg) {
            if (msg.hasOwnProperty('payload')) {
                var this_value = Number(msg.payload);
                if (! isNaN(this_value)) {
                    var last_value = Number(node.last_value);
                    if (! isNaN(last_value)) {
                        if (this_value > last_value &&
                            this_value > config.rising_threshold &&
                            last_value <= config.rising_threshold) {
                                msg.edge = 'rising';
                                node.send(msg);
                        }
                        if (this_value < last_value &&
                            this_value < config.falling_threshold &&
                            last_value >= config.falling_threshold) {
                                msg.edge = 'falling';
                                node.send(msg);
                        }
                    }
                    node.last_value = this_value;
                }
            }
        });
    }
    RED.nodes.registerType('hysteresis', HysteresisNode);
}
