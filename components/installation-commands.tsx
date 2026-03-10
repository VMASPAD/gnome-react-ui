export default function InstallationCommands() {
  const command = `npm i gnome-ui`;
  
  return (
    <div className="flex flex-col gap-2 my-4">
      <div className="bg-muted/50 border rounded-md p-4 flex justify-between items-center overflow-x-auto">
        <code className="text-sm font-mono whitespace-nowrap">{command}</code>
      </div>
    </div>
  );
}
