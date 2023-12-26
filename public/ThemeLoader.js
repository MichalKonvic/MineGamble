(function() {
    const theme = localStorage.getItem('theme');
    const getSystemTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    if(theme === "system") {
        const isSystemDark = getSystemTheme() === "dark";
        document.documentElement.classList.toggle("dark", isSystemDark);
    }else{
        document.documentElement.classList.toggle("dark", theme === "dark");
    }
})();