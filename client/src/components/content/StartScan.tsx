import { MdPowerSettingsNew, MdQrCodeScanner } from "react-icons/md";

function StartScan({ handler }: any) {
  return (
    <article className="card mx-auto mt-4 p-4 max-w-[450px] sm:min-w-[420px] w-11/12">
      <div className="flex gap-2 text-2xl items-center font-bold">
        <MdQrCodeScanner className="text-3xl" />
        QR Code Scanner
      </div>
      <h2 className="text-textSec text-sm mt-2 ml-1">
        Position the client's QR Code within the frame
      </h2>

      <aside className="w-full bg-[#DBE7F0] grid place-content-center rounded-md border-2 border-gray-300 border-dotted h-96 my-4">
        <MdQrCodeScanner className="text-5xl text-center mx-auto" />
        <h1 className="text-textPri opacity-60 mt-3 text-center">
          Scanner is Off. Click Start To Active.
        </h1>
      </aside>

      <button
        onClick={handler}
        className="button flex justify-center bg-sec w-full text-white py-1.5 rounded-md items-center gap-2"
      >
        <MdPowerSettingsNew /> Start Scan
      </button>
    </article>
  );
}

export default StartScan;
