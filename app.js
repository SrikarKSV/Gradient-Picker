// Selectors
const palettes = document.querySelectorAll('.palette');
const editBtns = document.querySelectorAll('.edit');
const colorContainer = document.querySelectorAll('.color-container');
const exitPickers = document.querySelectorAll('.exit-picker');
const gradientText = document.querySelectorAll('.gradient-text');
const generateBtn = document.querySelector('#generate');
const colorInputs = document.querySelectorAll('.color-input');
const popup = document.querySelector('.copy-container');
const locks = document.querySelectorAll('.lock');

// Array to track colors of the background
let inputColors = [];

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

// Changing background using color input
colorInputs.forEach((colorInput) => {
	colorInput.addEventListener('input', backgroundGenerator);
});

// Copying the background gradient from clipboard
gradientText.forEach((text) => {
	text.addEventListener('click', copyToClipboard);
});

// To end the transition of popup
popup.addEventListener('transitionend', () => {
	const popBox = popup.children[0];
	popBox.classList.remove('active');
	popup.classList.remove('active');
});

// Lock button
locks.forEach((lock) => {
	lock.addEventListener('click', lockPalette);
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
	inputColors = [];
	palettes.forEach((palette, index) => {
		// If the palette has a class locked then the background won't change
		if (!palette.classList.contains('locked')) {
			// Generating random colors
			const leftGradient = generateHex();
			const rightGradient = generateHex();
			// Adding the colors to the palette
			inputColors.push([ leftGradient, rightGradient ]);
			palette.style.background = `linear-gradient(to right, ${leftGradient}, ${rightGradient})`;
			// Changing the text
			gradientText[index].innerText = `linear-gradient(to right, ${leftGradient}, ${rightGradient})`;
			// Setting the value of color input to the colors
			const colorInput1 = palette.children[1].children[1];
			const colorInput2 = palette.children[1].children[2];
			colorInput1.value = leftGradient;
			colorInput2.value = rightGradient;
		}
	});
}

// Changing background gradient with color input
function backgroundGenerator() {
	// Will get the palette div
	const paletteChildren = this.parentElement.children;
	// If the id of the color input is even the it's left color input
	if (this.getAttribute('id') % 2 === 0) {
		const rightColorValue = paletteChildren[2].value;
		this.parentElement.parentElement.style.background = `linear-gradient(to right, ${this
			.value}, ${rightColorValue})`;
		gradientText.forEach((text) => {
			// If the gradient contains the same class as the name of the color input
			if (text.classList.contains(this.name)) {
				text.innerText = `linear-gradient(to right, ${this.value}, ${rightColorValue})`;
			}
		});
		// this.parentElement.parentElement.setAttribute('left-gradient', this.value);
	} else {
		// Else it's right
		const leftColorValue = paletteChildren[1].value;
		this.parentElement.parentElement.style.background = `linear-gradient(to right, ${leftColorValue}, ${this
			.value})`;
		gradientText.forEach((text) => {
			// If the gradient contains the same class as the name of the color input
			if (text.classList.contains(this.name)) {
				text.innerText = `linear-gradient(to right, ${leftColorValue}, ${this.value})`;
			}
		});
		// this.parentElement.parentElement.setAttribute('right-gradient', this.value);
	}
}

// Copying to the clip board
function copyToClipboard() {
	// Creatng a temporary textarea for the text to be inserted
	const el = document.createElement('textarea');
	el.value = this.innerText;
	document.body.appendChild(el);
	el.select();
	// Text is copied
	document.execCommand('copy');
	// The element is destroyed
	document.body.removeChild(el);
	// Pop up animation
	const popBox = popup.children[0];
	popup.classList.add('active');
	popBox.classList.add('active');
}

// Locking the palette
function lockPalette() {
	this.parentElement.classList.toggle('locked');
	if (this.children[0].classList.contains('fa-lock-open')) {
		this.innerHTML = '<i class="fas fa-lock"></i>';
	} else {
		this.innerHTML = '<i class="fas fa-lock-open"></i>';
	}
}

// ******************************************************Responsible for the animation of edit and color picker button
// This to invoke the color picker up and down
function paletteShowPicker() {
	const colorPickerBtn = this.parentElement.children[1];
	// When the edit button is clicked then the color picker div will slide up
	colorPickerBtn.classList.add('active');
	// And if the color picker div has slided up then edit button will slide down
	if (colorPickerBtn.classList.contains('active')) {
		this.classList.remove('active');
	}
}

function removePaletteShowPicker() {
	const colorPickerElement = this.parentElement;
	// Checking if the div of the color picker has active class
	if (colorPickerElement.classList.contains('active')) {
		colorPickerElement.classList.remove('active');
	}
}

// Responsible for the edit button to slide up and down
function editBtnSlideUp() {
	const editButton = this.children[0];
	const colorPickerBtn = this.children[1];
	// If the div of the color picker doesn't have active class then the edit button will slide up
	if (!colorPickerBtn.classList.contains('active')) {
		editButton.classList.add('active');
	}
}

function editBtnslideDown() {
	// Will slide down when not hovered over
	const editButton = this.children[0];
	editButton.classList.remove('active');
}

// *********************************Local storgae stuff
const saveContainer = document.querySelector('.save-container');
const saveBtn = document.querySelector('#save');
const submitSave = document.querySelector('.submit-save');
const saveInput = document.querySelector('.save-container input');
const closeSave = document.querySelector('.close-save');
// Library
const libraryContainer = document.querySelector('.library-container');
const libraryBtn = document.querySelector('.view-palette');
const closeLibraryBtn = document.querySelector('.close-library');

// Event Listeners
saveBtn.addEventListener('click', openSavePalette);
closeSave.addEventListener('click', closeSavePalette);
submitSave.addEventListener('click', savePalette);

libraryBtn.addEventListener('click', openLibraryPalette);
closeLibraryBtn.addEventListener('click', closeLibraryPalette);

// Functions

// Save the palette
function savePalette() {
	closeSavePalette();
	let localPalettes;
	if (localStorage.getItem('palettes') === null) {
		localPalettes = [];
	} else {
		localPalettes = JSON.parse(localStorage.getItem('palettes'));
	}
	const name = saveInput.value;
	let paletteNr;
	if (localPalettes.length > 0) {
		paletteNr = localPalettes.length;
	} else {
		paletteNr = 0;
	}
	// Information the current color palette is saved to an object
	const paletteObject = { name, inputColors, nr: paletteNr };
	localPalettes.push(paletteObject);
	localStorage.setItem('palettes', JSON.stringify(localPalettes));
	saveInput.value = '';

	// Generating palette for Library
	const palette = document.createElement('div');
	palette.classList.add('custom-palette');
	const title = document.createElement('h4');
	title.innerText = paletteObject.name;
	const preview = document.createElement('div');
	preview.classList.add('small-preview');
	paletteObject.inputColors.forEach((smallColor) => {
		const smallDiv = document.createElement('div');
		smallDiv.style.background = `linear-gradient(to right, ${smallColor[0]}, ${smallColor[1]})`;
		smallDiv.style.borderRight = '1px solid';
		preview.appendChild(smallDiv);
	});
	const paletteBtn = document.createElement('button');
	paletteBtn.classList.add('pick-palette-btn');
	paletteBtn.classList.add(paletteObject.nr);
	paletteBtn.innerText = 'Select';

	// Adding event listener to select button to selct from library
	paletteBtn.addEventListener('click', function(e) {
		let localPalettes = JSON.parse(localStorage.getItem('palettes'));

		// We get the corresponding object from the array which match the class number of the button
		const chosenPalette = localPalettes[e.target.classList[1]];
		inputColors = [];
		palettes.forEach((palette, index) => {
			inputColors.push([ chosenPalette.inputColors[index][0], chosenPalette.inputColors[index][1] ]);
			palette.style.background = `linear-gradient(to right, 
				${chosenPalette.inputColors[index][0]}, 
				${chosenPalette.inputColors[index][1]})`;

			// Changing the text
			gradientText[index].innerText = `linear-gradient(to right, ${chosenPalette.inputColors[
				index
			][0]}, ${chosenPalette.inputColors[index][1]})`;
			// Setting the value of color input to the colors
			const colorInput1 = palette.children[1].children[1];
			const colorInput2 = palette.children[1].children[2];
			colorInput1.value = chosenPalette.inputColors[index][0];
			colorInput2.value = chosenPalette.inputColors[index][1];
		});
		closeLibraryPalette();
	});

	// Append to library
	palette.appendChild(title);
	palette.appendChild(preview);
	palette.appendChild(paletteBtn);
	libraryContainer.children[0].appendChild(palette);
}

// Getting the local saved palettes
function getLocal() {
	let localPalettes;
	if (localStorage.getItem('palettes') === null) {
		localPalettes = [];
	} else {
		const paletteObj = JSON.parse(localStorage.getItem('palettes'));
		paletteObj.forEach((paletteObject) => {
			// Generating palette for Library
			const palette = document.createElement('div');
			palette.classList.add('custom-palette');
			const title = document.createElement('h4');
			title.innerText = paletteObject.name;
			const preview = document.createElement('div');
			preview.classList.add('small-preview');
			paletteObject.inputColors.forEach((smallColor) => {
				const smallDiv = document.createElement('div');
				smallDiv.style.background = `linear-gradient(to right, ${smallColor[0]}, ${smallColor[1]})`;
				smallDiv.style.borderRight = '1px solid';
				preview.appendChild(smallDiv);
			});
			const paletteBtn = document.createElement('button');
			paletteBtn.classList.add('pick-palette-btn');
			paletteBtn.classList.add(paletteObject.nr);
			paletteBtn.innerText = 'Select';
			// Adding event listener to select button to selct from library
			paletteBtn.addEventListener('click', function(e) {
				let localPalettes = JSON.parse(localStorage.getItem('palettes'));

				// We get the corresponding object from the array which match the class number of the button
				const chosenPalette = localPalettes[e.target.classList[1]];
				inputColors = [];
				palettes.forEach((palette, index) => {
					inputColors.push([ chosenPalette.inputColors[index][0], chosenPalette.inputColors[index][1] ]);
					palette.style.background = `linear-gradient(to right, 
				${chosenPalette.inputColors[index][0]}, 
				${chosenPalette.inputColors[index][1]})`;

					// Changing the text
					gradientText[index].innerText = `linear-gradient(to right, ${chosenPalette.inputColors[
						index
					][0]}, ${chosenPalette.inputColors[index][1]})`;
					// Setting the value of color input to the colors
					const colorInput1 = palette.children[1].children[1];
					const colorInput2 = palette.children[1].children[2];
					colorInput1.value = chosenPalette.inputColors[index][0];
					colorInput2.value = chosenPalette.inputColors[index][1];
				});
				closeLibraryPalette();
			});

			// Append to library
			palette.appendChild(title);
			palette.appendChild(preview);
			palette.appendChild(paletteBtn);
			libraryContainer.children[0].appendChild(palette);
		});
	}
}

// For opening library block
function openLibraryPalette() {
	const popup = libraryContainer.children[0];
	libraryContainer.classList.add('active');
	popup.classList.add('active');
}
function closeLibraryPalette() {
	const popup = libraryContainer.children[0];
	libraryContainer.classList.remove('active');
	popup.classList.remove('active');
}

// For opening save block
function openSavePalette() {
	const popup = saveContainer.children[0];
	saveContainer.classList.add('active');
	popup.classList.add('active');
}
function closeSavePalette() {
	const popup = saveContainer.children[0];
	saveContainer.classList.remove('active');
	popup.classList.remove('active');
}

getLocal();
insertRandomColors();
