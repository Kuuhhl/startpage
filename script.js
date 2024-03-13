function updateClock() {
	const now = new Date();
	let hours = now.getHours().toString().padStart(2, "0");
	let minutes = now.getMinutes().toString().padStart(2, "0");
	let seconds = now.getSeconds().toString().padStart(2, "0");

	document.getElementById("hours").innerText = hours;
	document.getElementById("minutes").innerText = minutes;

	const currentSecondsElement = document.getElementById("current-seconds");
	const nextSecondsElement = document.getElementById("next-seconds");

	const isCurrentVisible = !currentSecondsElement.classList.contains("fade");
	const nextValue = seconds;

	if (isCurrentVisible) {
		nextSecondsElement.innerText = nextValue;
		currentSecondsElement.classList.add("fade");
		nextSecondsElement.classList.remove("fade");
	} else {
		currentSecondsElement.innerText = nextValue;
		nextSecondsElement.classList.add("fade");
		currentSecondsElement.classList.remove("fade");
	}
}

updateClock();
setInterval(updateClock, 1000);

// Fetch and apply background settings from the config file
function loadConfigAndSetBackground() {
	fetch("config.json") // Assuming 'config.json' is in the same directory and accessible via the server
		.then((response) => response.json())
		.then((config) => {
			const { backgroundFile, backgroundColor } = config;
			setBackground(backgroundFile, backgroundColor);
		})
		.catch((error) =>
			console.error("Failed to load background configuration:", error)
		);
}

function setBackground(backgroundFile, backgroundColor) {
	const basename = backgroundFile.split("/").pop();
	let backgroundElement = document.body;

	if (basename.startsWith("nr")) {
		// For non-resizing, adjust CSS directly
		backgroundElement.style.background = `${backgroundColor} url('${backgroundFile}') no-repeat center center`;
		backgroundElement.style.backgroundSize = "contain"; // Use "contain" to ensure the image is fully visible
	} else {
		// For resizing, fill the background
		backgroundElement.style.background = `url('${backgroundFile}') no-repeat center center fixed`;
		backgroundElement.style.backgroundSize = "cover"; // Cover the entire page
	}
}

document.addEventListener("DOMContentLoaded", loadConfigAndSetBackground);
