A set of nodes that trigger on rising or falling edges.

# Installation
```
npm install node-red-contrib-edge-trigger
```

# Overview

The nodes in this package compare the numeric value of the incoming message
payload to the value of the previous message. If that value has crossed a
specified threshold in a specified direction, the message is forwarded.

# Nodes

## Falling edge

Given a threshold value, this node will forward its incoming message if the
numeric value of its payload has dropped below the threshold. Example
applications include turning on a heater when a temperature value drops.

## Rising edge

Given a threshold value, this node will forward its incoming message if the
numeric value of its payload has increased above the threshold. Example
applications include turning on a cooler when a temperature value rises.

## Hysteresis

This node combines the functions of the falling- and rising-edge nodes. It has
both rising and falling thresholds, and forwards the incoming message if its
value crosses either threshold in the appropriate direction. The outgoing
message has its `edge` property set to `rising` or `falling`.

This is useful in a situation where it would not be desirable to toggle an
output repeatedly on and off if a value hovers around a single threshold. For
example, a light that's activated by a luminosity sensor: it may be appropriate
to turn the light on when the sensor indicates 30 lux, but not to turn it off
again until the sensor indicates 40 lux.
