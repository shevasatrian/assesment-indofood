import { PRODUCTS } from "@/app/data/products";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params; // tunggu params diselesaikan
  const produk = PRODUCTS.find((p) => p.id === Number(id));

  if (!produk) {
    return <div className="text-center mt-10">Produk tidak ditemukan</div>;
  }

  return (
    <div className="container mx-auto mt-6 text-center">
      <h4 className="mb-4 text-xl font-bold">Detail Produk</h4>
      <div className="flex justify-center">
        <table className="table-auto border border-gray-300">
          <tbody>
            <tr>
              <th className="border px-4 py-2 w-40">NO</th>
              <td className="border px-4 py-2">{produk.id}</td>
            </tr>
            <tr>
              <th className="border px-4 py-2">NAMA PRODUK</th>
              <td className="border px-4 py-2">{produk.nama}</td>
            </tr>
            <tr>
              <th className="border px-4 py-2">BERAT (KG)</th>
              <td className="border px-4 py-2">{produk.berat}</td>
            </tr>
            <tr>
              <th className="border px-4 py-2">STATUS</th>
              <td className="border px-4 py-2">{produk.status}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
