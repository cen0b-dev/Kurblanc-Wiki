# The sample pack

The game's publishing script exports the bundled logic and assets to
[Kurblanc-Samples](https://github.com/Bandit-Fox/Kurblanc-Samples). The source
layout is `packs/kurblonc/LP/` and `packs/kurblonc/AP/`.

Use the sample to see how the game makes existing blocks, recipes, creatures and
texture sheets. It is a copy of the game's built-in content, so it uses the
built-in IDs. For your first add-on, follow [Your first block](/guide/first-block)
instead of enabling a second copy of the whole game pack.

## Download or inspect it

Look for matching LP and AP archives in the sample repository's releases, or
browse the JSON files in `packs/kurblonc/`. Use files from the same release as the
game that you test. Older samples may use a different format.

The publishing script names its exports `kurblonc-LP-<version>.kbpack`,
`kurblonc-AP-<version>.kbpack` and `kurblonc-<version>.kbaddon`.

## Reuse an example

Copy only the files you need into your own add-on. Give your manifests new UUIDs,
choose your namespace and update the copied IDs and references. Keep references
to built-in content only when your pack deliberately depends on it.

If the sample and wiki disagree, check which game release the sample came from.
A reference table cannot make an older pack compatible with a newer loader.
