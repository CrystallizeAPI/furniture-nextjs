import { CrystallizeAPI } from '~/use-cases/crystallize/read';
import { getContext } from '~/use-cases/http/utils';
import {
    buildLanguageMarketAwareLink,
    displayableLanguages,
    isValidLanguageMarket,
} from '~/use-cases/LanguageAndMarket';
import { buildStoreFrontConfiguration, getStoreFront } from '~/use-cases/storefront.server';
import fetchTranslations from '~/use-cases/fetchTranslations.server';
import { memoryStorage, storage } from '~/use-cases/services.server';
import { headers } from 'next/headers';
import { Providers } from '~/bridge/ui/Providers';
import { Header } from '~/ui/components/layout/header';
import { Footer } from '~/ui/components/layout/footer';
import '~/styles/tailwind.css';

async function getData() {
    const requestContext = getContext({
        url: `${process.env.APP_URL}/en`,
        headers: headers(),
    });

    const { shared, secret } = await getStoreFront(requestContext.host);
    const api = CrystallizeAPI({
        apiClient: secret.apiClient,
        language: requestContext.language,
    });

    const [navigation, tenantConfig, translations, footer] = await Promise.all([
        api.fetchNavigation('/'),
        api.fetchTenantConfig(secret.config.tenantIdentifier),
        fetchTranslations(storage, memoryStorage, requestContext.language),
        api.fetchFooter('/footer'),
    ]);
    const apiPath = buildLanguageMarketAwareLink('/api', requestContext.language, requestContext.market);
    const frontConfiguration = buildStoreFrontConfiguration(
        requestContext.locale,
        `${requestContext.baseUrl}${apiPath}`,
        shared.config,
        tenantConfig,
    );

    return {
        isHTTPS: requestContext.isSecure,
        host: requestContext.host,
        frontConfiguration,
        navigation,
        baseUrl: requestContext.baseUrl,
        translations,
        footer,
    };
}

export default async ({ children }: { children: React.ReactNode }) => {
    const { frontConfiguration, translations, baseUrl, navigation, footer } = await getData();
    const path = '/en';

    return (
        <html lang={frontConfiguration.language}>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
                <link href={`${baseUrl}${path}`} rel="canonical" />
                {displayableLanguages.map((lang) => (
                    <link
                        key={lang.code}
                        rel="alternate"
                        hrefLang={lang.code}
                        href={`${baseUrl}${buildLanguageMarketAwareLink(path, lang.code)}`}
                    />
                ))}
                <script suppressHydrationWarning={true} type="text/css">
                    {
                        '*,:after,:before{box-sizing:border-box;border:0 solid}:after,:before{--tw-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}body{margin:0;line-height:inherit}h2{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}figure,h2,p{margin:0}img,svg{display:block;vertical-align:middle}img{max-width:100%;height:auto}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-date-and-time-value{min-height:1.5em}*,:after,:before{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#3b82f680;--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.container{width:100%}@media (max-width:1024px){#grid-item{grid-column:span 3!important}}.absolute{position:absolute}.relative{position:relative}.-right-2{right:-.5rem}.-top-2{top:-.5rem}.z-10{z-index:10}.mx-auto{margin-left:auto;margin-right:auto}.mt-4{margin-top:1rem}.flex{display:flex}.h-80{height:20rem}.h-full{height:100%}.h-5{height:1.25rem}.w-full{width:100%}.w-60{width:15rem}.w-5{width:1.25rem}.flex-col{flex-direction:column}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-between{justify-content:space-between}.justify-evenly{justify-content:space-evenly}.gap-5{gap:1.25rem}.gap-1{gap:.25rem}.self-end{align-self:flex-end}.overflow-hidden{overflow:hidden}.rounded-xl{border-radius:.75rem}.rounded-2xl{border-radius:1rem}.rounded-full{border-radius:1000px}.rounded-r-xl{border-top-right-radius:.75rem;border-bottom-right-radius:.75rem}.bg-primary{--tw-bg-opacity:1;background-color:rgb(255 247 240/var(--tw-bg-opacity))}.bg-background1{--tw-bg-opacity:1;background-color:rgb(240 239 235/var(--tw-bg-opacity))}.bg-grey{background-color:#00000008}.bg-text{--tw-bg-opacity:1;background-color:rgb(55 53 103/var(--tw-bg-opacity))}.p-8{padding:2rem}.p-5{padding:1.25rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-7{padding-top:1.75rem;padding-bottom:1.75rem}.py-20{padding-top:5rem;padding-bottom:5rem}.text-center{text-align:center}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-sm{font-size:.875rem;line-height:1.25rem}.font-bold{font-weight:700}.text-primary{--tw-text-opacity:1;color:rgb(255 247 240/var(--tw-text-opacity))}'
                    }
                </script>
                <script defer src="https://pim.crystallize.com/static/frontend-preview-listener.js" />
            </head>
            <body data-theme={frontConfiguration.theme}>
                <Providers
                    language={frontConfiguration.language}
                    tenantIdentifier={frontConfiguration.crystallize.tenantIdentifier}
                    initialState={frontConfiguration}
                    translations={translations}
                >
                    <Header navigation={navigation} />
                    <div>{children}</div>
                    <Footer footer={footer} />
                </Providers>
            </body>
        </html>
    );
};
