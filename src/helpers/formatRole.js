export function formatRole(role) {
    switch (role) {
        case 'ROLE_ADMIN':
            return 'Admin';
        case 'ROLE_USER':
            return 'Gebruiker';
        default:
            return role;
    }
}

export function formatRoles(roles) {
    const uniqueRoles = roles.includes('ROLE_ADMIN')
        ? roles.filter(role => role !== 'ROLE_USER')
        : roles;

    return uniqueRoles.map(formatRole).join(", ");
}
