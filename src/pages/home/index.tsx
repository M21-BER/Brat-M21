import { Rocket, Code2, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#111143] text-white flex items-center justify-center">
      <div className="text-center max-w-2xl  px-0">
        {/* Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="p-5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Rocket size={42} className="text-blue-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold tracking-tight">
          Start Your Project Here
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-white/60 text-lg">
          A clean starter setup for your React + Vite application. Build fast.
          Ship faster.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <Code2 className="mx-auto mb-2 text-purple-400" />
            <p className="text-sm text-white/70">Clean Structure</p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <Zap className="mx-auto mb-2 text-yellow-400" />
            <p className="text-sm text-white/70">Fast Setup</p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <Rocket className="mx-auto mb-2 text-blue-400" />
            <p className="text-sm text-white/70">Production Ready</p>
          </div>
        </div>

        {/* Button */}
        <button className="mt-10 px-6 py-3 rounded-4xl bg-neutral-900 text-white hover:bg-blue-900 transition font-medium shadow-md">
          Get Started
        </button>
      </div>
    </div>
  );
}
