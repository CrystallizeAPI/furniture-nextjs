export const dynamic = 'force-dynamic';

import { cookies } from 'next/headers';
import { isAuthenticated } from '~/core/authentication.server';
import Orders from '~/ui/pages/Orders';

async function getData() {
    const authCookie = cookies().get('authentication');

    const isUserAuthenticated = await isAuthenticated(authCookie);
    return { isUserAuthenticated };
}

export default async () => {
    const { isUserAuthenticated } = await getData();
    return <Orders isServerSideAuthenticated={isUserAuthenticated} />;
};
