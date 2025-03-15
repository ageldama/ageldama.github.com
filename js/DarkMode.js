

var DarkMode = {
    togglerPath: '.dark-mode-toggle',
    labelDark: '🌒',
    labelLight: '☀️',
    storagePath: 'dark-mode',
    cssTarget: 'body',
    cssClass: 'dark',
};

window.DarkMode = DarkMode; // browser only.

DarkMode.Storage = {
    read: function(defaultVal) {
        return localStorage.getItem(DarkMode.storagePath) || defaultVal;
    },

    write: function(newMode) {
        localStorage.setItem(DarkMode.storagePath, newMode);
    },
};

DarkMode.setDark = function(darkMode) {
    DarkMode.Storage.write(darkMode);

    var $el = $(DarkMode.cssTarget);
    var $toggler = $(DarkMode.togglerPath);
    
    if (darkMode === 'dark') {
        $el.addClass(DarkMode.cssClass);
        $toggler.text(DarkMode.labelDark);
    } else {
        $el.removeClass(DarkMode.cssClass);
        $toggler.text(DarkMode.labelLight);
    }
};

DarkMode._invertMode = function(mode) {
    return mode === 'dark' ? 'light' : 'dark';
};

DarkMode.toggle = function() {
    var curMode = DarkMode.Storage.read('dark');
    var newMode = DarkMode._invertMode(curMode);
    // console.log(curMode, newMode);
    DarkMode.setDark(newMode);
};

DarkMode.init = function() {
    var curMode = DarkMode.Storage.read('dark'); // default = dark.
    DarkMode.setDark(curMode);
};
