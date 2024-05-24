import { useTonConnectUI } from "@tonconnect/ui-react";
import { useState } from "react";
import { loginByTon } from "src/api/login-ton";
import { toUserFriendlyAddress } from "@tonconnect/sdk";
import { useRouter, useSearchParams } from 'src/routes/hooks';

export function connectTonWallet() {
    const [loadingConnect, setLoadingConnect] = useState(false);
    const [tonConnectUI] = useTonConnectUI();
    const router = useRouter();
    const searchParams = useSearchParams();

    const connect = () => {
        setLoadingConnect(true);
        tonConnectUI.connectWallet().then(async res => {
            let data = {
                ref_code: '',
                public_address: toUserFriendlyAddress(res.account.address),
                device_token: "",
                type_wallet: 1,
            }
            const response = await loginByTon(data);
            if (response) {
                const returnTo = searchParams.get('returnTo') || '/';
                window.location.href = returnTo
            } else {
                alert("Connect false")
            }
        }).catch((error) => {
            alert("Wallet was not connected")
            setLoadingConnect(false);
        });
    };
    const disconnect = () => {
        tonConnectUI.disconnect();
    };

    return { loadingConnect, connect, disconnect }
}

