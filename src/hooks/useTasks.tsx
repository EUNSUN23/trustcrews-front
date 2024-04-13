import {DataId, PageResponseBody} from "@/utils/type";
import {getTaskList} from "@/service/project/task";
import {useQuery} from "@tanstack/react-query";
import {TaskItem} from "@/app/project/@task/_utils/type";


export type TasksReqParam = {
    projectId: DataId;
    milestoneId: DataId;
    itemsPerPage: number;
    pageNumber?: number;
}

function useTasks({projectId, milestoneId, itemsPerPage, pageNumber = 0}: TasksReqParam) {

    const {
        data: res,
        isFetching,
        isError
    } = useQuery<Promise<PageResponseBody<TaskItem[]>>, Error, PageResponseBody<TaskItem[]>>({
        queryKey: ['taskList', milestoneId, projectId, pageNumber, itemsPerPage],
        queryFn: () => getTaskList({
            milestoneId,
            projectId,
            pageNumber,
            itemsPerPage
        })
    });

    return {
        taskList: res!.data.content,
        totalPages: res!.data.totalPages,
        isTasksFetching: isFetching,
        isTasksError: isError
    }
}

export default useTasks;