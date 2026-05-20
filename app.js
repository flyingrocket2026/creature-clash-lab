import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';

const creatures = [
  {
    id: 'lion',
    name: 'Lion',
    icon: '🦁',
    type: 'Real animal',
    color: '#c58b2a',
    habitat: ['grassland', 'desert'],
    stats: { power: 8, defense: 5, speed: 7, smarts: 6, special: 5 },
    ability: 'Pride Pounce',
    fact: 'Lions are strong sprinters and social hunters, but they tire faster than long-distance runners.',
    weakness: 'Gets grumpy when a fight moves into deep water.',
  },
  {
    id: 'great-white',
    name: 'Great White Shark',
    icon: '🦈',
    type: 'Real animal',
    color: '#2f80b7',
    habitat: ['ocean'],
    stats: { power: 9, defense: 6, speed: 8, smarts: 5, special: 7 },
    ability: 'Super Sniff Splash',
    fact: 'Great white sharks can sense tiny electrical signals from other animals in the water.',
    weakness: 'Needs water to be at its best.',
  },
  {
    id: 'gorilla',
    name: 'Gorilla',
    icon: '🦍',
    type: 'Real animal',
    color: '#59656f',
    habitat: ['jungle'],
    stats: { power: 9, defense: 7, speed: 4, smarts: 8, special: 5 },
    ability: 'Thunder Clap',
    fact: 'Gorillas are powerful, intelligent apes that usually prefer calm family life over fighting.',
    weakness: 'Not built for chasing speedy opponents.',
  },
  {
    id: 'crocodile',
    name: 'Crocodile',
    icon: '🐊',
    type: 'Real animal',
    color: '#4c956c',
    habitat: ['ocean', 'jungle'],
    stats: { power: 9, defense: 8, speed: 4, smarts: 4, special: 8 },
    ability: 'Log Sneak',
    fact: 'Crocodiles have one of the strongest bite forces measured in living animals.',
    weakness: 'Slower on open land than in water.',
  },
  {
    id: 'eagle',
    name: 'Bald Eagle',
    icon: '🦅',
    type: 'Real animal',
    color: '#8f5f2f',
    habitat: ['sky', 'grassland'],
    stats: { power: 5, defense: 3, speed: 9, smarts: 6, special: 7 },
    ability: 'Dive Bomb',
    fact: 'Eagles have excellent eyesight and can spot prey from far away.',
    weakness: 'Lightweight body means it avoids wrestling matches.',
  },
  {
    id: 'octopus',
    name: 'Octopus',
    icon: '🐙',
    type: 'Real animal',
    color: '#b65d8a',
    habitat: ['ocean'],
    stats: { power: 4, defense: 6, speed: 5, smarts: 10, special: 10 },
    ability: 'Ink Cloud Trick',
    fact: 'Octopuses are problem-solvers that can squeeze through tiny spaces and use camouflage.',
    weakness: 'Very uncomfortable in dry arenas.',
  },
  {
    id: 'trex',
    name: 'T. rex',
    icon: '🦖',
    type: 'Extinct animal',
    color: '#6f9d44',
    habitat: ['grassland', 'jungle'],
    stats: { power: 10, defense: 8, speed: 5, smarts: 5, special: 6 },
    ability: 'Tiny Arms, Big Chomp',
    fact: 'T. rex had massive jaws and teeth, though scientists still debate exactly how fast it could run.',
    weakness: 'Turning quickly is not its finest talent.',
  },
  {
    id: 'mammoth',
    name: 'Woolly Mammoth',
    icon: '🦣',
    type: 'Extinct animal',
    color: '#9a6f45',
    habitat: ['ice', 'grassland'],
    stats: { power: 9, defense: 9, speed: 3, smarts: 6, special: 6 },
    ability: 'Tusk Snowplow',
    fact: 'Woolly mammoths were elephant relatives adapted for cold Ice Age environments.',
    weakness: 'Heat makes it lose focus.',
  },
  {
    id: 'dragon',
    name: 'Dragon',
    icon: '🐉',
    type: 'Fictional creature',
    color: '#c34d36',
    habitat: ['sky', 'desert', 'grassland'],
    stats: { power: 10, defense: 9, speed: 8, smarts: 8, special: 10 },
    ability: 'Marshmallow-Melting Fire Breath',
    fact: 'Dragons are fictional, so this lab rates them using storybook biology: flight, scales, and fire.',
    weakness: 'Underwater fire breath mostly makes embarrassing bubbles.',
  },
  {
    id: 'kraken',
    name: 'Kraken',
    icon: '🦑',
    type: 'Fictional creature',
    color: '#6b5ca5',
    habitat: ['ocean'],
    stats: { power: 10, defense: 8, speed: 5, smarts: 8, special: 10 },
    ability: 'Tentacle Tangle',
    fact: 'The kraken is a legendary sea monster probably inspired by giant squid stories.',
    weakness: 'Land battles are a paperwork disaster.',
  },
  {
    id: 'griffin',
    name: 'Griffin',
    icon: '🪽',
    type: 'Fictional creature',
    color: '#d08a2e',
    habitat: ['sky', 'grassland'],
    stats: { power: 8, defense: 6, speed: 9, smarts: 7, special: 8 },
    ability: 'Feather Cyclone',
    fact: 'Griffins mix eagle and lion traits, which makes them great for talking about adaptations.',
    weakness: 'Too proud to ask for directions.',
  },
  {
    id: 'robot-crab',
    name: 'Robot Crab',
    icon: '🤖',
    type: 'Fictional creature',
    color: '#4c6f8f',
    habitat: ['ocean', 'ice'],
    stats: { power: 7, defense: 10, speed: 3, smarts: 6, special: 9 },
    ability: 'Clank-Claw Shield',
    fact: 'Robot Crab is imaginary, but armor and leverage are real engineering ideas.',
    weakness: 'Battery warning light appears at the funniest possible time.',
  },
];

const arenas = [
  { id: 'grassland', name: 'Grassland', className: '', bonus: 'Room to run rewards speed and teamwork.' },
  { id: 'jungle', name: 'Jungle', className: '', bonus: 'Cover rewards ambush, climbing, and clever hiding.' },
  { id: 'ocean', name: 'Ocean', className: 'ocean', bonus: 'Water creatures get a huge home-field advantage.' },
  { id: 'sky', name: 'Sky Islands', className: 'sky', bonus: 'Flying creatures can control the fight from above.' },
  { id: 'desert', name: 'Desert Dunes', className: 'desert', bonus: 'Heat favors tough, dry-land creatures.' },
  { id: 'ice', name: 'Ice Floes', className: 'ice', bonus: 'Cold-weather bulk and balance matter here.' },
];

const battleDurationMs = 11200;
const replayBeatMs = 1650;

const selectors = {
  fighterA: document.querySelector('#fighterA'),
  fighterB: document.querySelector('#fighterB'),
  arena: document.querySelector('#arenaSelect'),
  cardA: document.querySelector('#cardA'),
  cardB: document.querySelector('#cardB'),
  canvas: document.querySelector('#arenaCanvas'),
  tokenA: document.querySelector('#tokenA'),
  tokenB: document.querySelector('#tokenB'),
  stage: document.querySelector('#stage'),
  roundBadge: document.querySelector('#roundBadge'),
  effectBurst: document.querySelector('#effectBurst'),
  guessA: document.querySelector('#guessA'),
  guessB: document.querySelector('#guessB'),
  battleButton: document.querySelector('#battleButton'),
  randomizeButton: document.querySelector('#randomizeButton'),
  winnerTitle: document.querySelector('#winnerTitle'),
  winnerReason: document.querySelector('#winnerReason'),
  replayList: document.querySelector('#replayList'),
  scoreStrip: document.querySelector('#scoreStrip'),
};

let currentGuess = null;
let isBattling = false;
let arena3d = null;

const modelLoader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();
const modelCache = new Map();
const spriteCache = new Map();
const spriteAssets = {
  dragon: { url: 'assets/sprites/dragon.png', nativeFacing: 1, width: 2.35, height: 1.75 },
  'great-white': { url: 'assets/sprites/great-white.png', nativeFacing: -1, width: 2.45, height: 1.35 },
  lion: { url: 'assets/sprites/lion.png', nativeFacing: -1, width: 2.25, height: 1.55 },
  gorilla: { url: 'assets/sprites/gorilla.png', nativeFacing: -1, width: 1.95, height: 1.8 },
  crocodile: { url: 'assets/sprites/crocodile.png', nativeFacing: -1, width: 2.65, height: 1.15 },
  eagle: { url: 'assets/sprites/eagle.png', nativeFacing: -1, width: 1.85, height: 1.55 },
  octopus: { url: 'assets/sprites/octopus.png', nativeFacing: -1, width: 2.05, height: 1.45 },
  trex: { url: 'assets/sprites/trex.png', nativeFacing: -1, width: 2.25, height: 1.85 },
  mammoth: { url: 'assets/sprites/mammoth.png', nativeFacing: -1, width: 2.45, height: 1.7 },
  kraken: { url: 'assets/sprites/kraken.png', nativeFacing: -1, width: 2.35, height: 1.65 },
  griffin: { url: 'assets/sprites/griffin.png', nativeFacing: -1, width: 2.15, height: 1.75 },
  'robot-crab': { url: 'assets/sprites/robot-crab.png', nativeFacing: -1, width: 2.25, height: 1.25 },
};
const modelAssets = Object.fromEntries(creatures.map((creature) => [creature.id, {
  url: 'assets/models/' + creature.id + '.glb',
  targetSize: creature.id === 'dragon' ? 3.3 : 3.0,
  playAnimation: true,
}]));

