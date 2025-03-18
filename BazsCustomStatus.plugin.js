/**
 * @name BazsCustomStatus
 * @author YourName
 * @version 1.0.0
 * @description A custom animated status plugin for BetterDiscord with settings to change the status text.
 * @source https://github.com/your-repo
 */

const config = {
    info: {
        name: "BazsCustomStatus",
        author: "YourName",
        version: "1.0.0",
        description: "A custom animated status plugin for BetterDiscord with settings to change the status text.",
    },
    defaultConfig: [
        {
            type: "text",
            id: "statusText",
            name: "Status Text",
            value: "Custom Status",
            placeholder: "Enter your custom status here...",
        },
        {
            type: "number",
            id: "animationSpeed",
            name: "Animation Speed (ms)",
            value: 500,
            placeholder: "Enter animation speed in milliseconds...",
        },
    ],
};

module.exports = class BazsCustomStatus {
    constructor() {
        this.interval = null;
        this.statusText = "Custom Status";
        this.animationSpeed = 500;
    }

    getName() {
        return config.info.name;
    }

    getDescription() {
        return config.info.description;
    }

    getVersion() {
        return config.info.version;
    }

    getAuthor() {
        return config.info.author;
    }

    start() {
        this.loadSettings();
        this.startAnimation();
    }

    stop() {
        this.stopAnimation();
    }

    loadSettings() {
        this.settings = BdApi.loadData(config.info.name, "settings") || {};
        this.statusText = this.settings.statusText || config.defaultConfig.find(c => c.id === "statusText").value;
        this.animationSpeed = this.settings.animationSpeed || config.defaultConfig.find(c => c.id === "animationSpeed").value;
    }

    saveSettings() {
        BdApi.saveData(config.info.name, "settings", this.settings);
    }

    getSettingsPanel() {
        const panel = document.createElement("div");

        config.defaultConfig.forEach(setting => {
            const container = document.createElement("div");
            container.style.marginBottom = "10px";

            const label = document.createElement("label");
            label.innerText = setting.name;
            label.style.display = "block";
            label.style.marginBottom = "5px";

            const input = document.createElement("input");
            input.type = setting.type;
            input.value = this.settings[setting.id] || setting.value;
            input.placeholder = setting.placeholder;
            input.style.width = "100%";
            input.style.padding = "5px";

            input.addEventListener("change", (e) => {
                this.settings[setting.id] = e.target.value;
                this.saveSettings();

                if (setting.id === "statusText") {
                    this.statusText = e.target.value;
                } else if (setting.id === "animationSpeed") {
                    this.animationSpeed = parseInt(e.target.value);
                    this.restartAnimation();
                }
            });

            container.appendChild(label);
            container.appendChild(input);
            panel.appendChild(container);
        });

        return panel;
    }

    startAnimation() {
        this.stopAnimation();

        let index = 0;
        this.interval = setInterval(() => {
            const status = this.statusText.split("");
            const animatedStatus = status.slice(index).concat(status.slice(0, index)).join("");
            BdApi.findModuleByProps("setCustomStatus").setCustomStatus(animatedStatus);
            index = (index + 1) % status.length;
        }, this.animationSpeed);
    }

    stopAnimation() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        BdApi.findModuleByProps("setCustomStatus").setCustomStatus("");
    }

    restartAnimation() {
        this.stopAnimation();
        this.startAnimation();
    }
};