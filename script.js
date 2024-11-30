const gridContainer = document.getElementById('gridContainer');
const colorPicker = document.getElementById('colorPicker');
const addColorButton = document.getElementById('addColor');
const palette = document.getElementById('palette');
const errorModal = document.getElementById('errorModal');
const modalMessage = document.getElementById('modalMessage');
const closeModal = document.getElementById('closeModal');
const timerDisplay = document.getElementById('timerDisplay');

let selectedColor = '#000000'; // Default color
let isClickable = true; // Controls whether the grid is clickable
let timer; // Timer reference

// Fixed Grid Size
const gridRows = 128; // 2048px / 16px pixels
const gridCols = 128;
const pixelSize = 16; // Each square pixel is 16px by 16px

// Maximum number of colors in the palette
const maxPaletteColors = 10;

// Local storage key for storing pixel data
const localStorageKey = 'pixelData';

// Initialize grid data
let pixelData = JSON.parse(localStorage.getItem(localStorageKey)) || {};

// Modal functionality
function showModal(message) {
  modalMessage.textContent = message;
  errorModal.classList.remove('hidden');
}

closeModal.addEventListener('click', () => {
  errorModal.classList.add('hidden');
});

// Timer functionality
function startTimer(duration) {
  isClickable = false;
  let remainingTime = duration;

  updateTimerDisplay(remainingTime); // Update the timer display immediately

  timer = setInterval(() => {
    remainingTime--;

    if (remainingTime <= 0) {
      clearInterval(timer);
      isClickable = true; // Allow clicking again
      updateTimerDisplay(0); // Update the display to show "Ready"
      return;
    }

    updateTimerDisplay(remainingTime); // Update the timer display
  }, 1000);
}

// Timer display update
function updateTimerDisplay(seconds) {
  if (seconds <= 0) {
    timerDisplay.textContent = 'Timer: Ready';
  } else {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerDisplay.textContent = `Timer: ${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}

// Save pixel data to local storage
function savePixelData() {
  localStorage.setItem(localStorageKey, JSON.stringify(pixelData));
}

// Load pixel data from local storage and update the grid
function loadPixelData() {
  for (const position in pixelData) {
    const pixel = document.querySelector(`[data-position="${position}"]`);
    if (pixel) {
      pixel.style.backgroundColor = pixelData[position];
    }
  }
}

// Create the grid with fixed rows and columns
function setupGrid() {
  // Clear existing grid
  gridContainer.innerHTML = '';

  // Set grid styles
  gridContainer.style.gridTemplateColumns = `repeat(${gridCols}, ${pixelSize}px)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridRows}, ${pixelSize}px)`;

  // Create pixels
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      const pixel = document.createElement('div');
      const position = `${row}-${col}`;
      pixel.style.width = `${pixelSize}px`;
      pixel.style.height = `${pixelSize}px`;
      pixel.classList.add('cursor-pointer', 'border', 'border-gray-200', 'bg-white');
      pixel.dataset.position = position;

      // Apply saved color if available
      if (pixelData[position]) {
        pixel.style.backgroundColor = pixelData[position];
      }

      pixel.addEventListener('click', () => {
        if (!isClickable) {
          showModal('Please wait for the timer to finish before clicking on another pixel.');
          return;
        }

        pixel.style.backgroundColor = selectedColor;
        pixelData[position] = selectedColor; // Save the color
        savePixelData(); // Save to local storage
        startTimer(210); // Start a timer for 3 minutes 30 seconds
      });

      gridContainer.appendChild(pixel);
    }
  }
}

// Initialize the grid
setupGrid();
loadPixelData(); // Load data from local storage

// Add a new color to the palette
addColorButton.addEventListener('click', () => {
  const newColor = colorPicker.value;

  // Check for duplicate color
  const existingColors = Array.from(palette.children).map(
    (colorDiv) => colorDiv.dataset.color
  );

  if (existingColors.includes(newColor)) {
    showModal('This color is already in your palette.');
    return;
  }

  // Ensure the palette does not exceed 10 colors
  while (palette.children.length >= maxPaletteColors) {
    // Remove the first color (FIFO logic)
    palette.removeChild(palette.firstChild);
  }

  // Add the new color
  const colorDiv = document.createElement('div');
  colorDiv.classList.add(
    'color',
    'w-8',
    'h-8',
    'cursor-pointer',
    'rounded'
  );
  colorDiv.style.backgroundColor = newColor;
  colorDiv.dataset.color = newColor;

  // Click to select the color
  colorDiv.addEventListener('click', () => {
    selectedColor = colorDiv.dataset.color;
  });

  // Right-click to remove the color
  colorDiv.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    palette.removeChild(colorDiv);
  });

  palette.appendChild(colorDiv);
});

// Initialize the palette with predefined colors
function initializePalette() {
  const predefinedColors = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
    '#FF00FF', '#00FFFF', '#000000', '#FFFFFF',
  ];

  predefinedColors.forEach((color) => {
    const colorDiv = document.createElement('div');
    colorDiv.classList.add(
      'color',
      'w-8',
      'h-8',
      'cursor-pointer',
      'rounded'
    );
    colorDiv.style.backgroundColor = color;
    colorDiv.dataset.color = color;

    // Click to select the color
    colorDiv.addEventListener('click', () => {
      selectedColor = colorDiv.dataset.color;
    });

    // Right-click to remove the color
    colorDiv.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      palette.removeChild(colorDiv);
    });

    palette.appendChild(colorDiv);
  });
}

// Initialize the palette
initializePalette();
