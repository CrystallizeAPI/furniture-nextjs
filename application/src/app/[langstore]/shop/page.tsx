import { headers } from 'next/headers';
import { isValidLanguageMarket } from '~/use-cases/LanguageAndMarket';
import { CrystallizeAPI } from '~/use-cases/crystallize/read';
import { getContext } from '~/use-cases/http/utils';
import { getStoreFront } from '~/use-cases/storefront.server';
import ShopPage from '~/ui/pages/Shop';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

async function getData({ params }: { params: { shop: string; langstore: string } }) {
    const requestContext = getContext({
        url: `${process.env.APP_URL}/${params.langstore}/shop`,
        headers: headers(),
    });
    if (!isValidLanguageMarket(requestContext.language, requestContext.market)) {
        // HOW?
    }
    const path = `/shop`;
    const { secret } = await getStoreFront(requestContext.host);
    const api = CrystallizeAPI({
        apiClient: secret.apiClient,
        language: requestContext.language,
    });

    const data = await api.fetchShop(path, []);

    return data;
}

export async function generateMetadata() {
    const requestContext = getContext({
        url: `${process.env.APP_URL}/en`,
        headers: headers(),
    });

    const path = `/shop`;
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

export default async ({ params }: { params: { shop: string; langstore: string } }) => {
    const data = await getData({ params });
    return <ShopPage shop={data} />;
};
