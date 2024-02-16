import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <main className="h-screen flex justify-center items-center gap-3 sm:flex-row flex-col">
      <Loader2 size={100} className="text-theme-500 animate-spin" />
      <h1 className="text-theme-500 font-poppins text-2xl">
        Please wait, loading...
      </h1>
    </main>
  );
};

export default Loader;