modelAssets.lion = { url: 'assets/models/lion.glb', targetSize: 2.8, playAnimation: false };
modelAssets.eagle = { url: 'assets/models/eagle.glb', targetSize: 2.2, playAnimation: true };

const arenaLooks = {
  grassland: { sky: 0xa7d9ff, fogNear: 7, fogFar: 18, ground: 0x4c956c, edge: 0x36744e, accent: 0xf2b84b, horizon: 0xdff4c6 },
  jungle: { sky: 0x9fd6b5, fogNear: 5.5, fogFar: 15, ground: 0x2f7d55, edge: 0x20563f, accent: 0xffd56b, horizon: 0x3a8f58 },
  ocean: { sky: 0xbfefff, fogNear: 7, fogFar: 19, ground: 0x2f80b7, edge: 0x1e5f8f, accent: 0xcaf7ff, horizon: 0x83d6ef },
  sky: { sky: 0x83c5ff, fogNear: 8, fogFar: 22, ground: 0xd8f1ff, edge: 0x8fd2f4, accent: 0xffffff, horizon: 0xd4f0ff },
  desert: { sky: 0xffe0a3, fogNear: 7, fogFar: 20, ground: 0xe6b85c, edge: 0xc98e3a, accent: 0xf7c46b, horizon: 0xffc779 },
  ice: { sky: 0xe4fbff, fogNear: 7, fogFar: 18, ground: 0xb9e6f0, edge: 0x6ebbd1, accent: 0xffffff, horizon: 0xeeffff },
};

function option(label, value) {
  const element = document.createElement('option');
  element.value = value;
  element.textContent = label;
  return element;
}

function init() {
  initArena3d();

  creatures.forEach((creature) => {
    selectors.fighterA.append(option(creature.name, creature.id));
    selectors.fighterB.append(option(creature.name, creature.id));
  });

  arenas.forEach((arena) => selectors.arena.append(option(arena.name, arena.id)));

  selectors.fighterA.value = 'dragon';
  selectors.fighterB.value = 'great-white';
  selectors.arena.value = 'ocean';
  applyUrlSetup();

  selectors.fighterA.addEventListener('change', () => resetRound());
  selectors.fighterB.addEventListener('change', () => resetRound());
  selectors.arena.addEventListener('change', () => resetRound());
  selectors.battleButton.addEventListener('click', battle);
  selectors.randomizeButton.addEventListener('click', randomize);

  document.querySelectorAll('.guess-button').forEach((button) => {
    button.addEventListener('click', () => {
      if (isBattling) return;
      currentGuess = button.dataset.guess;
      document.querySelectorAll('.guess-button').forEach((item) => item.classList.remove('selected'));
      button.classList.add('selected');
      selectors.battleButton.disabled = false;
      selectors.battleButton.textContent = 'Start the battle!';
      selectors.roundBadge.textContent = `Prediction locked: ${button.textContent}`;
    });
  });

  render();
}

function applyUrlSetup() {
  const params = new URLSearchParams(window.location.search);
  const a = params.get('a');
  const b = params.get('b');
  const arena = params.get('arena');

  if (creatures.some((creature) => creature.id === a)) selectors.fighterA.value = a;
  if (creatures.some((creature) => creature.id === b)) selectors.fighterB.value = b;
  if (arenas.some((item) => item.id === arena)) selectors.arena.value = arena;
}

function getCreature(id) {
  return creatures.find((creature) => creature.id === id);
}

function getArena() {
  return arenas.find((arena) => arena.id === selectors.arena.value);
}

function render() {
  const a = getCreature(selectors.fighterA.value);
  const b = getCreature(selectors.fighterB.value);
  const arena = getArena();

  selectors.cardA.innerHTML = creatureCard(a);
  selectors.cardB.innerHTML = creatureCard(b);
  selectors.tokenA.innerHTML = creatureImage(a, 'arena-token-image');
  selectors.tokenB.innerHTML = creatureImage(b, 'arena-token-image');
  selectors.tokenA.style.color = a.color;
  selectors.tokenB.style.color = b.color;
  selectors.stage.className = stageClass(arena);
  selectors.guessA.textContent = a.name;
  selectors.guessB.textContent = b.name;
  selectors.roundBadge.textContent = currentGuess ? `Prediction locked: ${currentGuess === 'a' ? a.name : b.name}` : 'Pick your winner';
  selectors.effectBurst.textContent = 'POOF!';
  setArena3d(arena);
  setArenaCreatures(a, b);
  selectors.battleButton.disabled = !currentGuess || isBattling;
  selectors.battleButton.textContent = currentGuess ? 'Start the battle!' : 'Lock your guess first';
}

function stageClass(arena, extra = '') {
  return `stage ${arena3d ? 'stage-3d' : ''} ${arena.className} ${extra}`.trim();
}

function initArena3d() {
  if (!selectors.canvas || arena3d) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: selectors.canvas,
      alpha: true,
      antialias: true,
    });
  } catch {
    selectors.canvas.hidden = true;
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xa7d9ff, 7, 18);

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 4.6, 8.4);
  camera.lookAt(0, 0.6, 0);

  const ambient = new THREE.HemisphereLight(0xffffff, 0x45604b, 1.7);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight(0xffffff, 2.3);
  sun.position.set(2.6, 6.5, 4.5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  scene.add(sun);

  const rim = new THREE.DirectionalLight(0xd7f8ff, 1.2);
  rim.position.set(-4, 4.5, -3.5);
  scene.add(rim);

  const ground = new THREE.Mesh(
    new THREE.CylinderGeometry(4.8, 5.8, 0.42, 64),
    new THREE.MeshStandardMaterial({ color: 0x4c956c, roughness: 0.78, metalness: 0.02 })
  );
  ground.position.y = -0.22;
  ground.receiveShadow = true;
  scene.add(ground);

  const groundEdge = new THREE.Mesh(
    new THREE.TorusGeometry(5.02, 0.13, 10, 96),
    new THREE.MeshStandardMaterial({ color: 0x36744e, roughness: 0.72, metalness: 0.01 })
  );
  groundEdge.rotation.x = Math.PI / 2;
  groundEdge.position.y = 0.0;
  groundEdge.receiveShadow = true;
  scene.add(groundEdge);

  const horizon = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 7),
    new THREE.MeshBasicMaterial({ color: 0xdff4c6, transparent: true, opacity: 0.42, depthWrite: false })
  );
  horizon.position.set(0, 2.1, -5.8);
  scene.add(horizon);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(3.65, 0.045, 12, 96),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.32 })
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.04;
  scene.add(ring);

  const versus = makeBillboard('VS', '#ffffff', '#ef6f6c', 256, 256);
  versus.position.set(0, 1.55, 0.05);
  versus.scale.set(1.0, 1.0, 1.0);
  scene.add(versus);

  const impactRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.62, 0.045, 10, 48),
    new THREE.MeshStandardMaterial({ color: 0xfff2cb, emissive: 0xef6f6c, emissiveIntensity: 0.9 })
  );
  impactRing.rotation.x = Math.PI / 2;
  impactRing.position.set(0, 0.78, 0);
  impactRing.visible = false;
  scene.add(impactRing);

  const attackBeam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.11, 2.2, 14),
    new THREE.MeshStandardMaterial({ color: 0xffd56b, emissive: 0xef6f6c, emissiveIntensity: 0.85 })
  );
  attackBeam.rotation.z = Math.PI / 2;
  attackBeam.position.set(0, 0.9, 0.08);
  attackBeam.visible = false;
  scene.add(attackBeam);

  const hitText = makeBillboard('POW', '#17202a', '#fff2cb', 256, 160);
  hitText.position.set(0, 1.45, 0.4);
  hitText.scale.set(1.1, 0.72, 1);
  hitText.visible = false;
  scene.add(hitText);

  const fighterA = makeFighterGroup();
  const fighterB = makeFighterGroup();
  fighterA.group.position.set(-2.25, 0.45, 0);
  fighterB.group.position.set(2.25, 0.45, 0);
  scene.add(fighterA.group, fighterB.group);

  const scenery = createArenaScenery();
  scene.add(scenery.root);

  arena3d = {
    renderer,
    scene,
    camera,
    ambient,
    sun,
    rim,
    ground,
    groundEdge,
    horizon,
    ring,
    versus,
    fighterA,
    fighterB,
    scenery,
    currentArenaId: 'grassland',
    impactRing,
    attackBeam,
    hitText,
    start: performance.now(),
    lastFrame: performance.now(),
    battling: false,
    fight: null,
    winnerSide: null,
  };

  window.addEventListener('resize', resizeArena3d);
  resizeArena3d();
  animateArena3d();
}

function createArenaScenery() {
  const root = new THREE.Group();
  const groups = {};
  const animated = [];

  const makeGroup = (id) => {
    const group = new THREE.Group();
    group.name = id;
    groups[id] = group;
    root.add(group);
    return group;
  };

  buildGrasslandScenery(makeGroup('grassland'), animated);
  buildJungleScenery(makeGroup('jungle'), animated);
  buildOceanScenery(makeGroup('ocean'), animated);
  buildSkyScenery(makeGroup('sky'), animated);
  buildDesertScenery(makeGroup('desert'), animated);
  buildIceScenery(makeGroup('ice'), animated);

  return { root, groups, animated };
}

