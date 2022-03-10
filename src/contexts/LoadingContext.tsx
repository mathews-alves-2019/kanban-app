import { createContext, ReactNode, useEffect, useState } from "react";

export const LoadingContext = createContext({} as LoadingContextRype);

type LoadingContextRype = {
    loading: boolean;
    showLoading: () => void;
    hideLoading: () => void;
}

type LoadingContextComponentProps = {
    children: ReactNode
}

export function LoadingContextComponent(props: LoadingContextComponentProps) {

    const [loading, setLoading] = useState<boolean>(true);

    function showLoading() {
        setLoading(true)
    }
    
    function hideLoading() {
        setLoading(false)
    }

    return (
        <LoadingContext.Provider value={{ hideLoading, showLoading, loading }}>
            {props.children}
        </LoadingContext.Provider>
    );
}