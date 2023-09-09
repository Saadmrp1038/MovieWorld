import { writable } from "svelte/store";

export const userProfile = writable({isLoggedIn: false, username: ''})