function arenaMaterial(color, options = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: options.roughness ?? 0.78,
    metalness: options.metalness ?? 0.02,
    transparent: options.opacity !== undefined,
    opacity: options.opacity ?? 1,
    emissive: options.emissive ?? 0x000000,
    emissiveIntensity: options.emissiveIntensity ?? 0,
  });
}

function addArenaMesh(group, geometry, material, position, scale = [1, 1, 1], rotation = [0, 0, 0], animated) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.scale.set(...scale);
  mesh.rotation.set(...rotation);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);
  if (animated) animated.push(mesh);
  return mesh;
}

function radialPosition(angle, radius, y = 0.08) {
  return [Math.cos(angle) * radius, y, Math.sin(angle) * radius];
}

function addGrassTuft(group, angle, radius, height, color) {
  const tuft = new THREE.Group();
  tuft.position.set(...radialPosition(angle, radius, 0.07));
  tuft.rotation.y = -angle;
  const material = arenaMaterial(color);
  [-0.18, 0, 0.18].forEach((offset, index) => {
    addArenaMesh(
      tuft,
      new THREE.ConeGeometry(0.045, height * (index === 1 ? 1.12 : 0.9), 5),
      material,
      [offset, height * 0.32, 0],
      [0.7, 1, 0.7],
      [0, 0, offset * -1.7]
    );
  });
  group.add(tuft);
  return tuft;
}

function addRock(group, angle, radius, color, scale = 1) {
  const rock = addArenaMesh(
    group,
    new THREE.DodecahedronGeometry(0.22, 0),
    arenaMaterial(color, { roughness: 0.9 }),
    radialPosition(angle, radius, 0.16),
    [scale * 1.35, scale * 0.7, scale],
    [0.15, angle, -0.06]
  );
  return rock;
}

function addTree(group, angle, radius, height, leafColor, trunkColor = 0x6b4a2d) {
  const tree = new THREE.Group();
  tree.position.set(...radialPosition(angle, radius, 0));
  tree.rotation.y = -angle;
  addArenaMesh(tree, new THREE.CylinderGeometry(0.09, 0.14, height, 7), arenaMaterial(trunkColor), [0, height / 2, 0]);
  addArenaMesh(tree, new THREE.SphereGeometry(0.44, 12, 8), arenaMaterial(leafColor), [0, height + 0.16, 0], [1.05, 0.85, 1.05]);
  addArenaMesh(tree, new THREE.SphereGeometry(0.32, 10, 8), arenaMaterial(leafColor), [-0.25, height - 0.04, 0.06], [1, 0.82, 1]);
  addArenaMesh(tree, new THREE.SphereGeometry(0.34, 10, 8), arenaMaterial(leafColor), [0.28, height - 0.08, -0.04], [1, 0.82, 1]);
  group.add(tree);
  return tree;
}

function addCloud(group, position, scale, animated) {
  const cloud = new THREE.Group();
  cloud.position.set(...position);
  cloud.scale.set(...scale);
  const material = arenaMaterial(0xffffff, { roughness: 0.56, opacity: 0.9 });
  [
    [-0.38, 0, 0, 0.38],
    [0, 0.1, 0, 0.5],
    [0.42, 0, 0.02, 0.36],
    [0.12, -0.08, 0.16, 0.34],
  ].forEach(([x, y, z, radius]) => {
    addArenaMesh(cloud, new THREE.SphereGeometry(radius, 14, 8), material, [x, y, z], [1.35, 0.62, 0.85]);
  });
  cloud.userData = { kind: 'cloud', baseY: position[1], speed: 0.35 + Math.random() * 0.28 };
  group.add(cloud);
  animated.push(cloud);
  return cloud;
}

function buildGrasslandScenery(group, animated) {
  const hillMaterial = arenaMaterial(0x7fbd64, { roughness: 0.86 });
  const patchMaterial = arenaMaterial(0x75b760, { roughness: 0.9 });
  [
    [-2.05, 0.09, -1.5, 1.6, 0.06, 0.46, -0.18],
    [2.0, 0.09, 1.35, 1.45, 0.06, 0.42, 0.22],
    [0.0, 0.1, -2.35, 2.25, 0.055, 0.34, 0.08],
  ].forEach(([x, y, z, sx, sy, sz, rot]) => {
    addArenaMesh(group, new THREE.CylinderGeometry(0.55, 0.68, 0.035, 24), patchMaterial, [x, y, z], [sx, sy, sz], [0, rot, 0]);
  });
  [-2.9, -1.1, 1.3, 3.1].forEach((x, index) => {
    addArenaMesh(group, new THREE.SphereGeometry(1, 24, 10), hillMaterial, [x, -0.18, -3.55 - index * 0.08], [1.8, 0.42, 0.7], [0, 0.2 * index, 0]);
  });
  for (let index = 0; index < 20; index += 1) {
    const angle = (index / 20) * Math.PI * 2 + 0.08;
    const radius = 3.55 + (index % 4) * 0.24;
    addGrassTuft(group, angle, radius, 0.46 + (index % 3) * 0.08, index % 2 ? 0x69ad54 : 0x8ac765);
  }
  [0.35, 1.25, 2.5, 3.8, 4.75, 5.55].forEach((angle, index) => {
    addRock(group, angle, 4.0 + (index % 2) * 0.32, index % 2 ? 0x768574 : 0x9aa17e, 0.72 + index * 0.04);
  });
  addCloud(group, [-3.1, 2.2, -4.2], [1.1, 0.8, 0.8], animated);
  addCloud(group, [3.0, 2.0, -4.6], [0.82, 0.62, 0.62], animated);
}

function buildJungleScenery(group, animated) {
  const leafMaterial = arenaMaterial(0x2f9a55, { roughness: 0.84, opacity: 0.88 });
  [
    [-2.35, 0.12, -1.25, 1.15, 0.05, 0.34, -0.75],
    [2.25, 0.12, -1.05, 1.25, 0.05, 0.36, 0.7],
    [-1.55, 0.12, 1.45, 0.95, 0.05, 0.3, 0.38],
    [1.55, 0.12, 1.45, 0.95, 0.05, 0.3, -0.38],
  ].forEach(([x, y, z, sx, sy, sz, rot]) => {
    addArenaMesh(group, new THREE.CylinderGeometry(0.5, 0.16, 0.035, 18), leafMaterial, [x, y, z], [sx, sy, sz], [0, rot, Math.PI / 2]);
  });
  for (let index = 0; index < 13; index += 1) {
    const angle = (index / 13) * Math.PI * 2 + 0.12;
    const radius = 3.85 + (index % 3) * 0.22;
    const tree = addTree(group, angle, radius, 1.0 + (index % 4) * 0.18, index % 2 ? 0x1f6e45 : 0x2f8f55, 0x654125);
    tree.scale.setScalar(index % 3 === 0 ? 1.14 : 0.92);
  }
  for (let index = 0; index < 9; index += 1) {
    const angle = (index / 9) * Math.PI * 2 + 0.28;
    const vine = addArenaMesh(
      group,
      new THREE.CylinderGeometry(0.025, 0.025, 0.95, 6),
      arenaMaterial(0x244f25),
      radialPosition(angle, 3.55, 1.0),
      [1, 1, 1],
      [0.28, 0, 0.38 * (index % 2 ? 1 : -1)],
      animated
    );
    vine.userData = { kind: 'vine', baseRotationZ: vine.rotation.z, speed: 0.8 + index * 0.05 };
  }
  for (let index = 0; index < 12; index += 1) {
    addGrassTuft(group, (index / 12) * Math.PI * 2 + 0.18, 3.35 + (index % 2) * 0.28, 0.55, 0x175f3d);
  }
}

function buildOceanScenery(group, animated) {
  const water = addArenaMesh(
    group,
    new THREE.CylinderGeometry(4.72, 4.98, 0.08, 80),
    arenaMaterial(0x35a7db, { roughness: 0.36, metalness: 0.02, opacity: 0.74 }),
    [0, 0.05, 0]
  );
  water.userData = { kind: 'water', baseY: water.position.y };
  animated.push(water);

  [
    [-2.0, 0.135, -1.15, 1.6, 0.14, 0.44, 0.12],
    [2.0, 0.135, -1.0, 1.55, 0.14, 0.42, -0.08],
    [0.0, 0.14, 1.65, 2.15, 0.14, 0.52, 0.02],
  ].forEach(([x, y, z, sx, sy, sz, rot], index) => {
    const shine = addArenaMesh(
      group,
      new THREE.TorusGeometry(0.58, 0.028, 7, 44),
      arenaMaterial(index % 2 ? 0xdffbff : 0x9af0ff, { roughness: 0.24, opacity: 0.82 }),
      [x, y, z],
      [sx, sy, sz],
      [Math.PI / 2, 0, rot],
      animated
    );
    shine.userData = { kind: 'wave', baseY: y, speed: 0.75 + index * 0.1, phase: index * 1.3 };
  });

  for (let index = 0; index < 11; index += 1) {
    const angle = (index / 11) * Math.PI * 2 + 0.16;
    const wave = addArenaMesh(
      group,
      new THREE.TorusGeometry(0.36 + (index % 3) * 0.06, 0.018, 6, 32),
      arenaMaterial(index % 2 ? 0xdffbff : 0x8cecff, { roughness: 0.28, opacity: 0.84 }),
      radialPosition(angle, 3.15 + (index % 4) * 0.32, 0.12),
      [1.35, 0.13, 0.38],
      [Math.PI / 2, 0, -angle],
      animated
    );
    wave.userData = { kind: 'wave', baseY: wave.position.y, speed: 0.85 + index * 0.08, phase: index };
  }

  for (let index = 0; index < 14; index += 1) {
    const bubble = addArenaMesh(
      group,
      new THREE.SphereGeometry(0.035 + (index % 3) * 0.012, 8, 6),
      arenaMaterial(0xe8fdff, { roughness: 0.2, opacity: 0.72 }),
      radialPosition((index / 14) * Math.PI * 2, 3.75 + (index % 3) * 0.2, 0.22 + (index % 4) * 0.05),
      [1, 1, 1],
      [0, 0, 0],
      animated
    );
    bubble.userData = { kind: 'bubble', baseY: bubble.position.y, speed: 1.1 + index * 0.05, phase: index * 0.7 };
  }
}

