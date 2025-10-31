export function formatRole(role) {
    switch (role) {
        case 'ROLE_ADMIN':
            return 'Admin';
        case 'ROLE_GUEST':
            return 'Gast';
        case 'ROLE_GROUP_1':
            return 'Groep 1';
        case 'ROLE_GROUP_2':
            return 'Groep 2';
        default:
            return role;
    }
}

export function formatRoles(roles) {
    if (roles.includes('ROLE_ADMIN')) {
        return 'Admin';
    }

    const filteredRoles = roles.filter(role => role !== 'ROLE_USER');
    return filteredRoles.map(formatRole).join(", ");
}
