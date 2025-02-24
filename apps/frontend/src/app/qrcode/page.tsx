'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { QRCodeEnum } from "./qrcode.enum";
import { checkQRCode, redeemQRCode } from "@/api";

export default function QRCodePage() {
    const searchParams = useSearchParams();
    const code = searchParams.get("code");

    const [redeemed, setRedeemed] = useState(false);
    const [codeStatus, setCodeStatus] = useState<QRCodeEnum | null>(null);

    useEffect(() => {
        if (code) {
            checkRedeemed(code);
        }
    }, [code]);

    const checkRedeemed = async (_code: string) => {
        const status = await checkQRCode(_code);
        console.log(status);
        setCodeStatus(status);
    };

    const handleRedeem = async () => {
        if (!code) return;
        const status = await redeemQRCode(code);
        if (status) {
            setRedeemed(true);
            alert('兌換成功！');
        } else {
            alert('兌換失敗或此 Code 已兌換');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">QR Code 兌換頁面</h1>

                {codeStatus === QRCodeEnum.NONE && (
                    <p className="text-red-500 text-center">無效的 QR Code</p>
                )}

                {codeStatus === QRCodeEnum.AVAILABLE && (
                    <>
                        <div className="flex justify-center mb-4 p-4 border-4 border-dashed border-gray-300 rounded-lg">
                            <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${code}`} 
                                alt="QR Code" 
                                className="w-32 h-32"
                            />
                        </div>
                        <p className="text-center text-gray-600 mb-4"><strong>兌換碼: {code}</strong></p>
                        <div className="text-center">
                            <button 
                                onClick={handleRedeem} 
                                disabled={redeemed} 
                                className={`px-6 py-2 text-white font-semibold rounded-lg transition-colors duration-200 ${redeemed ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                            >
                                兌換
                            </button>
                        </div>
                    </>
                )}

                {codeStatus === QRCodeEnum.REDEEMED && (
                    <p className="text-yellow-600 text-center">此 QR Code 已經被兌換過了。</p>
                )}
            </div>
        </div>
    );
}