function buildSkyScenery(group, animated) {
  const glow = arenaMaterial(0xf7fdff, { roughness: 0.42, opacity: 0.9 });
  [
    [-2.15, 0.12, -1.15, 1.4, 0.1, 0.45, 0.2],
    [2.1, 0.12, -1.05, 1.35, 0.1, 0.42, -0.18],
    [0.0, 0.12, 1.55, 2.0, 0.1, 0.48, 0.04],
  ].forEach(([x, y, z, sx, sy, sz, rot]) => {
    addArenaMesh(group, new THREE.CylinderGeometry(0.62, 0.78, 0.08, 20), glow, [x, y, z], [sx, sy, sz], [0, rot, 0]);
  });
  for (let index = 0; index < 6; index += 1) {
    const angle = (index / 6) * Math.PI * 2 + 0.25;
    addArenaMesh(
      group,
      new THREE.CylinderGeometry(0.55, 0.76, 0.12, 18),
      arenaMaterial(0xf8ffff, { roughness: 0.55, opacity: 0.92 }),
      radialPosition(angle, 3.45 + (index % 2) * 0.42, 0.07),
      [1.55, 1, 0.62],
      [0, -angle, 0]
    );
  }
  addCloud(group, [-2.8, 1.05, -3.0], [1.4, 0.82, 0.8], animated);
  addCloud(group, [2.4, 1.25, -3.5], [1.1, 0.72, 0.72], animated);
  addCloud(group, [0.5, 2.25, -4.8], [1.55, 0.9, 0.8], animated);
  addCloud(group, [-3.4, 2.55, -4.7], [0.9, 0.6, 0.6], animated);
}

function addCactus(group, angle, radius, height) {
  const cactus = new THREE.Group();
  cactus.position.set(...radialPosition(angle, radius, 0.04));
  cactus.rotation.y = -angle;
  const material = arenaMaterial(0x3d8b52, { roughness: 0.82 });
  addArenaMesh(cactus, new THREE.CylinderGeometry(0.1, 0.13, height, 9), material, [0, height / 2, 0]);
  addArenaMesh(cactus, new THREE.CylinderGeometry(0.045, 0.055, height * 0.42, 8), material, [-0.16, height * 0.66, 0], [1, 1, 1], [0, 0, -0.65]);
  addArenaMesh(cactus, new THREE.CylinderGeometry(0.045, 0.055, height * 0.36, 8), material, [0.17, height * 0.5, 0], [1, 1, 1], [0, 0, 0.72]);
  group.add(cactus);
}

function buildDesertScenery(group) {
  const duneMaterial = arenaMaterial(0xf1c773, { roughness: 0.92 });
  [
    [-2.0, 0.1, -1.25, 1.7, 0.08, 0.42, 0.05],
    [1.95, 0.1, -1.05, 1.55, 0.08, 0.4, -0.02],
    [0.0, 0.1, 1.55, 2.2, 0.08, 0.5, 0.08],
  ].forEach(([x, y, z, sx, sy, sz, rot]) => {
    addArenaMesh(group, new THREE.CylinderGeometry(0.58, 0.88, 0.04, 28), duneMaterial, [x, y, z], [sx, sy, sz], [0, rot, 0]);
  });
  [-3.4, -1.5, 0.6, 2.6].forEach((x, index) => {
    addArenaMesh(group, new THREE.SphereGeometry(1, 24, 8), duneMaterial, [x, -0.09, -3.75], [2.0, 0.28, 0.62], [0, index * 0.24, 0]);
  });
  [0.42, 1.35, 2.55, 3.72, 4.55].forEach((angle, index) => {
    addCactus(group, angle, 3.75 + (index % 2) * 0.34, 0.72 + (index % 3) * 0.18);
  });
  for (let index = 0; index < 10; index += 1) {
    const stripe = addArenaMesh(
      group,
      new THREE.TorusGeometry(0.42, 0.014, 5, 32),
      arenaMaterial(0xffdda0, { roughness: 0.88, opacity: 0.78 }),
      radialPosition((index / 10) * Math.PI * 2 + 0.1, 2.9 + (index % 3) * 0.36, 0.08),
      [1.8, 0.08, 0.46],
      [Math.PI / 2, 0, index * 0.35]
    );
    stripe.castShadow = false;
  }
  [0.2, 1.9, 3.2, 5.1].forEach((angle, index) => addRock(group, angle, 4.15, index % 2 ? 0xa36f3a : 0x8c6338, 0.8));
}

function buildIceScenery(group, animated) {
  const glassMaterial = arenaMaterial(0xc8f3ff, { roughness: 0.24, metalness: 0.02, opacity: 0.92 });
  [
    [-2.05, 0.12, -1.25, 1.45, 0.08, 0.52, 0.24],
    [2.05, 0.12, -1.05, 1.4, 0.08, 0.5, -0.18],
    [0.0, 0.12, 1.55, 2.0, 0.08, 0.56, 0.06],
  ].forEach(([x, y, z, sx, sy, sz, rot], index) => {
    const sheet = addArenaMesh(group, new THREE.CylinderGeometry(0.64, 0.82, 0.055, 7), glassMaterial, [x, y, z], [sx, sy, sz], [0, rot + index * 0.2, 0], animated);
    sheet.userData = { kind: 'floe', baseY: y, speed: 0.38 + index * 0.05, phase: index * 0.9 };
  });
  for (let index = 0; index < 8; index += 1) {
    const angle = (index / 8) * Math.PI * 2 + 0.2;
    const floe = addArenaMesh(
      group,
      new THREE.CylinderGeometry(0.48, 0.55, 0.09, 7),
      arenaMaterial(index % 2 ? 0xf8ffff : 0xbcebf4, { roughness: 0.38, opacity: 0.9 }),
      radialPosition(angle, 3.45 + (index % 2) * 0.42, 0.08),
      [1.45, 1, 0.7],
      [0, angle * 0.3, 0],
      animated
    );
    floe.userData = { kind: 'floe', baseY: floe.position.y, speed: 0.42 + index * 0.04, phase: index };
  }

  for (let index = 0; index < 9; index += 1) {
    const angle = (index / 9) * Math.PI * 2 + 0.1;
    const crystal = addArenaMesh(
      group,
      new THREE.ConeGeometry(0.12 + (index % 3) * 0.035, 0.62 + (index % 4) * 0.12, 6),
      arenaMaterial(index % 2 ? 0xd3f8ff : 0x55c4df, { roughness: 0.16, metalness: 0.03 }),
      radialPosition(angle, 4.05, 0.34),
      [1, 1, 1],
      [0.08, angle, 0.08 * (index % 2 ? 1 : -1)]
    );
    crystal.castShadow = true;
  }

  for (let index = 0; index < 16; index += 1) {
    const snow = addArenaMesh(
      group,
      new THREE.SphereGeometry(0.035, 8, 6),
      arenaMaterial(0xffffff, { roughness: 0.7, opacity: 0.82 }),
      radialPosition((index / 16) * Math.PI * 2 + 0.06, 3.1 + (index % 4) * 0.28, 0.15 + (index % 5) * 0.07),
      [1.35, 0.42, 1.35],
      [0, 0, 0],
      animated
    );
    snow.userData = { kind: 'snow', baseY: snow.position.y, speed: 0.7 + index * 0.04, phase: index * 0.4 };
  }
}

function makeFighterGroup() {
  const group = new THREE.Group();
  const model = new THREE.Group();
  group.add(model);

  const name = makeBillboard('', '#17202a', 'rgba(255,250,240,0.92)', 512, 128);
  name.position.set(0, -0.06, 1.05);
  name.scale.set(1.85, 0.44, 1);
  group.add(name);

  return { group, model, name, creatureId: null, mixer: null };
}

function makeBillboard(text, textColor, background, width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
  const sprite = new THREE.Sprite(material);
  sprite.renderOrder = 10;
  sprite.userData = { canvas, texture, textColor, background };
  updateBillboard(sprite, text);
  return sprite;
}

function updateBillboard(sprite, text) {
  const { canvas, texture, textColor, background } = sprite.userData;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (background && background !== 'rgba(255,255,255,0)') {
    const radius = Math.min(canvas.width, canvas.height) * 0.22;
    ctx.fillStyle = background;
    roundRect(ctx, 12, 12, canvas.width - 24, canvas.height - 24, radius);
    ctx.fill();
  }

  const isEmoji = canvas.width === canvas.height;
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = isEmoji
    ? `950 ${Math.floor(canvas.width * (text.length > 1 ? 0.34 : 0.5))}px ui-rounded, "Avenir Next", system-ui, sans-serif`
    : `800 ${Math.floor(canvas.height * 0.42)}px ui-rounded, system-ui, sans-serif`;
  ctx.fillText(text, canvas.width / 2, canvas.height / 2 + (isEmoji ? 6 : 0), canvas.width - 34);
  texture.needsUpdate = true;
}

