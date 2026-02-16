/**
 * Checks if the current device is running iOS (iPhone, iPad, or iPod).
 * Accounts for newer iPads that identify as Macintosh.
 */
export const isIOS = () => {
    return (
        ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) ||
        // Check for iPad on iOS 13+ which identifies as Macintosh
        (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
};

/**
 * Checks if the current device is running Android.
 */
export const isAndroid = () => {
    return /android/i.test(navigator.userAgent || navigator.vendor || window.opera);
};
