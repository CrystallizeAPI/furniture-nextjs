import Checkout from '~/ui/pages/Checkout';
import '@adyen/adyen-web/dist/adyen.css';
export const dynamic = 'force-dynamic';

export default () => {
    return <Checkout isServerSideAuthenticated={true} />;
};
