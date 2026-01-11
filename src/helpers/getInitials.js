function getInitials(fullName) {
    if (!fullName) return '';

    const nameParts = fullName.trim().split(' ');
    if (nameParts.length === 1) {
        return nameParts[0].substring(0, 2).toUpperCase();
    }

    return nameParts
        .slice(0, 2)
        .map(part => part[0].toUpperCase())
        .join('');
}

export default getInitials;