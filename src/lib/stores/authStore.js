import { writable } from 'svelte/store';

export const isLoggedIn = writable(false); // Initially set to false (user is logged out)