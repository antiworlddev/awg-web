export default function PreHeader({ text }: { text: string }) {
  return (
    <div className="w-full h-10 bg-dark bg-opacity-95 flex items-center justify-center">
      <p className="text-yellow-300 font-medium tracking-wide opacity-75">
        {text}
      </p>
    </div>
  );
}
