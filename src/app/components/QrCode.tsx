"use client";

import React from "react";
import QRCode from "react-qr-code";

interface QrCodeProps {
  data: string;
  size?: number;
}

export default function QrCode({ data, size = 120 }: QrCodeProps) {
  return (
    <div style={{ background: "#fff", padding: "8px", borderRadius: "8px" }}>
      <QRCode value={data} size={size} />
    </div>
  );
}
