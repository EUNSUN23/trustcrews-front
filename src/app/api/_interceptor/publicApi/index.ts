import {returnFetchPublicWrapper} from "@/app/api/_interceptor/publicApi/returnFetchPublicWrapper";
import {ResponseError} from "@/app/api/_interceptor/error/classes";
import {getErrorCodeFromResponse} from "@/app/api/_interceptor/error/utils";
import {reqPLogger, resPLogger} from "@/app/api/_interceptor/utils/logger";
import {baseURL} from "@/app/api/_interceptor/utils/baseURL";

const publicApi = returnFetchPublicWrapper({
    baseUrl: baseURL,
    interceptors: {
        request: async (requestArgs) => {
            reqPLogger.i(`${requestArgs[1]!.method || 'GET'}: ${requestArgs[0]}`);
            return requestArgs;
        },
        response: async (response, requestArgs) => {
            if (response.ok) {
                resPLogger.i(`${requestArgs[1]!.method || 'GET'}: ${response.status} ${requestArgs[0]}`)
                return response;
            }else{
                const errorCode = await getErrorCodeFromResponse(response);
                resPLogger.i(`${requestArgs[1]!.method}: ${response.status} ${requestArgs[0]} - ${errorCode}`);
                throw new ResponseError(errorCode);
            }
        },
    },
});

export default publicApi;
