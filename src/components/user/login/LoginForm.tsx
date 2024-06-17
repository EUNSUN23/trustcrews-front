'use client';
import React, {useState} from "react";
import Input from "@/components/ui/form/Input";
import PasswordInput from "@/components/ui/form/PasswordInput";
import FormButton from "@/components/ui/form/FormButton";
import {login} from "@/service/user/login";
import {useRouter} from "next/navigation";
import {useSetRecoilState} from "recoil";
import {isValidEmail} from "@/utils/common";
import {isEqual} from "lodash";
import {snackbarState} from "@/store/CommonStateStore";
import {useQueryClient} from "@tanstack/react-query";
import {userStateStore} from "@/store/user/UserStateStore";

function LoginForm() {
    const setUserIdState = useSetRecoilState(userStateStore);
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const setSnackbar = useSetRecoilState(snackbarState);

    const queryClient = useQueryClient();

    const isValid = () => {
        if (email === "") {
            setSnackbar({show: true, type: "ERROR", content: "이메일을 입력해주세요."});
            return false;
        }

        // 이메일 형식 아닐 경우
        if (!isValidEmail(email)) {
            setSnackbar({show: true, type: "ERROR", content: "이메일 형식이 아닙니다."});
            return false;
        }

        if (password === "") {
            setSnackbar({show: true, type: "ERROR", content: "비밀번호를 입력해주세요."});
            return false;
        }

        return true;
    }

    const userLogin = () => {
        if (!isValid()) {
            return;
        }

        login(email, password)
            .then(async (response) => {
                const {data: userId, result, message} = response;

                if (isEqual(result, "success")) {
                    setUserIdState(userId);
                    const invalidateUserInfo = queryClient.invalidateQueries({queryKey: ['simpleUserInfo']});
                    const invalidateMyProjectList = queryClient.invalidateQueries({queryKey: ['myProjectList']});
                    const invalidateProjectNotice = queryClient.invalidateQueries({queryKey: ['userProjectNotice']});
                    await Promise.all([invalidateMyProjectList, invalidateProjectNotice, invalidateUserInfo]);
                    router.back();
                    router.refresh();

                    setSnackbar({show: true, type: "INFO", content: message});
                } else {
                    setSnackbar({show: true, type: "ERROR", content: message});
                }
            });
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            userLogin();
        }
    };

    return (
        <div className="w-[380px] mobile:w-[300px] space-y-5 mobile:space-y-4">
            <Input id="email" label="이메일" placeholder="example@trustcrews.com" required
                   value={email} onChange={(e) => setEmail(e.target.value)} onKeyUp={handleKeyDown}/>
            <PasswordInput id="password" label="비밀번호" placeholder="영문, 숫자 포함 6자 이상" required
                           value={password} onChange={(e) => setPassword(e.target.value)} onKeyUp={handleKeyDown}/>
            <br/>
            <FormButton onClick={userLogin}>로그인</FormButton>
        </div>
    )
}

export default LoginForm;