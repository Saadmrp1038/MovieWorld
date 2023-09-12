import { persisted } from 'svelte-local-storage-store';

export const userProfile = persisted('userProfile',{isLoggedIn: false, username: ''})
export const userAvatar = persisted('userAvatar',{url: ''})