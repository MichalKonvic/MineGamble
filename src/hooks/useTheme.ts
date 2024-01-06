/*
    Author: Michal Konvičný
    About: Custom hook for dark mode
           uses document classlist to enable/disable dark mode
           ideal solution for TailwindCSS which uses classlist for dark mode
    More: https://tailwindcss.com/docs/dark-mode#supporting-system-preference-and-manual-selection
 */




"use client";
import { useCallback, useEffect, useState } from "react";
type Theme = "light" | "dark" | "system";
const themes = ["light", "dark", "system"];
const useTheme = (useSystem?:boolean,rememberPref:boolean=false) => {
    const getSystemTheme = useCallback(():Theme => window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",[]);
    useEffect(() => {
        try {
            if (rememberPref) {
                const savedTheme = localStorage.getItem("theme");
                if (themes.includes(savedTheme as string)) {
                    setTheme(savedTheme as Theme);
                    return;
                }
            }
            if(useSystem) {
                setTheme(getSystemTheme());
                return;
            }
            const isDarkDOM = document.documentElement.classList.contains("dark");
            setTheme(isDarkDOM ? "dark" : "light");
        } catch (error) {
            setTheme("light");
        }
    }, [useSystem,rememberPref,getSystemTheme])
    const [theme, setTheme] = useState<Theme>("light");
    useEffect(() => {
        
        if(theme === "system") {
            const isSystemDark = getSystemTheme() === "dark";
            document.documentElement.classList.toggle("dark", isSystemDark);
        }else{
            document.documentElement.classList.toggle("dark", theme === "dark");
        }
        if(rememberPref){
            localStorage.setItem("theme", theme);
        }

        localStorage.setItem("theme", theme);
    }, [theme,rememberPref,getSystemTheme]);

    return {
        theme,
        setTheme,
    };
};
export default useTheme;