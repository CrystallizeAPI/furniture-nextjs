import { NextResponse } from 'next/server';
import fetchPickupPoints from '~/use-cases/payments/montonio/fetchPickupPoints';
import { storage } from '~/use-cases/services.server';

export async function GET(request: Request, params: { provider: string }) {
    //@ts-expect-error
    if (params.params.provider !== 'montonio') {
        return NextResponse.json({ error: 'Provider not supported' }, { status: 400 });
    }
    const cached = await storage.get('montonio-pickup-points');
    if (cached) {
        return NextResponse.json(JSON.parse(cached));
    }
    const points = await fetchPickupPoints();
    // AS per documentation we are going to cache this for 24 hours
    storage.set('montonio-pickup-points', JSON.stringify(points), 86400);
    return NextResponse.json(points);
}
