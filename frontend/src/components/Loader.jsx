export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <span className="inline-block w-6 h-6 border-4 border-t-transparent border-accent rounded-full animate-spin"></span>
      <span className="ml-2 text-accent font-bold">Generating...</span>
    </div>
  );
}
