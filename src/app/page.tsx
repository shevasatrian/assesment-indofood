"use client";

import { useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  registerables // ← ini daftar lengkap semua scale, element, dan controller
} from "chart.js";
import emailjs from "emailjs-com";
import QrCode from "./components/QrCode";
import { PRODUCTS } from "./data/products";

interface Karyawan {
  nama: string;
  target: number;
  output: number;
  pencapaian: number;
}

// Daftarkan semua komponen Chart.js supaya nggak error "not registered"
ChartJS.register(...registerables);

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const karyawanList: Karyawan[] = [
    { nama: "Abdul", target: 1000000, output: 960000, pencapaian: 0 },
    { nama: "Budi", target: 1000000, output: 420000, pencapaian: 0 },
    { nama: "Beni", target: 1000000, output: 1100000, pencapaian: 0 },
    { nama: "Rian", target: 1000000, output: 950000, pencapaian: 0 },
    { nama: "Romi", target: 1000000, output: 1000500, pencapaian: 0 },
    { nama: "Farhan", target: 1000000, output: 550000, pencapaian: 0 },
    { nama: "Krisna", target: 1000000, output: 953000, pencapaian: 0 },
    { nama: "Fajar", target: 1000000, output: 1053000, pencapaian: 0 },
    { nama: "Heri", target: 1000000, output: 876300, pencapaian: 0 },
    { nama: "Nopri", target: 1000000, output: 300000, pencapaian: 0 },
    { nama: "Dermawan", target: 1000000, output: 989000, pencapaian: 0 }
  ]
    .map((k) => ({ ...k, pencapaian: (k.output / k.target) * 100 }))
    .sort((a, b) => b.pencapaian - a.pencapaian);

  useEffect(() => {
    if (!canvasRef.current) return;

    const labels = karyawanList.map((k) => k.nama);
    const data = karyawanList.map((k) => parseFloat(k.pencapaian.toFixed(2)));

    const config = {
      type: "bar" as const,
      data: {
        labels,
        datasets: [
          {
            label: "Pencapaian (%)",
            data,
            backgroundColor: "#42A5F5"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 120
          }
        }
      }
    };

    const chart = new ChartJS(canvasRef.current, config);
    return () => chart.destroy();
  }, [karyawanList]);

  const kirimNotifikasi = () => {
    const emailMap: Record<string, string> = {
      Budi: "budioperator99@gmail.com",
      Nopri: "nopri@gmail.com"
    };

    const penerima = karyawanList.filter((k) => k.pencapaian <= 50);

    if (penerima.length === 0) {
      alert("Tidak ada operator dengan pencapaian ≤ 50%");
      return;
    }

    penerima.forEach((k) => {
      const emailTujuan = emailMap[k.nama];
      if (emailTujuan) {
        const templateParams = {
          to_name: k.nama,
          to_email: emailTujuan,
          message: `Halo ${k.nama}, pencapaian Anda saat ini adalah ${k.pencapaian.toFixed(
            2
          )}%. Mohon segera ditingkatkan.`
        };

        emailjs
          .send(
            "service_i0lsc5n",
            "template_q218pnu",
            templateParams,
            "chOKt6wPlsM9AZOKv"
          )
          .then(
            () => console.log(`Email berhasil dikirim ke ${k.nama}`),
            (error) => console.error(`Gagal kirim email ke ${k.nama}`, error)
          );
      }
    });

    alert("Notifikasi telah dikirim ke operator pencapaian ≤ 50%");
  };

  return (
    <div className="container mx-auto my-5 px-4">
      <h2 className="text-center mb-4 text-2xl font-bold">
        Pencapaian Karyawan
      </h2>

      <table className="table-auto w-full border border-gray-300 text-center">
        <thead className="bg-blue-200">
          <tr>
            <th>No</th>
            <th>Nama Karyawan</th>
            <th>Target</th>
            <th>Output</th>
            <th>Pencapaian (%)</th>
          </tr>
        </thead>
        <tbody>
          {karyawanList.map((k, i) => (
            <tr key={i} className="border">
              <td>{i + 1}</td>
              <td>{k.nama}</td>
              <td>{k.target}</td>
              <td>{k.output}</td>
              <td>{k.pencapaian.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-center mt-8">Grafik Pencapaian Karyawan</h3>
      <div className="w-full h-96">
        <canvas ref={canvasRef}></canvas>
      </div>

      <div className="text-center mt-4">
        <p>Klik button ini untuk mengirim notifikasi</p>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
          onClick={kirimNotifikasi}
        >
          Notifikasi Operator (≤ 50%)
        </button>
      </div>

      <div className="text-center mt-10">
        <h4 className="text-lg font-semibold">
          Scan QR untuk lihat detail produk
        </h4>
        <div className="flex flex-wrap justify-center gap-6 mt-4">
          {PRODUCTS.map((p) => (
            <div key={p.id} className="flex flex-col items-center">
              <QrCode data={`https://assesment-indofood-i9l4.vercel.app/produk/${p.id}`} />
              <div className="mt-2">{p.nama}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
