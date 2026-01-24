export function normalizeInstruments(input) {
    if (!input) return [];

    return input
        .split(",")
        .map(i => i.trim())
        .filter(Boolean)
        .map(i =>
            i.split(" ")
                .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                .join(" ")
        );
}
