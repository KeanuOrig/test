export const isValidUrl = (url: string) => {
    const regex = /^(https?:\/\/)?([a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)(\/[^\s]*)?$/;
    return regex.test(url);
};