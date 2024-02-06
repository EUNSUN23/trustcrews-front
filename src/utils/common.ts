import {MilestoneInfo, PositionItem, ProjectPost, SelectItem, TechStackItem} from "./type";
import {format} from "date-fns";
import _, { camelCase } from "lodash";

export function makeBadgeSize(size: string) {
    // 사이즈
    let textSize;
    let px;
    let py;
    switch (size) {
        case "xs":
            textSize = "text-[11px] mobile:text-[9px]";
            px = "px-2 mobile:px-1";
            py = "py-0.5 mobile:py-0";
            break;
        case "sm":
            textSize = "tablet:text-sm mobile:text-xs";
            px = "px-2";
            py = "py-1";
            break;
        case "md":
            textSize = "tablet:text-lg mobile:text-base";
            px = "tablet:px-8 mobile:px-4";
            py = "tablet:py-4 mobile:py-2";
            break;
        case "lg":
            textSize = "text-lg";
            px = "px-8";
            py = "py-4";
            break;
        default:
            textSize = "tablet:text-base mobile:text-sm";
            px = "px-4";
            py = "tablet:py-2 mobile:py-1";
    }

    return {textSize, px, py};
}

export function makeBadgeColor(color: string) {
    let bgColor;
    let textColor;
    let ringColor;
    switch (color) {
        case "red":
            bgColor = "bg-red-50";
            textColor = "text-red-700";
            ringColor = "ring-red-600/10";
            break;
        case "yellow":
            bgColor = "bg-yellow-50";
            textColor = "text-yellow-800";
            ringColor = "ring-yellow-600/20";
            break;
        case "green":
            bgColor = "bg-green-50";
            textColor = "text-green-700";
            ringColor = "ring-green-600/20";
            break;
        case "blue":
            bgColor = "bg-blue-50";
            textColor = "text-blue-700";
            ringColor = "ring-blue-700/10";
            break;
        case "purple":
            bgColor = "bg-purple-50";
            textColor = "text-purple-700";
            ringColor = "ring-purple-700/10";
            break;
        default:
            // todo - error 던지기?
            bgColor = "bg-red-50";
            textColor = "text-red-700";
            ringColor = "ring-red-600/10";
            break;
    }

    return {bgColor, textColor, ringColor};
}

export function makeImageSize(size: string) {
    let imageSize;
    switch (size) {
        case "2xs":
            imageSize = "h-6 w-6";
            break;
        case "xs":
            imageSize = "h-10 w-10 mobile:h-8 mobile:w-8";
            break;
        case "sm":
            imageSize = "h-16 w-16 mobile:h-10 mobile:w-10";
            break;
        case "md":
            imageSize = "h-24 w-24 mobile:h-16 mobile:w-16";
            break;
        case "lg":
            imageSize = "h-40 w-40 mobile:h-28 mobile:w-28";
            break;
        default:
            imageSize = size;
    }

    return imageSize;
}

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export function getSelectItemValue(item: SelectItem) {
    return item.value;
}

export function getPositionSelectItem(item: PositionItem | null) {
    if (item) {
        return {value: item.positionId, name: item.positionName} as SelectItem;
    }

    return item;
}

export function getPositionSelectItems(items: PositionItem[]) {
    if (items.length > 0) {
        return items.map(
            (item) =>
                ({value: item.positionId, name: item.positionName} as SelectItem)
        );
    }

    return [];
}

export function getTechStackSelectItems(items: TechStackItem[]) {
    if (items.length > 0) {
        return items.map(
            (item) =>
                ({value: item.techStackId, name: item.techStackName} as SelectItem)
        );
    }

    return [];
}

export function JSONReplaceBigInt(data: Record<string, unknown>) {
    return JSON.stringify(data, (k, v) => (typeof v === 'bigint' ? Number(v) : v));
}

export const isValidEmail = (email: string) => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const isValidNickname = (nickname: string) => {
    const nicknameRegex: RegExp = /^[a-zA-Z0-9]{6,10}$/;
    return nicknameRegex.test(nickname);
}

