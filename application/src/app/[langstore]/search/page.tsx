import { headers } from 'next/headers';
import Search from '~/ui/pages/Search';
import { CrystallizeAPI } from '~/use-cases/crystallize/read';
import { getContext } from '~/use-cases/http/utils';
import { getStoreFront } from '~/use-cases/storefront.server';

async function getData({ searchParams }: { searchParams: { q: string } }) {
    const requestContext = getContext({
        url: `${process.env.APP_URL}/en/search`,
        headers: headers(),
    });
    const { secret } = await getStoreFront(requestContext.host);
    const param = searchParams.q;
    const api = CrystallizeAPI({
        apiClient: secret.apiClient,
        language: requestContext.language,
    });
    let data = await api.search(param ? param : '');
    return data;
}

export default async function Page({ searchParams }: { searchParams: { q: string } }) {
    const data = await getData({ searchParams });
    return <Search products={data} />;
}
