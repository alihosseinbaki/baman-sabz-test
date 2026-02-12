import { ReactNode, useMemo, useContext, createContext, useState, useCallback } from 'react';
import type { IMovie } from "./dropdown-select.types.ts";

interface Props {
    children: ReactNode;
    items: IMovie[]
}

interface DispatchProps {
    setSelectedItems: IMovie[];
    setQuery: string;
    setIsSelectedAll: boolean;
}

export interface DropdownSelectContextType {
    items: IMovie[],
    selectedItems: IMovie[];
    query: string;
    isSelectedAll: boolean;
    dispatch: <K extends keyof DispatchProps>(
        action: K,
        payload: DispatchProps[K]
    ) => void;
}

export const DropdownSelectContext = createContext<DropdownSelectContextType | null>(null);

export function useDropdownSelect() {
    const context = useContext(DropdownSelectContext);

    if (!context) {
        throw new Error('useDropdownSelect must be used within DropdownSelectProvider');
    }

    return context;
}

export function DropdownSelectProvider({ children, items }: Props) {
    const [selectedItems, setSelectedItems] = useState<IMovie[]>([]);
    const [query, setQuery] = useState('');
    const [isSelectedAll, setIsSelectedAll] = useState(false);

    const dispatch = useCallback(
        <K extends keyof DispatchProps>(
            action: K,
            payload: DispatchProps[K]
        ) => {
            switch (action) {
                case "setSelectedItems":
                    setSelectedItems(payload);
                    break;
                case "setQuery":
                    setQuery(payload);
                    break;
                case "setIsSelectedAll":
                    setIsSelectedAll(payload);
                    payload ? setSelectedItems(items) : setSelectedItems([]);
                    break;
            }
        },
        []
    );

    const value = useMemo(() => ({
        items,
        selectedItems,
        query,
        isSelectedAll,
        dispatch,
    }), [
        items,
        selectedItems,
        query,
        isSelectedAll,
        dispatch
    ]);

    return (
        <DropdownSelectContext.Provider value={value}>
            {children}
        </DropdownSelectContext.Provider>
    );
}
