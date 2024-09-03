import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { IconButton, useColorModeValue } from "@chakra-ui/react";
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
  isEnabled as isDarkReaderEnabled,
} from "darkreader";

const DarkModeButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const SwitchIcon = isDarkMode ? FaSun : FaMoon;

  useEffect(() => {
    // Check if Dark Reader is enabled
    const isEnabled = isDarkReaderEnabled();
    setIsDarkMode(isEnabled);
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      disableDarkMode();
    } else {
      enableDarkMode({
        brightness: 65,
        contrast: 140,
        sepia: 35,
      });
    }
    setIsDarkMode(!isDarkMode);
  };

  const iconColor = useColorModeValue("gray.600", "yellow.500");

  return (
    <IconButton
      variant="unstyled" // Remove button styles
      onClick={toggleDarkMode}
      icon={<SwitchIcon color={iconColor} size={20} />} // Adjust size as needed
    />
  );
};

export default DarkModeButton;
