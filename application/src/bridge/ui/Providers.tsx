'use client';
import { CrystallizeProvider } from '@crystallize/reactjs-hooks';
import { AppContextProvider } from '~/ui/app-context/provider';

export function Providers({ language, tenantIdentifier, translations, initialState, children }: any) {
    return (
        <CrystallizeProvider language={language} tenantIdentifier={tenantIdentifier}>
            <AppContextProvider initialState={initialState} translations={translations}>
                {children}
            </AppContextProvider>
        </CrystallizeProvider>
    );
}
