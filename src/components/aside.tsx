import DialogNew from "./dialog-new";

export default function Aside() {
  return (
    <aside className="flex flex-col gap-2 border-r p-3 bg-muted/40">
      <div className="flex items-center">
        <img src="/logo.svg" alt="logo" className="size-7" />
        <p className="ml-2">Bakan</p>

        <DialogNew />
      </div>
    </aside>
  );
}
