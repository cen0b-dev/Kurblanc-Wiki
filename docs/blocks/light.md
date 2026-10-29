# Light

Kurblanc uses a 0–15 light scale. Two components matter:

- `kurblanc:light_emission` makes a block a light source.
- `kurblanc:opacity` is how much light the block absorbs.

They are independent. A solid wall can be transparent; a passable plant can block
light.

## Emitting

```json
{
  "kurblanc:light_emission": 8,
  "kurblanc:light_color": "#ffb45a"
}
```

`light_emission` is an integer from 1 to 15. The colour is `#rrggbb`; if you omit
it, `kurblanc:color` is used. A torch is a small object with emission 8; a crystal
wall might be 4.

Emission lights the block's own tile at that level and propagates outward. Light
falls with distance and with the opacity of the tiles it crosses.

## Blocking

```json
{
  "kurblanc:opacity": 15
}
```

`opacity` is an integer from 0 to 15. `0` is fully transparent; `15` stops light
dead. A tile's effective opacity is the highest of its layers, so a solid wall
above a floor controls how much light reaches the floor.

## Daylight

Sky light is separate from block light. During the day, surface tiles receive sky
light; the level falls with depth, time of day and the opacity of what is above.
Underground, only emitters keep a room lit.

## Reference

- [`kurblanc:light_emission`](/reference/components/blocks#kurblanc-light-emission)
- [`kurblanc:light_color`](/reference/components/blocks#kurblanc-light-color)
- [`kurblanc:opacity`](/reference/components/blocks#kurblanc-opacity)