function makeCreatureModel(creature, side) {
  const model = new THREE.Group();
  const color = new THREE.Color(creature.color);
  const dark = color.clone().multiplyScalar(0.62);
  const light = color.clone().lerp(new THREE.Color(0xffffff), 0.38);
  const accent = new THREE.Color(0xfff2cb);
  const metal = creature.id === 'robot-crab' ? 0.55 : 0.03;

  const material = (shade = color, roughness = 0.52) => new THREE.MeshStandardMaterial({
    color: shade,
    roughness,
    metalness: metal,
  });

  const add = (mesh, position, scale = [1, 1, 1], rotation = [0, 0, 0]) => {
    mesh.position.set(...position);
    mesh.scale.set(...scale);
    mesh.rotation.set(...rotation);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    model.add(mesh);
    return mesh;
  };

  const sphere = (position, scale, shade = color) => add(
    new THREE.Mesh(new THREE.SphereGeometry(0.5, 28, 18), material(shade)),
    position,
    scale
  );
  const cone = (position, scale, shade = color, rotation = [0, 0, 0], radial = 18) => add(
    new THREE.Mesh(new THREE.ConeGeometry(0.5, 1, radial), material(shade)),
    position,
    scale,
    rotation
  );
  const cylinder = (position, scale, shade = color, rotation = [0, 0, 0], radial = 18) => add(
    new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1, radial), material(shade)),
    position,
    scale,
    rotation
  );
  const box = (position, scale, shade = color, rotation = [0, 0, 0]) => add(
    new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material(shade)),
    position,
    scale,
    rotation
  );

  const animal = creature.id;
  const facing = side < 0 ? 1 : -1;
  model.rotation.y = side < 0 ? 0.18 : -0.18;

  if (['great-white', 'crocodile', 'kraken', 'octopus', 'robot-crab'].includes(animal)) {
    model.position.y = 0.04;
  }

  if (animal === 'great-white') {
    sphere([0, 0.82, 0], [1.28, 0.38, 0.42], color);
    cone([facing * 0.78, 0.82, 0], [0.5, 0.9, 0.5], color, [0, 0, -facing * Math.PI / 2]);
    cone([-facing * 0.9, 0.82, 0], [0.42, 0.72, 0.18], dark, [0, 0, facing * Math.PI / 2]);
    cone([0, 1.18, -0.02], [0.24, 0.6, 0.18], light, [0, 0, Math.PI]);
    sphere([facing * 0.38, 0.66, 0], [0.64, 0.1, 0.32], accent);
  } else if (animal === 'crocodile') {
    sphere([0, 0.55, 0], [1.25, 0.28, 0.34], color);
    box([facing * 0.85, 0.58, 0], [0.8, 0.22, 0.34], color);
    cone([-facing * 1.08, 0.56, 0], [0.28, 0.7, 0.22], dark, [0, 0, facing * Math.PI / 2]);
    [-0.55, -0.15, 0.25, 0.62].forEach((x) => cone([x, 0.91, 0], [0.08, 0.16, 0.08], dark));
    [-0.5, 0.5].forEach((x) => {
      cylinder([x, 0.33, 0.28], [0.08, 0.42, 0.08], dark, [Math.PI / 2, 0, 0]);
      cylinder([x, 0.33, -0.28], [0.08, 0.42, 0.08], dark, [Math.PI / 2, 0, 0]);
    });
  } else if (animal === 'eagle' || animal === 'griffin') {
    sphere([0, 0.9, 0], [0.48, 0.58, 0.42], color);
    sphere([facing * 0.42, 1.35, 0], [0.32, 0.32, 0.3], animal === 'eagle' ? light : color);
    cone([facing * 0.74, 1.35, 0], [0.16, 0.34, 0.16], accent, [0, 0, -facing * Math.PI / 2]);
    cone([-0.42, 0.98, 0.04], [0.32, 1.25, 0.12], dark, [0.24, 0.2, -0.88]);
    cone([0.42, 0.98, 0.04], [0.32, 1.25, 0.12], dark, [0.24, -0.2, 0.88]);
    if (animal === 'griffin') {
      sphere([-facing * 0.42, 0.72, 0], [0.62, 0.36, 0.34], light);
      cone([-facing * 0.92, 0.92, 0], [0.16, 0.46, 0.16], dark, [0, 0, facing * Math.PI / 2]);
    }
  } else if (animal === 'octopus' || animal === 'kraken') {
    sphere([0, 1.02, 0], animal === 'kraken' ? [0.78, 0.78, 0.7] : [0.58, 0.62, 0.56], color);
    const count = animal === 'kraken' ? 8 : 6;
    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * 0.45;
      const z = Math.sin(angle) * 0.35;
      cylinder([x, 0.42, z], [0.07, 0.72, 0.07], dark, [0.75, 0, -angle]);
      sphere([x * 1.55, 0.28, z * 1.55], [0.09, 0.09, 0.09], light);
    }
  } else if (animal === 'mammoth') {
    sphere([0, 0.82, 0], [0.92, 0.6, 0.5], color);
    sphere([facing * 0.72, 1.0, 0], [0.48, 0.46, 0.42], color);
    cylinder([facing * 1.0, 0.72, 0], [0.13, 0.62, 0.13], dark, [0, 0, -facing * 0.18]);
    cone([facing * 1.15, 0.84, 0.28], [0.07, 0.72, 0.07], accent, [0.8, 0, -facing * 0.5]);
    cone([facing * 1.15, 0.84, -0.28], [0.07, 0.72, 0.07], accent, [-0.8, 0, -facing * 0.5]);
    [-0.55, -0.15, 0.28, 0.62].forEach((x) => cylinder([x, 0.28, 0], [0.13, 0.48, 0.13], dark));
  } else if (animal === 'dragon') {
    sphere([0, 0.86, 0], [0.8, 0.5, 0.42], color);
    sphere([facing * 0.76, 1.08, 0], [0.42, 0.34, 0.32], color);
    cone([facing * 1.1, 1.08, 0], [0.18, 0.4, 0.18], dark, [0, 0, -facing * Math.PI / 2]);
    cone([facing * 0.72, 1.42, 0.2], [0.08, 0.3, 0.08], accent, [0.4, 0, 0]);
    cone([facing * 0.72, 1.42, -0.2], [0.08, 0.3, 0.08], accent, [-0.4, 0, 0]);
    cone([-facing * 0.9, 0.82, 0], [0.22, 0.82, 0.22], dark, [0, 0, facing * Math.PI / 2]);
    cone([-0.36, 1.02, 0.12], [0.34, 1.22, 0.08], dark, [0.18, 0.35, -0.86]);
    cone([0.36, 1.02, 0.12], [0.34, 1.22, 0.08], dark, [0.18, -0.35, 0.86]);
  } else if (animal === 'trex') {
    sphere([0, 0.85, 0], [0.84, 0.48, 0.42], color);
    sphere([facing * 0.76, 1.14, 0], [0.5, 0.34, 0.34], color);
    cone([facing * 1.16, 1.1, 0], [0.2, 0.34, 0.16], dark, [0, 0, -facing * Math.PI / 2]);
    cone([-facing * 0.94, 0.8, 0], [0.24, 0.7, 0.18], dark, [0, 0, facing * Math.PI / 2]);
    [-0.28, 0.28].forEach((x) => cylinder([x, 0.34, 0], [0.12, 0.6, 0.12], dark));
    cylinder([facing * 0.34, 0.78, 0.34], [0.05, 0.34, 0.05], dark, [1.1, 0, 0]);
    cylinder([facing * 0.34, 0.78, -0.34], [0.05, 0.34, 0.05], dark, [1.1, 0, 0]);
  } else if (animal === 'gorilla') {
    sphere([0, 0.82, 0], [0.62, 0.7, 0.48], color);
    sphere([facing * 0.18, 1.35, 0], [0.42, 0.42, 0.36], dark);
    cylinder([-0.58, 0.66, 0.24], [0.13, 0.86, 0.13], dark, [0.5, 0, 0.35]);
    cylinder([-0.58, 0.66, -0.24], [0.13, 0.86, 0.13], dark, [-0.5, 0, 0.35]);
    sphere([-0.82, 0.3, 0.3], [0.18, 0.18, 0.18], light);
    sphere([-0.82, 0.3, -0.3], [0.18, 0.18, 0.18], light);
  } else if (animal === 'robot-crab') {
    box([0, 0.68, 0], [0.95, 0.36, 0.54], color);
    [-0.82, -0.42, 0.42, 0.82].forEach((x) => {
      cylinder([x, 0.42, 0.45], [0.05, 0.52, 0.05], dark, [1.05, 0, 0.28]);
      cylinder([x, 0.42, -0.45], [0.05, 0.52, 0.05], dark, [-1.05, 0, 0.28]);
    });
    sphere([facing * 0.88, 0.82, 0.36], [0.2, 0.2, 0.2], light);
    sphere([facing * 0.88, 0.82, -0.36], [0.2, 0.2, 0.2], light);
    cone([facing * 1.16, 0.82, 0.36], [0.14, 0.34, 0.14], dark, [0, 0, -facing * Math.PI / 2]);
    cone([facing * 1.16, 0.82, -0.36], [0.14, 0.34, 0.14], dark, [0, 0, -facing * Math.PI / 2]);
  } else {
    sphere([0, 0.82, 0], [0.84, 0.48, 0.42], color);
    sphere([facing * 0.68, 1.08, 0], [0.38, 0.34, 0.32], color);
    sphere([facing * 0.45, 1.09, 0], [0.5, 0.5, 0.5], dark);
    cone([-facing * 0.9, 0.86, 0], [0.18, 0.62, 0.16], dark, [0, 0, facing * Math.PI / 2]);
    [-0.5, -0.05, 0.35, 0.68].forEach((x) => cylinder([x, 0.32, 0], [0.1, 0.46, 0.1], dark));
  }

  const shadow = new THREE.Mesh(
    new THREE.CylinderGeometry(0.92, 1.05, 0.06, 36),
    new THREE.MeshStandardMaterial({ color: 0x17202a, roughness: 0.9, transparent: true, opacity: 0.18 })
  );
  shadow.position.y = 0.02;
  shadow.receiveShadow = true;
  model.add(shadow);

  model.scale.setScalar(creature.stats.power >= 10 ? 1.08 : 1);
  return model;
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function resizeArena3d() {
  if (!arena3d) return;
  const bounds = selectors.stage.getBoundingClientRect();
  const width = Math.max(1, Math.floor(bounds.width));
  const height = Math.max(1, Math.floor(bounds.height));
  arena3d.renderer.setSize(width, height, false);
  arena3d.camera.aspect = width / height;
  arena3d.camera.updateProjectionMatrix();
}

