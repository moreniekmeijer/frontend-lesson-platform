function normalizeUrl(url) {
    if (!url) return url;
    if (!/^https?:\/\//i.test(url)) {
        return `https://${url}`;
    }
    return url;
}

export default normalizeUrl;