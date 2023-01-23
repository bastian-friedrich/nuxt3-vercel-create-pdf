export const getChromeOptions = async (chrome:any) => {
    if (process.env.VERCEL) {
        return {
            args: chrome.args,
            executablePath: await chrome.executablePath,
            headless: chrome.headless
        };
    }

    return {}
};