function setArena3d(arena) {
  if (!arena3d) return;
  const look = arenaLooks[arena.id] || arenaLooks.grassland;
  arena3d.currentArenaId = arena.id;
  arena3d.scene.background = new THREE.Color(look.sky);
  arena3d.scene.fog.color.setHex(look.sky);
  arena3d.scene.fog.near = look.fogNear;
  arena3d.scene.fog.far = look.fogFar;
  arena3d.ground.material.color.setHex(look.ground);
  arena3d.groundEdge.material.color.setHex(look.edge);
  arena3d.horizon.material.color.setHex(look.horizon);
  arena3d.horizon.material.opacity = arena.id === 'jungle' ? 0.5 : 0.4;
  arena3d.ring.material.color.setHex(look.accent);
  arena3d.ambient.groundColor.setHex(arena.id === 'ice' || arena.id === 'sky' ? 0x9fcad8 : 0x45604b);
  arena3d.sun.intensity = arena.id === 'jungle' ? 1.95 : 2.3;
  arena3d.rim.color.setHex(arena.id === 'desert' ? 0xffdf9b : 0xd7f8ff);
  Object.entries(arena3d.scenery.groups).forEach(([id, group]) => {
    group.visible = id === arena.id;
  });
}

function setArenaCreatures(a, b) {
  if (!arena3d) return;
  paintFighter(arena3d.fighterA, a, -1);
  paintFighter(arena3d.fighterB, b, 1);
  arena3d.fighterA.group.position.set(-2.25, 0.45, 0);
  arena3d.fighterB.group.position.set(2.25, 0.45, 0);
  arena3d.fighterA.group.scale.setScalar(1);
  arena3d.fighterB.group.scale.setScalar(1);
  arena3d.fighterA.group.visible = true;
  arena3d.fighterB.group.visible = true;
  arena3d.battling = false;
  arena3d.fight = null;
  arena3d.impactRing.visible = false;
  arena3d.attackBeam.visible = false;
  arena3d.hitText.visible = false;
  arena3d.winnerSide = null;
}

function paintFighter(fighter, creature, side) {
  if (fighter.creatureId !== creature.id) {
    fighter.model.clear();
    fighter.mixer = null;
    fighter.model.add(makeCreatureModel(creature, side));
    fighter.creatureId = creature.id;
    fighter.assetToken = Symbol(creature.id);
    const token = fighter.assetToken;

    loadCreatureSprite(creature, side).then((spriteModel) => {
      if (!spriteModel || fighter.creatureId !== creature.id || fighter.assetToken !== token) return;

      fighter.model.clear();
      fighter.model.add(spriteModel);
      fighter.mixer = null;
    });

    loadCreatureAsset(creature).then((asset) => {
      if (!asset || spriteAssets[creature.id] || fighter.creatureId !== creature.id || fighter.assetToken !== token) return;

      fighter.model.clear();
      fighter.model.add(asset.scene);
      fitModelToArena(asset.scene, side, asset.config);
      fighter.mixer = asset.config.playAnimation ? createModelMixer(asset.scene, asset.animations) : null;
    });
  }

  updateBillboard(fighter.name, creature.name);
}

async function loadCreatureSprite(creature, side) {
  const config = spriteAssets[creature.id];
  if (!config) return null;

  const texture = await loadTexture(config.url);
  if (!texture) return null;

  texture.colorSpace = THREE.SRGBColorSpace;
  const group = new THREE.Group();
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: true,
  });
  const sprite = new THREE.Sprite(material);
  const desiredFacing = side < 0 ? 1 : -1;
  const flip = config.nativeFacing === desiredFacing ? 1 : -1;
  sprite.scale.set(config.width * flip, config.height, 1);
  sprite.position.set(0, 1.08, 0.28);
  sprite.castShadow = true;
  group.add(sprite);

  const shadow = new THREE.Mesh(
    new THREE.CylinderGeometry(0.85, 1.15, 0.04, 42),
    new THREE.MeshStandardMaterial({ color: 0x17202a, roughness: 0.9, transparent: true, opacity: 0.2 })
  );
  shadow.position.y = 0.05;
  shadow.scale.z = 0.45;
  shadow.receiveShadow = true;
  group.add(shadow);
  return group;
}

function loadTexture(url) {
  if (spriteCache.has(url)) return spriteCache.get(url);

  const promise = new Promise((resolve) => {
    textureLoader.load(url, resolve, undefined, () => resolve(null));
  });
  spriteCache.set(url, promise);
  return promise;
}

async function loadCreatureAsset(creature) {
  const config = modelAssets[creature.id];
  if (!config?.url) return null;

  if (modelCache.has(config.url)) {
    const cached = await modelCache.get(config.url);
    return cloneCreatureAsset(cached, config);
  }

  const promise = fetch(config.url, { method: 'HEAD' })
    .then((response) => {
      if (!response.ok) return null;
      return new Promise((resolve) => {
        modelLoader.load(
          config.url,
          (gltf) => resolve({ scene: gltf.scene, animations: gltf.animations || [] }),
          undefined,
          () => resolve(null)
        );
      });
    })
    .catch(() => null);

  modelCache.set(config.url, promise);
  const loaded = await promise;
  return cloneCreatureAsset(loaded, config);
}

function cloneCreatureAsset(asset, config) {
  if (!asset?.scene) return null;
  return {
    scene: SkeletonUtils.clone(asset.scene),
    animations: asset.animations || [],
    config,
  };
}

function createModelMixer(model, animations) {
  if (!animations?.length) return null;

  const mixer = new THREE.AnimationMixer(model);
  const preferred = animations.find((clip) => /idle|walk|run|fly|hover/i.test(clip.name)) || animations[0];
  const action = mixer.clipAction(preferred);
  action.enabled = true;
  action.setEffectiveWeight(1);
  action.play();
  return mixer;
}

function fitModelToArena(model, side, config = {}) {
  model.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const largest = Math.max(size.x, size.y, size.z) || 1;
  const targetSize = config.targetSize || 2.8;
  const scale = targetSize / largest;

  model.scale.setScalar(scale);
  model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  model.rotation.y += side < 0 ? Math.PI / 2 : -Math.PI / 2;

  model.updateMatrixWorld(true);
  const fittedBox = new THREE.Box3().setFromObject(model);
  model.position.y += -fittedBox.min.y + 0.06;

  model.traverse((child) => {
    if (!child.isMesh) return;
    child.castShadow = true;
    child.receiveShadow = true;
    if (child.material) {
      child.material.roughness = child.material.roughness ?? 0.55;
    }
  });
}

function setArenaBattleState(state, winnerSide = null, details = {}) {
  if (!arena3d) return;
  arena3d.battling = state === 'battling';
  arena3d.winnerSide = state === 'winner' ? winnerSide : null;
  arena3d.fight = state === 'battling'
    ? {
        startedAt: performance.now(),
        winnerSide,
        loserSide: winnerSide === 'a' ? 'b' : 'a',
        winnerMove: details.winner?.ability || 'counter',
        loserMove: details.loser?.ability || 'attack',
      }
    : null;

  if (state !== 'battling') {
    arena3d.impactRing.visible = false;
    arena3d.attackBeam.visible = false;
    arena3d.hitText.visible = false;
  }
}

