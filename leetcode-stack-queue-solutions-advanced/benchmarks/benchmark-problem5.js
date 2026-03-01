/**
 * @file Performance benchmark for the Walls and Gates problem.
 * @module benchmarks/problem5
 */

const { Suite } = require('benchmark');
const wallsAndGates = require('../src/problems/problem5-walls-and-gates/wallsAndGates');

// Constants for the grid
const INF = wallsAndGates.INF;
const WALL = wallsAndGates.WALL;
const GATE = wallsAndGates.GATE;

// --- Test Cases for Benchmarking ---

// Helper function to create a grid
function createGrid(rows, cols, gateDensity = 0.01, wallDensity = 0.2) {
    const grid = Array(rows).fill(null).map(() => Array(cols).fill(INF));
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (Math.random() < wallDensity) {
                grid[r][c] = WALL;
            } else if (Math.random() < gateDensity) {
                grid[r][c] = GATE;
            }
        }
    }
    // Ensure at least one gate if no gate was randomly placed
    let hasGate = false;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === GATE) {
                hasGate = true;
                break;
            }
        }
        if (hasGate) break;
    }
    if (!hasGate && rows > 0 && cols > 0) {
        grid[0][0] = GATE;
    }
    return grid;
}

// Small grid (10x10)
const gridSmall = createGrid(10, 10);

// Medium grid (100x100)
const gridMedium = createGrid(100, 100);

// Large grid (500x500)
const gridLarge = createGrid(500, 500);

// Grid with few gates, mostly INF (max BFS propagation)
const gridSparseGates = createGrid(200, 200, 0.001, 0.1); // Few gates, some walls

// Grid with many gates, easily reachable (min BFS propagation for each room)
const gridDenseGates = createGrid(200, 200, 0.1, 0.1); // Many gates, some walls

// Grid with no gates (should quickly finish)
const gridNoGates = createGrid(100, 100, 0, 0.1);

// Grid completely blocked (many walls)
const gridBlocked = createGrid(100, 100, 0.01, 0.8);

// --- Benchmark Suite ---

const suite = new Suite('Walls and Gates (Multi-Source BFS)');

suite
    .add('wallsAndGates - Small Grid (10x10)', () => {
        const testGrid = createGrid(10, 10); // Create fresh grid for each run
        wallsAndGates(testGrid);
    })
    .add('wallsAndGates - Medium Grid (100x100)', () => {
        const testGrid = createGrid(100, 100);
        wallsAndGates(testGrid);
    })
    .add('wallsAndGates - Large Grid (500x500)', () => {
        const testGrid = createGrid(500, 500);
        wallsAndGates(testGrid);
    })
    .add('wallsAndGates - Sparse Gates (200x200)', () => {
        const testGrid = createGrid(200, 200, 0.001, 0.1);
        wallsAndGates(testGrid);
    })
    .add('wallsAndGates - Dense Gates (200x200)', () => {
        const testGrid = createGrid(200, 200, 0.1, 0.1);
        wallsAndGates(testGrid);
    })
    .add('wallsAndGates - No Gates (100x100)', () => {
        const testGrid = createGrid(100, 100, 0, 0.1);
        wallsAndGates(testGrid);
    })
    .add('wallsAndGates - Mostly Blocked (100x100)', () => {
        const testGrid = createGrid(100, 100, 0.01, 0.8);
        wallsAndGates(testGrid);
    })
    // Add listeners to report results
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('--- Walls and Gates Benchmark Results ---');
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        console.log('-----------------------------------------');
    })
    // Run async
    .run({ 'async': true });