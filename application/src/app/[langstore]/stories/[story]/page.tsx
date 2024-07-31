import { headers } from 'next/headers';
import { getContext } from '~/use-cases/http/utils';
import dataFetcherForShapePage from '~/use-cases/dataFetcherForShapePage.server';
import AbstractStory from '~/ui/pages/AbstractStory';
import { CuratedStory as CuratedStoryType, Story as StoryType } from '~/use-cases/contracts/Story';
import { getStoreFront } from '~/use-cases/storefront.server';
import { CrystallizeAPI } from '~/use-cases/crystallize/read';

async function getData({
    params,
}: {
    params: {
        [x: string]: any;
    };
}) {
    const requestContext = getContext({
        url: `${process.env.APP_URL}/en/stories/${params.story}`,
        headers: headers(),
    });
    const path = `/stories/${params.story}`;

    const data = await dataFetcherForShapePage('abstract-story', path, requestContext, params, []);

    return data;
}

export async function generateMetadata({ params }: { params: { story: string } }) {
    const requestContext = getContext({
        url: `${process.env.APP_URL}/en/stories/${params.story}`,
        headers: headers(),
    });

    const path = `/stories/${params.story}`;
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

    return <AbstractStory data={data as CuratedStoryType | StoryType} />;
};
