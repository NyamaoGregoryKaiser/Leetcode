```javascript
/**
 * src/utils/logger.js
 * A simple console logger utility for consistent output.
 */

class Logger {
    /**
     * Logs a success message.
     * @param {string} message - The message to log.
     */
    static success(message) {
        console.log(`\x1b[32m✔ ${message}\x1b[0m`); // Green color
    }

    /**
     * Logs an info message.
     * @param {string} message - The message to log.
     */
    static info(message) {
        console.log(`\x1b[34mℹ ${message}\x1b[0m`); // Blue color
    }

    /**
     * Logs a warning message.
     * @param {string} message - The message to log.
     */
    static warn(message) {
        console.warn(`\x1b[33m⚠ ${message}\x1b[0m`); // Yellow color
    }

    /**
     * Logs an error message.
     * @param {string} message - The message to log.
     * @param {Error} [error] - Optional error object to log stack trace.
     */
    static error(message, error = null) {
        console.error(`\x1b[31m✖ ${message}\x1b[0m`); // Red color
        if (error) {
            console.error(error.stack);
        }
    }

    /**
     * Logs a plain message without special styling.
     * @param {string} message - The message to log.
     */
    static log(message) {
        console.log(message);
    }

    /**
     * Logs a section header.
     * @param {string} title - The title of the section.
     */
    static section(title) {
        console.log(`\n\x1b[1m--- ${title} ---\x1b[0m`); // Bold
    }

    /**
     * Logs a subsection header.
     * @param {string} title - The title of the subsection.
     */
    static subSection(title) {
        console.log(`\n\x1b[4m--- ${title} ---\x1b[0m`); // Underline
    }
}

module.exports = Logger;
```