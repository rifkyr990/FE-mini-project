export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-2xl font-bold text-green-700 mb-4">Check Your Email</h1>
        <p className="text-gray-700">
          Kami telah mengirimkan link konfirmasi ke email Anda.
          Silakan buka email dan klik link untuk mengaktifkan akun.
        </p>
      </div>
    </div>
  );
}
