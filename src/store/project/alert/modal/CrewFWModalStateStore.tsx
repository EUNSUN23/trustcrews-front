import {ModalState} from "@/utils/type";
import {atom} from "recoil";
import {VAlertFWCreateData} from "@/service/project/alert/type";
import {FWReason} from "@/service/project/alert/constant";

export type CrewFWModalState = ModalState & {
    createData: VAlertFWCreateData;
};

export const crewFWModalStateStore = atom<CrewFWModalState>({
    key: 'crewFWModalStateStore',
    default: {
        isOpen: false,
        title: "강제탈퇴 투표 생성",
        createData: {
            project_id: 0n,
            fw_member_id: 0n,
            authMap: {
                milestoneAuth: false,
                workAuth: false,
                voteAuth: false
            },
            reason: FWReason.FWR1004.code
        }
    }
});