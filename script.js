// Variables to store game state
let score = 0;
let clickPower = 1;
let autoClickerCount = 0;
let autoClickerEfficiency = 1;
let autoClickerCost = 50;
let clickPowerCost = 100;
let autoClickerEfficiencyCost = 200;
let reduceCostCost = 500;
let prestigeMultiplier = 1;
let upgradeDiscount = 1.0;
let prestigeAvailable = false;
let sps = 0; // Score per second

// DOM Elements
const scoreElement = document.getElementById('score');
const spsElement = document.getElementById('sps'); // New SPS element
const clickButton = document.getElementById('clickButton');
const autoClickerCostElement = document.getElementById('autoClickerCost');
const clickPowerCostElement = document.getElementById('clickPowerCost');
const autoClickerEfficiencyCostElement = document.getElementById('autoClickerEfficiencyCost');
const reduceCostCostElement = document.getElementById('reduceCostCost');
const prestigeButton = document.getElementById('prestigeButton');

// Upgrade Buttons
const buyAutoClickerButton = document.getElementById('buyAutoClicker');
const buyClickPowerButton = document.getElementById('buyClickPower');
const buyAutoClickerEfficiencyButton = document.getElementById('buyAutoClickerEfficiency');
const buyReduceCostButton = document.getElementById('buyReduceCost');

// Load saved game data
window.addEventListener('load', () => {
    const savedGame = localStorage.getItem('clickerGame');
    if (savedGame) {
        const gameData = JSON.parse(savedGame);
        score = gameData.score;
        clickPower = gameData.clickPower;
        autoClickerCount = gameData.autoClickerCount;
        autoClickerEfficiency = gameData.autoClickerEfficiency;
        autoClickerCost = gameData.autoClickerCost;
        clickPowerCost = gameData.clickPowerCost;
        autoClickerEfficiencyCost = gameData.autoClickerEfficiencyCost;
        reduceCostCost = gameData.reduceCostCost;
        prestigeMultiplier = gameData.prestigeMultiplier;
        upgradeDiscount = gameData.upgradeDiscount;
        updateScore();
    }
});

// Save game data
function saveGame() {
    const gameData = {
        score,
        clickPower,
        autoClickerCount,
        autoClickerEfficiency,
        autoClickerCost,
        clickPowerCost,
        autoClickerEfficiencyCost,
        reduceCostCost,
        prestigeMultiplier,
        upgradeDiscount
    };
    localStorage.setItem('clickerGame', JSON.stringify(gameData));
}

// Click event: Add points when button is clicked
clickButton.addEventListener('click', () => {
    score += clickPower * prestigeMultiplier;
    updateScore();
    checkPrestige();
    saveGame();
});

// Buy Auto Clicker
buyAutoClickerButton.addEventListener('click', () => {
    if (score >= autoClickerCost) {
        score -= autoClickerCost;
        autoClickerCount++;
        autoClickerCost = Math.floor(autoClickerCost * 1.2 * upgradeDiscount); // Increase cost
        autoClickerCostElement.textContent = autoClickerCost;
        updateScore();
        saveGame();
    }
});

// Buy Click Power Upgrade
buyClickPowerButton.addEventListener('click', () => {
    if (score >= clickPowerCost) {
        score -= clickPowerCost;
        clickPower *= 2; // Double the click power
        clickPowerCost = Math.floor(clickPowerCost * 1.5 * upgradeDiscount); // Increase cost
        clickPowerCostElement.textContent = clickPowerCost;
        updateScore();
        saveGame();
    }
});

// Buy Auto Clicker Efficiency Upgrade
buyAutoClickerEfficiencyButton.addEventListener('click', () => {
    if (score >= autoClickerEfficiencyCost) {
        score -= autoClickerEfficiencyCost;
        autoClickerEfficiency++; // Increase auto-clicker efficiency
        autoClickerEfficiencyCost = Math.floor(autoClickerEfficiencyCost * 1.3 * upgradeDiscount);
        autoClickerEfficiencyCostElement.textContent = autoClickerEfficiencyCost;
        updateScore();
        saveGame();
    }
});

// Buy Reduce Cost Upgrade
buyReduceCostButton.addEventListener('click', () => {
    if (score >= reduceCostCost) {
        score -= reduceCostCost;
        upgradeDiscount *= 0.9; // Reduce all upgrade costs
        reduceCostCost = Math.floor(reduceCostCost * 1.5);
        reduceCostCostElement.textContent = reduceCostCost;
        updateScore();
        saveGame();
    }
});

// Function to update score display and calculate SPS
function updateScore() {
    scoreElement.textContent = score;
    calculateSPS();
    spsElement.textContent = sps; // Update SPS display
    checkPrestige();
}

// Calculate Score per Second (SPS)
function calculateSPS() {
    sps = autoClickerCount * autoClickerEfficiency * prestigeMultiplier;
}

// Auto clicker loop (points per second per auto clicker)
setInterval(() => {
    if (autoClickerCount > 0) {
        score += sps; // Add SPS to score
        updateScore();
        saveGame();
    }
}, 1000);

// Prestige system: Reset game for multiplier
prestigeButton.addEventListener('click', () => {
    if (prestigeAvailable) {
        resetGame(true); // Reset and grant prestige bonus
    }
});

// Reset game with or without prestige
function resetGame(isPrestige = false) {
    if (isPrestige) {
        prestigeMultiplier *= 2; // Double prestige multiplier
    }
    score = 0;
    clickPower = 1;
    autoClickerCount = 0;
    autoClickerEfficiency = 1;
    autoClickerCost = 50;
    clickPowerCost = 100;
    autoClickerEfficiencyCost = 200;
    reduceCostCost = 500;
    upgradeDiscount = 1.0;
    updateScore();
    saveGame();
    checkPrestige();
}

// Check if prestige is available (score threshold)
function checkPrestige() {
    if (score >= 10000) {
        prestigeAvailable = true;
        prestigeButton.classList.remove('hidden');
    } else {
        prestigeAvailable = false;
        prestigeButton.classList.add('hidden');
    }
}
