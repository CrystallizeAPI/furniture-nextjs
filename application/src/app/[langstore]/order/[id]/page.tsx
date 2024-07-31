import { headers } from 'next/headers';
import Order from '~/ui/pages/Order';
import { getContext } from '~/use-cases/http/utils';

async function getData({ params, searchParams }: { params: { id: string }; searchParams: string }) {
    const requestContext = getContext({
        url: `${process.env.APP_URL}/en/order/${params.id}`,
        headers: headers(),
    });

    let cartId = requestContext.url.searchParams.get('cartId') || '';

    return { orderId: params.id, cartId };
}

export default async function Page({ params }: { params: { id: string } }, searchParams: string) {
    const { orderId, cartId } = await getData({ params, searchParams });

    return <Order cartId={cartId} id={orderId} />;
}
