export function getOrCreateUUID(): string {
    const existing = localStorage.getItem('user_uuid');
    if (existing) return existing

    const newUUID = crypto.randomUUID();
    localStorage.setItem('user_uuid', newUUID);
    return newUUID;
}