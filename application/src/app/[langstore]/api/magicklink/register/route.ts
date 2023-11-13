import { NextResponse } from 'next/server';
import { getContext } from '~/use-cases/http/utils';
import { createMailer } from '~/use-cases/services.server';
import { getStoreFront } from '~/use-cases/storefront.server';
import sendMagickLink from '~/use-cases/user/sendMagickLink';

export async function POST(request: Request) {
    //auth needs to be implemented

    return NextResponse.json({
        message: 'Auth needs to be implemented',
    });
}
