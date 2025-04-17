import type { IStaticMethods } from 'flyonui/flyonui';

declare global {
    interface Window {
        _;
        HSStaticMethods: IStaticMethods;
    }
}

export {};
