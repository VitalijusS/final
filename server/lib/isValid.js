export function isValidUserName(text) {
    const minLength = 3;
    const maxLength = 20;
    if (typeof text !== 'string') {
        return 'UserName needs to be text';
    }
    if (text.length < minLength) {
        return `Username is too short(min${minLength})`;
    }
    if (text.length > maxLength) {
        return `Username is too long(max${maxLength})`;
    }
    return '';
}

export function isValidPassword(text) {
    const minLength = 3;
    const maxLength = 100;
    if (typeof text !== 'string') {
        return 'Pasword needs to be text';
    }
    if (text.length < minLength) {
        return `Pasword is too short(min${minLength})`;
    }
    if (text.length > maxLength) {
        return `Pasword is too long(max${maxLength})`;
    }
    return '';
}

export function isNonEmptyString(text) {
    return typeof text === 'string' && text.trim().length > 0;
}