function animateArena3d(now = performance.now()) {
  if (!arena3d) return;
  const time = (now - arena3d.start) / 1000;
  const delta = Math.min((now - arena3d.lastFrame) / 1000, 0.05);
  arena3d.lastFrame = now;
  const wobble = Math.sin(time * 1.6) * 0.06;
  const fight = getFightFrame(now);
  const shake = fight.shake * Math.sin(time * 42);

  arena3d.camera.position.x = Math.sin(time * 0.22) * 0.36 + shake;
  arena3d.camera.position.y = 4.6 - fight.zoom * 0.55 + Math.abs(shake) * 0.3;
  arena3d.camera.position.z = 8.4 - fight.zoom * 1.25;
  arena3d.camera.lookAt(0, 0.65 + fight.zoom * 0.22, 0);
  arena3d.versus.position.y = 1.52 + Math.sin(time * 2.8) * 0.05;
  arena3d.versus.material.rotation = Math.sin(time * 2.1) * 0.05;
  arena3d.versus.visible = !arena3d.battling || fight.progress < 0.18;

  updateArenaScenery(time);
  updateFightEffects(fight, time);
  moveFighter(arena3d.fighterA, -1, time, wobble, fight);
  moveFighter(arena3d.fighterB, 1, time + 0.45, -wobble, fight);
  arena3d.fighterA.mixer?.update(delta);
  arena3d.fighterB.mixer?.update(delta);

  arena3d.renderer.render(arena3d.scene, arena3d.camera);
  window.requestAnimationFrame(animateArena3d);
}

function updateArenaScenery(time) {
  if (!arena3d?.scenery) return;
  arena3d.scenery.animated.forEach((item) => {
    if (!item.visible && item.parent && !item.parent.visible) return;
    const data = item.userData || {};
    if (data.kind === 'cloud') {
      item.position.y = data.baseY + Math.sin(time * data.speed) * 0.05;
      item.position.x += Math.sin(time * 0.2 + item.position.z) * 0.0008;
    } else if (data.kind === 'vine') {
      item.rotation.z = data.baseRotationZ + Math.sin(time * data.speed) * 0.08;
    } else if (data.kind === 'water') {
      item.position.y = data.baseY + Math.sin(time * 1.2) * 0.018;
      item.rotation.y = time * 0.035;
    } else if (data.kind === 'wave') {
      item.position.y = data.baseY + Math.sin(time * data.speed + data.phase) * 0.035;
      item.material.opacity = 0.55 + Math.sin(time * data.speed + data.phase) * 0.18;
    } else if (data.kind === 'bubble') {
      item.position.y = data.baseY + Math.sin(time * data.speed + data.phase) * 0.12;
      item.scale.setScalar(0.85 + Math.sin(time * data.speed + data.phase) * 0.18);
    } else if (data.kind === 'floe') {
      item.position.y = data.baseY + Math.sin(time * data.speed + data.phase) * 0.018;
      item.rotation.y += 0.0015;
    } else if (data.kind === 'snow') {
      item.position.y = data.baseY + Math.sin(time * data.speed + data.phase) * 0.05;
    }
  });
}

function getFightFrame(now) {
  const empty = {
    progress: 0,
    attackerSide: null,
    defenderSide: null,
    impact: 0,
    recoil: 0,
    shake: 0,
    zoom: 0,
  };

  if (!arena3d?.fight) return empty;

  const elapsed = Math.min((now - arena3d.fight.startedAt) / battleDurationMs, 1);
  const winnerSide = arena3d.fight.winnerSide === 'a' ? -1 : 1;
  const loserSide = -winnerSide;
  const attackerSide = elapsed < 0.22 || (elapsed > 0.42 && elapsed < 0.56) ? loserSide : winnerSide;
  const defenderSide = -attackerSide;
  const impact = (
    pulse(elapsed, 0.22, 0.05) * 0.45
    + pulse(elapsed, 0.39, 0.06) * 0.55
    + pulse(elapsed, 0.58, 0.07) * 0.75
    + pulse(elapsed, 0.78, 0.09)
    + pulse(elapsed, 0.91, 0.07) * 0.65
  );

  return {
    progress: elapsed,
    attackerSide,
    defenderSide,
    impact: Math.min(1, impact),
    recoil: Math.max(
      pulse(elapsed, 0.24, 0.08) * 0.32,
      pulse(elapsed, 0.6, 0.1) * 0.58,
      pulse(elapsed, 0.8, 0.12),
    ),
    shake: impact * 0.08,
    zoom: (pulse(elapsed, 0.52, 0.32) * 0.55) + (pulse(elapsed, 0.86, 0.18) * 0.35),
  };
}

function updateFightEffects(fight, time) {
  arena3d.impactRing.visible = fight.impact > 0.04;
  arena3d.impactRing.scale.setScalar(0.5 + fight.impact * 1.4);
  arena3d.impactRing.rotation.z = time * 2.4;

  arena3d.attackBeam.visible = arena3d.battling && (
    (fight.progress > 0.18 && fight.progress < 0.28)
    || (fight.progress > 0.53 && fight.progress < 0.66)
    || (fight.progress > 0.74 && fight.progress < 0.9)
  );
  arena3d.attackBeam.material.emissiveIntensity = 0.35 + fight.impact * 1.2;
  arena3d.attackBeam.scale.set(1, 0.55 + fight.impact * 0.55, 1);
  arena3d.attackBeam.rotation.z = fight.attackerSide < 0 ? Math.PI / 2 : -Math.PI / 2;

  arena3d.hitText.visible = fight.impact > 0.18;
  arena3d.hitText.position.y = 1.38 + fight.impact * 0.28;
  arena3d.hitText.scale.setScalar(0.85 + fight.impact * 0.45);
  arena3d.hitText.material.rotation = Math.sin(time * 18) * 0.1;
}

function pulse(value, center, width) {
  const distance = Math.abs(value - center) / width;
  return Math.max(0, 1 - distance);
}

function smoothstep(edge0, edge1, value) {
  const x = Math.min(Math.max((value - edge0) / (edge1 - edge0), 0), 1);
  return x * x * (3 - 2 * x);
}

function moveFighter(fighter, side, time, wobble, fight) {
  const group = fighter.group;
  const baseX = side < 0 ? -2.25 : 2.25;
  const isWinner = arena3d.winnerSide === (side < 0 ? 'a' : 'b');
  const isLoser = arena3d.winnerSide && !isWinner;

  let x = baseX;
  let y = 0.45 + Math.sin(time * 2.4) * 0.05;
  let scale = 1;
  let lean = wobble;

  if (arena3d.battling) {
    const isAttacker = fight.attackerSide === side;
    const isDefender = fight.defenderSide === side;
    const approach = smoothstep(0.06, 0.28, fight.progress) * (1 - smoothstep(0.94, 1, fight.progress));
    const strike = Math.max(
      pulse(fight.progress, 0.22, 0.08),
      pulse(fight.progress, 0.39, 0.08),
      pulse(fight.progress, 0.58, 0.1),
      pulse(fight.progress, 0.78, 0.12),
      pulse(fight.progress, 0.91, 0.08),
    );
    const lunge = isAttacker ? strike : 0;
    const recoil = isDefender ? fight.recoil : 0;

    x = baseX - side * approach * 0.64 - side * lunge * 0.56 + side * recoil * 0.42;
    y = 0.48 + Math.abs(Math.sin(time * 5.6)) * 0.08 + lunge * 0.16;
    scale = 1 + lunge * 0.08 - recoil * 0.07;
    lean = wobble + side * (-lunge * 0.22 + recoil * 0.28);

    fighter.model.rotation.x = Math.sin(time * 7.5) * 0.05 + lunge * 0.12;
    fighter.model.rotation.z = side * (lunge * 0.16 - recoil * 0.24);
  } else if (isWinner) {
    y = 0.48 + Math.abs(Math.sin(time * 5.5)) * 0.28;
    scale = 1.08;
    lean = wobble;
  } else if (isLoser) {
    y = 0.3;
    scale = 0.86;
    lean = side * 0.14;
  } else {
    fighter.model.rotation.x = Math.sin(time * 2.2) * 0.025;
    fighter.model.rotation.z = 0;
  }

  group.position.x = x;
  group.position.y = y;
  group.rotation.z = lean;
  group.scale.setScalar(scale);
}

function resetRound() {
  if (isBattling) return;

  currentGuess = null;
  document.querySelectorAll('.guess-button').forEach((button) => button.classList.remove('selected'));
  selectors.winnerTitle.textContent = 'Set up a battle to begin.';
  selectors.winnerReason.textContent = 'Choose an arena, make a guess, and run the first matchup.';
  selectors.replayList.innerHTML = '<li>The lab crew is adjusting the confetti cannons.</li>';
  selectors.scoreStrip.innerHTML = '';
  render();
}

function creatureCard(creature) {
  const stats = Object.entries(creature.stats)
    .map(([label, value]) => `
      <div class="stat-row">
        <span>${label}</span>
        <span class="stat-track"><span class="stat-fill" style="width: ${value * 10}%; color: ${creature.color}"></span></span>
        <strong>${value}</strong>
      </div>
    `)
    .join('');

  return `
    <div class="creature-portrait" style="color: ${creature.color}">${creatureImage(creature, 'portrait-image')}</div>
    <h2>${creature.name}</h2>
    <div class="creature-type">${creature.type} · ${creature.ability}</div>
    <div class="stat-list">${stats}</div>
    <p class="fact"><strong>Fact:</strong> ${creature.fact}</p>
    <p class="fact"><strong>Weak spot:</strong> ${creature.weakness}</p>
  `;
}

function creatureImage(creature, className) {
  const sprite = spriteAssets[creature.id];
  if (!sprite) return creature.icon;

  return `<img class="${className}" src="${sprite.url}" alt="${creature.name}" />`;
}

