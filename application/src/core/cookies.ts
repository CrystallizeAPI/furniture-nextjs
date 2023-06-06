import { cookies } from 'next/headers';

export const authCookie = cookies().set({
    name: 'authentication',
    value: '',
});
