import { CookingPot } from "lucide-react";

export default function NoPosts() {
  return (
    <div className="flex flex-col items-center mt-20 justify-center text-offwhite">
      <CookingPot className="h-24 w-24 mb-4" />
      <p className="text-2xl font-semibold text-center ml-3">The pot is empty...</p>
    </div>
  );
};