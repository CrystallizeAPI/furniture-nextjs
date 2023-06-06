import { NextResponse } from 'next/server';
import { cartWrapperRepository } from '~/use-cases/services.server';

export async function GET(request: Request, params: { id: string }) {
    //@ts-expect-error
    const cartWrapper = await cartWrapperRepository.find(params.params.id!);

    if (!cartWrapper) {
        throw {
            message: `Cart '${params.id!}' does not exist.`,
            status: 404,
        };
    }
    return NextResponse.json(cartWrapper);
}
