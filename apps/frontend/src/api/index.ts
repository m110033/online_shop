import { QRCodeEnum } from "@/app/qrcode/qrcode.enum";
import axios from "axios";
import { QRCodeStatus } from "./interfaces/qrcode-status.interface";

const port = process.env.PORT || '4000';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || `https://localhost:${port}`;

console.log(`API URL: ${process.env.NEXT_PUBLIC_API_URL}`);

axios.defaults.baseURL = `${apiUrl}/api/v1`;

// Check QRCode
export const checkQRCode = async (code: string): Promise<QRCodeEnum> => {
  try {
    const response = await axios.get(`/qrcode/check?code=${code}`);
    return response.data.status as QRCodeEnum;
  } catch (error) {
    console.error("Error fetching info:", error);
    throw error;
  }
};

// Redeem QRCode
export const redeemQRCode = async (code: string): Promise<boolean> => {
  try {
    const response = await axios.post(`/qrcode/redeem`, { code });
    return response.data.status === 'success';
  } catch (error) {
    console.error("Error redeeming QRCode:", error);
    throw error;
  }
};

// List QRCode
export const listQRCode = async (): Promise<QRCodeStatus[]> => {
  try {
    const response = await axios.get(`/qrcode/list?redeemed=false`);
    return response.data.qrCodes;
  } catch (error) {
    console.error("Error fetching QRCode list:", error);
    throw error;
  }
};
