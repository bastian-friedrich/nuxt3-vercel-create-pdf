const chromeExecutables = {
	linux: '/usr/bin/chromium-browser',
	win32: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
	darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
}

export const getChromeOptions = async (chrome:any) => {
    if (process.env.VERCEL) {
        return {
            args: chrome.args,
            executablePath: await chrome.executablePath,
            headless: chrome.headless
        };
    }

    return {
        args: [],
        executablePath: chromeExecutables[process.platform] || chromeExecutables.linux,
        headless: true
    }
};
