# Block lighting

To make a block glow, add emission and a color to its `components` object:

```json
{
  "kurblanc:light_emission": 8,
  "kurblanc:light_color": "#ffb45a"
}
```

This makes a warm light source. Emission values run from 1 to 15. A higher value
reaches farther. Omit emission for an unlit block. If you omit `light_color`, the
light uses the block's `color`.

## Let light through a block

`kurblanc:opacity` controls light absorption on a scale from 0 to 15. For example,
a solid window can let light through:

```json
{
  "kurblanc:layer": "wall",
  "kurblanc:collision_box": true,
  "kurblanc:opacity": 0
}
```

Collision and opacity do different jobs. Collision stops movement. Opacity
reduces transmitted light. Set opacity to 15 for full blocking. A tile uses the
highest opacity among its layers.

Transparent pixels in a PNG do not set the gameplay opacity. Set the component
explicitly when a block should transmit light.

## Test the result

Place your light in a dark area. Compare it with the same block without
emission. Daylight can make a small light source hard to see. The worldgen pack
can also set ambient light in caves. Thus a cave is not always black without
emitters.

See [light emission](/reference/components/blocks#kurblanc-light-emission),
[light color](/reference/components/blocks#kurblanc-light-color) and
[opacity](/reference/components/blocks#kurblanc-opacity) for accepted values.
