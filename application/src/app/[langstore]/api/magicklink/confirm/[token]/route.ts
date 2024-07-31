import { getContext } from '~/use-cases/http/utils';
import handleMagickLink from '~/use-cases/user/handleMagickLink';

import { serialize } from 'cookie';

export async function GET(request: Request, { params }: { params: { token: string } }) {
    const requestContext = getContext(request);

    const { redirectUrl, cookie } = await handleMagickLink(
        requestContext.baseUrl,
        requestContext,

        params.token,
    );

    return new Response(null, {
        status: 302,
        headers: {
            Location: redirectUrl,
            'Set-Cookie': serialize('authentication', JSON.stringify(cookie), {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 604_800,
            }),
        },
    });
}
