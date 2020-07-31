// Selectors
const palettes = document.querySelectorAll('.palette');
const editBtns = document.querySelectorAll('.edit');
const colorContainer = document.querySelectorAll('.color-container');
const exitPickers = document.querySelectorAll('.exit-picker');
const gradientText = document.querySelectorAll('.gradient-text');
const generateBtn = document.querySelector('#generate');
const colorInput = document.querySelectorAll('.color-input');

// Event Listeners

// Gnereate button to get new random gradients
generateBtn.addEventListener('click', insertRandomColors);

// This is responsibel for the edit button to silde up and down
palettes.forEach((palette) => {
	palette.addEventListener('mouseover', editBtnSlideUp);
	palette.addEventListener('mouseout', editBtnslideDown);
});

// This the X button on the color picker palette
exitPickers.forEach((exitPicker) => {
	exitPicker.addEventListener('click', removePaletteShowPicker);
});

// This for the edit button to invoke the color picker
editBtns.forEach((editBtn) => {
	editBtn.addEventListener('click', paletteShowPicker);
});

// This is to stop the the color picker from event propagation
colorContainer.forEach((colorInput) => {
	colorInput.addEventListener('click', function(e) {
		e.stopPropagation();
	});
});

// Functions

// Generate hex colors
function generateHex() {
	const letters = '123456789abcdef';
	let prefix = '#';
	for (let i = 0; i < 6; i++) {
		prefix += letters[Math.floor(Math.random() * 15)];
	}
	return prefix;
}

// Adding gradient to palettes
function insertRandomColors() {
	palettes.forEach((palette, index) => {
		const leftGradient = generateHex();
		const rightGradient = generateHex();
		palette.style.background = `linear-gradient(to right, ${leftGradient}, ${rightGradient})`;
		gradientText[index].innerText = `linear-gradient(to right, ${leftGradient}, ${rightGradient})`;
		const colorInput1 = palette.children[1].children[1];
		const colorInput2 = palette.children[1].children[2];
		colorInput1.value = leftGradient;
		colorInput2.value = rightGradient;
	});
}

// This to invoke the color picker up and down
function paletteShowPicker() {
	const colorPickerBtn = this.parentElement.children[1];
	colorPickerBtn.classList.add('active');
	if (colorPickerBtn.classList.contains('active')) {
		this.classList.remove('active');
	}
}

function removePaletteShowPicker() {
	const colorPickerElement = this.parentElement;
	if (colorPickerElement.classList.contains('active')) {
		colorPickerElement.classList.remove('active');
	}
}

// Responsible for the edit button to slide up and down
function editBtnSlideUp() {
	const editButton = this.children[0];
	const colorPickerBtn = this.children[1];
	if (!colorPickerBtn.classList.contains('active')) {
		editButton.classList.add('active');
	}
}

function editBtnslideDown() {
	const editButton = this.children[0];
	editButton.classList.remove('active');
}

insertRandomColors();
