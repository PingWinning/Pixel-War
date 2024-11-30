const gridContainer = document.getElementById('gridContainer');
const colorPicker = document.getElementById('colorPicker');
const addColorButton = document.getElementById('addColor');
const palette = document.getElementById('palette');
const timerDisplay = document.getElementById('timerDisplay');

const errorModal = document.getElementById('errorModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const closeModalButton = document.getElementById('closeModal');

let selectedColor = '#000000';
let isClickable = true;
let timer;

const gridRows = 128;
const gridCols = 128;
const pixelSize = 16;
const maxPaletteColors = 10;

// Function to start the timer
function startTimer(duration) {
  isClickable = false;
  let remainingTime = duration;

  timer = setInterval(() => {
    if (--remainingTime <= 0) {
      clearInterval(timer);
      isClickable = true;
      timerDisplay.textContent = 'Timer: Ready';
      return;
    }
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timerDisplay.textContent = `Timer: ${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

// Show error modal
function showErrorModal(title, message) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  errorModal.classList.remove('hidden');
}

// Close modal
closeModalButton.addEventListener('click', () => {
  errorModal.classList.add('hidden');
});

// Fetch and render the canvas periodically
async function fetchAndRenderCanvas() {
  try {
    const response = await fetch('api.php?action=getCanvas');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const pixels = await response.json();
    if (!Array.isArray(pixels)) {
      throw new Error('Invalid data format received from server');
    }
    pixels.forEach((pixel) => {
      const cell = document.querySelector(`[data-position="${pixel.position}"]`);
      if (cell) {
        cell.style.backgroundColor = pixel.color;
      }
    });
  } catch (error) {
    console.error('Error fetching canvas:', error.message);
    showErrorModal('Error!', 'Failed to update the canvas in real time.');
  }
}

// Update a pixel
async function updatePixel(position, color) {
  const formData = new FormData();
  formData.append('position', position);
  formData.append('color', color);

  try {
    const response = await fetch('api.php?action=updatePixel', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    if (result.error) {
      showErrorModal('Error!', 'Failed to update the pixel.');
    } else {
      startTimer(80); // Start cooldown timer
    }
  } catch (error) {
    console.error('Error updating pixel:', error.message);
    showErrorModal('Error!', 'Failed to update the pixel.');
  }
}

function setupGrid() {
  gridContainer.style.gridTemplateColumns = `repeat(${gridCols}, ${pixelSize}px)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridRows}, ${pixelSize}px)`;

  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      const pixel = document.createElement('div');
      pixel.dataset.position = `${row}-${col}`;
      pixel.className = 'border border-gray-200 bg-white';
      pixel.style.width = `${pixelSize}px`;
      pixel.style.height = `${pixelSize}px`;

      pixel.addEventListener('click', () => {
        if (!isClickable) {
          showErrorModal('Wait!', 'Cooldown timer is still running.');
          return;
        }
        updatePixel(pixel.dataset.position, selectedColor);
      });

      gridContainer.appendChild(pixel);
    }
  }
}

// Add color to palette
addColorButton.addEventListener('click', () => {
  const newColor = colorPicker.value;

  if ([...palette.children].some(div => div.dataset.color === newColor)) {
    showErrorModal('Duplicate!', 'This color is already in the palette.');
    return;
  }

  if (palette.children.length >= maxPaletteColors) {
    palette.removeChild(palette.firstChild);
  }

  const colorDiv = document.createElement('div');
  colorDiv.dataset.color = newColor;
  colorDiv.className = 'w-8 h-8 rounded cursor-pointer';
  colorDiv.style.backgroundColor = newColor;

  colorDiv.addEventListener('click', () => {
    selectedColor = newColor;
  });

  palette.appendChild(colorDiv);
});

// Initialize
setupGrid();
fetchAndRenderCanvas();
setInterval(fetchAndRenderCanvas, 2000); // Poll every 2 seconds
