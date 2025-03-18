/**
 * @name BazsStereo
 * @author YourName
 * @version 1.0.0
 * @description A simple stereo plugin for BetterDiscord to control audio playback.
 * @source https://github.com/your-repo
 */

module.exports = class BazsStereo {
    constructor() {
        this.initialized = false;
    }

    getName() {
        return "Bazs Stereo";
    }

    getDescription() {
        return "A simple stereo plugin for BetterDiscord to control audio playback.";
    }

    getVersion() {
        return "1.0.0";
    }

    getAuthor() {
        return "YourName";
    }

    start() {
        this.initialize();
    }

    stop() {
        this.destroy();
    }

    initialize() {
        if (this.initialized) return;
        this.initialized = true;

        // Add a button to the Discord UI
        this.addStereoButton();
    }

    destroy() {
        if (!this.initialized) return;
        this.initialized = false;

        // Remove the button from the Discord UI
        this.removeStereoButton();
    }

    addStereoButton() {
        // Create a button element
        this.stereoButton = document.createElement("button");
        this.stereoButton.innerText = "🎵 Bazs Stereo";
        this.stereoButton.style.position = "fixed";
        this.stereoButton.style.bottom = "20px";
        this.stereoButton.style.right = "20px";
        this.stereoButton.style.zIndex = "1000";
        this.stereoButton.style.padding = "10px";
        this.stereoButton.style.backgroundColor = "#7289DA";
        this.stereoButton.style.color = "#FFFFFF";
        this.stereoButton.style.border = "none";
        this.stereoButton.style.borderRadius = "5px";
        this.stereoButton.style.cursor = "pointer";

        // Add event listener to the button
        this.stereoButton.addEventListener("click", () => {
            this.toggleAudio();
        });

        // Append the button to the body
        document.body.appendChild(this.stereoButton);
    }

    removeStereoButton() {
        if (this.stereoButton) {
            this.stereoButton.remove();
            this.stereoButton = null;
        }
    }

    toggleAudio() {
        const audioElements = document.querySelectorAll("audio, video");

        audioElements.forEach((audio) => {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        });

        BdApi.UI.showToast("Toggled audio playback!", { type: "info" });
    }
};