import Checkout from '~/ui/pages/Checkout';
import '@adyen/adyen-web/dist/adyen.css';

export default () => {
    return <Checkout isServerSideAuthenticated={true} />;
};
