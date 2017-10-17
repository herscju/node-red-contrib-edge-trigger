module.exports = function(RED) {
    function HysteresisNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.on('input', function(msg) {
            if (msg.hasOwnProperty('payload')) {
                var this_value = Number(msg.payload);
                if (! isNaN(this_value)) {
                    var last_value = Number(node.last_value);
                    var last_edge = node.last_edge;
                    if (! isNaN(last_value)) {
                        if (this_value > last_value &&
                            this_value > config.rising_threshold &&
                            last_value <= config.rising_threshold &&
                            last_edge != 'rising') {
                                msg.edge = 'rising';
                                node.send(msg);
                                node.last_edge = 'rising';
                        }
                        if (this_value < last_value &&
                            this_value < config.falling_threshold &&
                            last_value >= config.falling_threshold &&
                            last_edge != 'falling') {
                                msg.edge = 'falling';
                                node.send(msg);
                                node.last_edge = 'falling';
                        }
                    }
                    node.last_value = this_value;
                }
            }
        });
    }
    RED.nodes.registerType('hysteresis', HysteresisNode);
}
