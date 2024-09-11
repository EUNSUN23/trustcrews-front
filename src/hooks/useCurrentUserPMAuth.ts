import {getCurrentUserProjectMemberAuth} from "@/service/project/project";
import {useQuery} from "@tanstack/react-query";
import {ProjectAuthMap, ResponseBody} from "@/utils/type";

export default function useCurrentUserPMAuth(projectId: string | bigint) {
    const {
        data,
        isFetching: isFetchingCurrentUserPMAuth
    } = useQuery<ResponseBody<ProjectAuthMap>, Error, ResponseBody<ProjectAuthMap>>({
        queryKey: ['currentUserProjectAuth', projectId],
        queryFn: () => getCurrentUserProjectMemberAuth(projectId),
    });

    const currentUserPMAuth = data?.data || null;
    return {currentUserPMAuth, isFetchingCurrentUserPMAuth};
}