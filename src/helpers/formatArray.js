export function formatArray(array) {
    if (!array) return;

    if (Array.isArray(array)) {
        return array.sort().join(", ");
    }

    return array;
}
