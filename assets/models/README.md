# Creature Model Assets

Drop real 3D creature assets here as GLB files. The game auto-loads files by creature id:

- `lion.glb`
- `great-white.glb`
- `gorilla.glb`
- `crocodile.glb`
- `eagle.glb`
- `octopus.glb`
- `trex.glb`
- `mammoth.glb`
- `dragon.glb`
- `kraken.glb`
- `griffin.glb`
- `robot-crab.glb`

If a file is missing, the game keeps using the procedural fallback model.

Recommended asset rules:

- Prefer `.glb` over split `.gltf + .bin + textures`.
- Use low-poly or mobile-friendly models while prototyping.
- Keep license notes for every downloaded model.
- Models are automatically centered, scaled, shadow-enabled, and placed into the arena.

Included sample:

- `eagle.glb` currently uses the Three.js example `Parrot.glb` as a temporary bird-model proof of the asset pipeline. Replace it with a bald eagle model when we pick final assets.
- `lion.glb` currently uses the Three.js example `Horse.glb` as a temporary larger quadruped proof of the asset pipeline. Replace it with a lion model when we pick final assets.
- `dragon.glb` currently uses the Three.js example `DragonAttenuation.glb` as a temporary high-quality dragon model.
