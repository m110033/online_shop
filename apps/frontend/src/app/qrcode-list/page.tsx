'use client';

import { listQRCode } from '@/api';
import { QRCodeStatus } from '@/api/interfaces/qrcode-status.interface';
import { useEffect, useState } from 'react';


export default function QRCodeList() {
  const [qrCodes, setQrCodes] = useState<QRCodeStatus[]>([]);

  useEffect(() => {
    // Fetch QR Codes and set the state
    const fetchQRCodeData = async () => {
      try {
        const QRcodes = await listQRCode();
        setQrCodes(QRcodes); // Set the fetched QR codes to the state
      } catch (error) {
        console.error("Failed to fetch QR codes:", error);
      }
    };

    fetchQRCodeData(); // Call the function to fetch QR codes when the component mounts
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {qrCodes.map((qrCode) => (
          <div key={qrCode.id} className="flex flex-col items-center border rounded-lg p-4">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCode.id}`}
              alt={`QR Code for ${qrCode.id}`}
              className="w-24 h-24 mb-4"
            />
            <p className="text-gray-700">Code: {qrCode.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
