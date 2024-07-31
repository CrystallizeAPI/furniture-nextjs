import { headers } from 'next/headers';
import Product from '~/ui/pages/Product';
import { Product as TProduct } from '~/use-cases/contracts/Product';
import { CrystallizeAPI } from '~/use-cases/crystallize/read';
import dataFetcherForShapePage from '~/use-cases/dataFetcherForShapePage.server';
import { getContext } from '~/use-cases/http/utils';
import { getStoreFront } from '~/use-cases/storefront.server';

type ProductData = {
    product: TProduct;
    preSelectedSku: string;
};

async function getData({
    params,
}: {
    params: {
        [x: string]: any;
    };
}) {
    const requestContext = getContext({
        url: `${process.env.APP_URL}/en/shop/${params.folder}/${params.product}`,
        headers: headers(),
    });
    const path = `/shop/${params.folder}/${params.product}`;
    const data = await dataFetcherForShapePage('product', path, requestContext, params, []);
    return data;
}

export async function generateMetadata({ params }: { params: { [x: string]: any } }) {
    const requestContext = getContext({
        url: `${process.env.APP_URL}/en`,
        headers: headers(),
    });

    const path = `/shop/${params.folder}/${params.product}`;
    const { secret } = await getStoreFront(requestContext.host);
    const api = CrystallizeAPI({
        apiClient: secret.apiClient,
        language: requestContext.language,
    });
    const metadata = await api.fetchMetadata(path);
    return {
        title: metadata?.title,
        openGraph: {
            title: metadata?.title,
            description: metadata?.description,
            images: [metadata?.image],
        },
    };
}

export default async ({ params }: { params: { slug: string } }) => {
    const data = await getData({ params });

    return <Product data={data as ProductData} />;
};
