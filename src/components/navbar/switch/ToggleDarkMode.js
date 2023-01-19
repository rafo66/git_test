var json = require('../../../assets/colors/theme-orange.json');

const ToggleDarkMode = ({ state }) => {
    console.log('on passe a l\'état ' + state + '.')
    if (state === true) {
        //light mode colors
        document.documentElement.style.setProperty('--background', json.DarkMode[0].background);
        document.documentElement.style.setProperty('--headline', json.DarkMode[0].headline);
        document.documentElement.style.setProperty('--paragraph', json.DarkMode[0].paragraph);
        document.documentElement.style.setProperty('--button', json.DarkMode[0].button);
        document.documentElement.style.setProperty('--button-text', json.DarkMode[0]['button-text']);
        document.documentElement.style.setProperty('--button-text-hover', json.DarkMode[0]['button-text-hover']);
        document.documentElement.style.setProperty('--stroke', json.DarkMode[0].stroke);
        document.documentElement.style.setProperty('--main', json.DarkMode[0].main);
        document.documentElement.style.setProperty('--highlight', json.DarkMode[0].highlight);
        document.documentElement.style.setProperty('--secondary', json.DarkMode[0].secondary);
        document.documentElement.style.setProperty('--tertiary', json.DarkMode[0].tertiary);
    } else {
        //dark mode colors
        document.documentElement.style.setProperty('--background', json.LightMode[0].background);
        document.documentElement.style.setProperty('--headline', json.LightMode[0].headline);
        document.documentElement.style.setProperty('--paragraph', json.LightMode[0].paragraph);
        document.documentElement.style.setProperty('--button', json.LightMode[0].button);
        document.documentElement.style.setProperty('--button-text', json.LightMode[0]['button-text']);
        document.documentElement.style.setProperty('--button-text-hover', json.LightMode[0]['button-text-hover']);
        document.documentElement.style.setProperty('--stroke', json.LightMode[0].stroke);
        document.documentElement.style.setProperty('--main', json.LightMode[0].main);
        document.documentElement.style.setProperty('--highlight', json.LightMode[0].highlight);
        document.documentElement.style.setProperty('--secondary', json.LightMode[0].secondary);
        document.documentElement.style.setProperty('--tertiary', json.LightMode[0].tertiary);
    }
}

export default ToggleDarkMode;