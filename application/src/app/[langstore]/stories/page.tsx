import { headers } from 'next/headers';
import Stories from '~/ui/pages/Stories';
import { CrystallizeAPI } from '~/use-cases/crystallize/read';
import { getContext } from '~/use-cases/http/utils';
import { getStoreFront } from '~/use-cases/storefront.server';
import { CategoryWithChildren } from '~/use-cases/contracts/Category';

async function getData() {
    const requestContext = getContext({
        url: `${process.env.APP_URL}/en/stories`,
        headers: headers(),
    });

    const path = `/stories`;
    const { secret } = await getStoreFront(requestContext.host);
    const api = CrystallizeAPI({
        apiClient: secret.apiClient,
        language: requestContext.language,
    });

    const folder = await api.fetchFolderWithChildren(path, []);

    return folder;
}

export async function generateMetadata() {
    const requestContext = getContext({
        url: `${process.env.APP_URL}/en/stories`,
        headers: headers(),
    });

    const path = `/stories`;
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

export default async () => {
    const folder = await getData();

    return <Stories folder={folder as CategoryWithChildren} />;
};
