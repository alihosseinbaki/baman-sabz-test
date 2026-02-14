import {useCallback} from 'react';
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import type {IResponseApis} from "../../../types/IResponseApis.ts";
import type {IGetAllUsers} from "../../../types/models/user-model.ts";
import userService from "../../../services/api/services/user-service.ts";

const UsersContainer = () => {
    const fetchUsers = useCallback(
        () => {
            return userService.getUsers();
        }, []
    )

    const {
        data: response,
        refetch: reFetch,
        isLoading,
        isError
    } = useQuery<IResponseApis<IGetAllUsers>>({
        queryKey: ['get-all-users'],
        queryFn: () => fetchUsers(),
        placeholderData: keepPreviousData,
    })

    return (
        <div>

        </div>
    );
};

export default UsersContainer;