export const isValidPassword = (password: string) => {
    const passwordRegex: RegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,12}$/;
    return passwordRegex.test(password);
}

export function getRandomBigInt() {
    // Calculate the range (inclusive)
    const range = BigInt(Number.MAX_SAFE_INTEGER * 2) - BigInt(Number.MAX_SAFE_INTEGER);

    // Calculate the number of bytes needed to represent the range
    const byteLength = Math.ceil(Math.log2(Number(range)) / 8);

    // Create a buffer to store random bytes
    const buffer = new Uint8Array(byteLength);

    // Generate random bytes
    crypto.getRandomValues(buffer);

    // Convert the buffer to a BigInt
    let randomBigInt = 0n;
    for (let i = 0; i < byteLength; i++) {
        randomBigInt <<= 8n;
        randomBigInt |= BigInt(buffer[i]);
    }

    // Adjust the value to fit within the specified range
    randomBigInt = randomBigInt % range + BigInt(1);

    return randomBigInt;
}

export function convertStringToDate(date: string, dateForm: 'yyyy-MM-dd') {
    return format(new Date(date), dateForm);
}

/**
 * startDate 기준 데이터 배열 정렬
 * @param dataList
 * @param sortBy desc : 내림차순(늦은날짜 -> 빠른날짜), asc : 오름차순(빠른날짜 -> 늦은날짜)
 */
export function sortByStartDate<T extends ProjectPost | MilestoneInfo>(dataList: T[], sortBy: 'asc' | 'desc'): T[] {
    const sorted = dataList.sort(function (a, b) {
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });

    return sortBy === 'desc' ? sorted.reverse() : sorted;
}

/**
 * 마일스톤 / 업무 / 크루 status badge color 생성
 * @param text
 */
export function getStatusBadgeColor(text: string) {
    switch (text) {
        case '시작전':
            return {bgColor: 'bg-grey900', textColor: 'text-grey000'};
        case '진행중':
            return {bgColor: 'bg-[#FFF9CF]', textColor: 'text-[#7B5C03]'};
        case '완료':
            return {bgColor: 'bg-[#F1F1F1]', textColor: 'text-[#242D35]'};
        case '만료':
            return {bgColor: 'bg-danger', textColor: 'text-white'};
        case '참여중':
            return {bgColor: 'bg-primary', textColor: 'text-white'};
        case '탈퇴 진행중':
            return {bgColor: 'bg-danger', textColor: 'text-white'};
        case '수락':
            return {bgColor: 'bg-green-50 ring-green-600/20', textColor: 'text-green-700'}
        case '거절':
            return {bgColor: 'bg-yellow-50 ring-yellow-600/20', textColor: 'text-yellow-800'}
        case '미확인':
            return {bgColor:'bg-gray-50 ring-gray-500/10', textColor: 'text-gray-600'}
        default:
            throw Error("Unknown Status Type");
    }
}

/**
 * 오늘 날짜 yyyy-MM-dd 형식 string으로 반환
 */
export function getTodayString() {
    const today = new Date();
    const strArr = [
        today.getFullYear().toString(),
        _.padStart((today.getMonth() + 1).toString(), 2, '0'),
        _.padStart(today.getDate().toString(), 2, '0')
    ];

    return strArr.join('-');
}

export function getRefreshToken(setCookieHeader: string) {
    let refreshTokenValue = "";
    let cookieOptions = {};
    setCookieHeader.split(";").map((item) => {
        const cookieItem = item.trim().split("=");
        if (cookieItem.includes("Refresh")) {
            refreshTokenValue = cookieItem[1];
        } else {
            const optionName = camelCase(cookieItem[0]);
            const optionValue = cookieItem[1] ?? true;
            cookieOptions = {
            ...cookieOptions,
            [optionName]: optionValue,
            };
        }
    });

    return { token: refreshTokenValue, options: cookieOptions };
}

export function checkExpiration(endDate:string){
    return new Date(endDate).getTime() < new Date().getTime()
}