function scoreCreature(creature, opponent, arena) {
  const statTotal =
    creature.stats.power * 1.25 +
    creature.stats.defense +
    creature.stats.speed +
    creature.stats.smarts * 0.85 +
    creature.stats.special * 1.1;

  const homeBonus = creature.habitat.includes(arena.id) ? 8 : -4;
  const oceanPenalty = arena.id === 'ocean' && !creature.habitat.includes('ocean') ? -9 : 0;
  const skyPenalty = arena.id === 'sky' && !creature.habitat.includes('sky') ? -8 : 0;
  const matchupBonus = specialMatchupBonus(creature, opponent, arena);
  const comedyChaos = Math.floor(Math.random() * 7) - 3;

  return Math.round(statTotal + homeBonus + oceanPenalty + skyPenalty + matchupBonus + comedyChaos);
}

function specialMatchupBonus(creature, opponent, arena) {
  if (creature.id === 'dragon' && arena.id !== 'ocean') return 5;
  if (creature.id === 'dragon' && arena.id === 'ocean') return -10;
  if (creature.id === 'great-white' && arena.id === 'ocean') return 9;
  if (creature.id === 'octopus' && arena.id === 'ocean') return 8;
  if (creature.id === 'kraken' && arena.id === 'ocean') return 10;
  if (creature.id === 'eagle' && arena.id === 'sky') return 8;
  if (creature.id === 'mammoth' && arena.id === 'ice') return 7;
  if (creature.id === 'crocodile' && opponent.stats.speed <= 4) return 4;
  return 0;
}

async function battle() {
  if (!currentGuess || isBattling) return;

  const a = getCreature(selectors.fighterA.value);
  const b = getCreature(selectors.fighterB.value);
  const arena = getArena();

  isBattling = true;
  selectors.battleButton.disabled = true;
  selectors.battleButton.textContent = 'Battle in progress...';
  selectors.scoreStrip.innerHTML = '';
  selectors.winnerTitle.textContent = 'Battle in progress...';
  selectors.winnerReason.textContent = 'The lab camera is rolling.';
  selectors.stage.className = stageClass(arena, 'battling');

  if (a.id === b.id) {
    setArenaBattleState('battling', 'a', { winner: a, loser: b });
    await playSimulation(a, b, arena, ['Mirror match!', 'Same move!', 'Snack break!']);
    selectors.stage.className = stageClass(arena);
    selectors.winnerTitle.textContent = `${a.name} ties ${b.name}!`;
    selectors.winnerReason.textContent = 'The lab refuses to pick between identical challengers. Everyone gets a juice box.';
    selectors.replayList.innerHTML = '<li>Both challengers used the same move at the same time.</li><li>The referee declared a mirror-match tie.</li>';
    selectors.scoreStrip.innerHTML = '';
    setArenaBattleState('idle');
    finishBattle();
    return;
  }

  const scoreA = scoreCreature(a, b, arena);
  const scoreB = scoreCreature(b, a, arena);
  const winner = scoreA >= scoreB ? a : b;
  const loser = winner === a ? b : a;
  const winnerSide = winner === a ? 'a' : 'b';
  const margin = Math.abs(scoreA - scoreB);
  const guessText = currentGuess ? (currentGuess === winnerSide ? 'Your guess was right.' : 'Your guess got surprised.') : 'Make a guess next time before you battle.';
  const lines = replayLines(winner, loser, arena, margin);

  setArenaBattleState('battling', winnerSide, { winner, loser });
  await playSimulation(winner, loser, arena, lines);

  selectors.stage.className = stageClass(arena, winnerSide === 'a' ? 'winner-left' : 'winner-right');
  setArenaBattleState('winner', winnerSide);
  selectors.roundBadge.textContent = `${winner.name} wins!`;
  selectors.effectBurst.textContent = 'TA-DA!';
  selectors.winnerTitle.textContent = `${winner.name} wins!`;
  selectors.winnerReason.textContent = `${guessText} In the ${arena.name}, ${winner.name} had the edge because ${explainEdge(winner, loser, arena)}`;
  selectors.replayList.innerHTML = lines.map((line) => `<li>${line}</li>`).join('');
  selectors.scoreStrip.innerHTML = `
    <div class="score-pill"><span>${a.name}</span><span>${scoreA}</span></div>
    <div class="score-pill"><span>${b.name}</span><span>${scoreB}</span></div>
    <div class="score-pill"><span>Arena lesson</span><span>${arena.bonus}</span></div>
  `;
  finishBattle();
}

function explainEdge(winner, loser, arena) {
  if (winner.habitat.includes(arena.id) && !loser.habitat.includes(arena.id)) {
    return `it was fighting in a habitat that matches its best adaptations.`;
  }

  const winnerBest = bestStat(winner);
  const loserBest = bestStat(loser);

  if (winnerBest.value > loserBest.value) {
    return `its ${winnerBest.label} score beat ${loser.name}'s best trick.`;
  }

  return `its special ability, ${winner.ability}, caused maximum cartoon confusion.`;
}

function bestStat(creature) {
  return Object.entries(creature.stats)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)[0];
}

function pickLine(lines) {
  return lines[Math.floor(Math.random() * lines.length)];
}

function arenaTactic(creature, arena) {
  const isHome = creature.habitat.includes(arena.id);
  const best = bestStat(creature);

  if (isHome) {
    return pickLine([
      `${creature.name} uses the ${arena.name} like home turf and forces the angle it wants.`,
      `${creature.name} settles into the ${arena.name}, moving like it practiced here all week.`,
      `The arena favors ${creature.name}, and it starts turning that comfort into pressure.`,
    ]);
  }

  if (best.label === 'speed') {
    return `${creature.name} keeps circling, trying to win the round with speed instead of trading heavy hits.`;
  }

  if (best.label === 'smarts') {
    return `${creature.name} slows the pace, reading the opening before committing to a risky move.`;
  }

  if (best.label === 'defense') {
    return `${creature.name} shells up and waits for a mistake, letting its defense absorb the first rush.`;
  }

  return `${creature.name} tests the footing, looking for one clean lane through the ${arena.name}.`;
}

function statDuelLine(winner, loser) {
  const winnerBest = bestStat(winner);
  const loserBest = bestStat(loser);

  if (winnerBest.label === loserBest.label) {
    return `Both fighters lean on ${winnerBest.label}, but ${winner.name} gets cleaner timing when it matters.`;
  }

  return `${loser.name}'s ${loserBest.label} keeps it alive, but ${winner.name}'s ${winnerBest.label} starts taking over.`;
}

function replayLines(winner, loser, arena, margin) {
  const closeLine = margin < 6
    ? pickLine([
      `The lead keeps changing hands, and the judges have to check the replay twice.`,
      `Neither side runs away with it; every exchange changes the scoreboard a little.`,
      `This one stays close enough that the final exchange actually matters.`,
    ])
    : pickLine([
      `${winner.name} starts building a real lead once the matchup settles down.`,
      `The longer it goes, the more the matchup tilts toward ${winner.name}.`,
      `${loser.name} has moments, but ${winner.name} keeps stacking better exchanges.`,
    ]);

  return [
    `${loser.name} opens cautiously, then commits to ${loser.ability} to test the distance.`,
    arenaTactic(winner, arena),
    `${winner.name} answers with ${winner.ability}, but ${loser.name} does not fold right away.`,
    statDuelLine(winner, loser),
    `${loser.name} tries to reset the fight and steal momentum near the edge of the arena.`,
    closeLine,
    `${winner.name} finds the cleanest opening of the round and turns it into the deciding move.`,
    `Lesson: matchups depend on habitat, body design, and special adaptations, not just who looks scarier.`,
  ];
}

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function playSimulation(winner, loser, arena, lines) {
  selectors.replayList.innerHTML = '';

  const beats = [
    { badge: `${arena.name} doors open!`, burst: 'WHOOSH!' },
    { badge: `${loser.name} probes first`, burst: 'STEP!' },
    { badge: `${winner.name} claims position`, burst: 'SHIFT!' },
    { badge: `${winner.name} tests a counter`, burst: 'CLASH!' },
    { badge: 'Momentum swings again', burst: 'THUD!' },
    { badge: 'The final exchange builds...', burst: 'DRUM!' },
    { badge: `${winner.name} lands the deciding move`, burst: 'BOOM!' },
    { badge: 'Judges check the science notes...', burst: 'HMM!' },
  ];

  for (let index = 0; index < beats.length; index += 1) {
    selectors.roundBadge.textContent = beats[index].badge;
    selectors.effectBurst.textContent = beats[index].burst;
    selectors.replayList.innerHTML = lines
      .slice(0, index + 1)
      .map((line, lineIndex) => `<li class="${lineIndex === index ? 'current' : ''}">${line}</li>`)
      .join('');
    await sleep(replayBeatMs);
  }
}

function finishBattle() {
  isBattling = false;
  selectors.battleButton.disabled = false;
  selectors.battleButton.textContent = 'Battle again!';
}

function randomize() {
  if (isBattling) return;
  const first = creatures[Math.floor(Math.random() * creatures.length)];
  let second = creatures[Math.floor(Math.random() * creatures.length)];

  while (second.id === first.id) {
    second = creatures[Math.floor(Math.random() * creatures.length)];
  }

  selectors.fighterA.value = first.id;
  selectors.fighterB.value = second.id;
  selectors.arena.value = arenas[Math.floor(Math.random() * arenas.length)].id;
  resetRound();
}

init();
