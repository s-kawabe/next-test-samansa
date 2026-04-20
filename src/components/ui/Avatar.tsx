type AvatarProps = {
  label: string;
  size?: number;
};

export function Avatar({ label, size = 36 }: AvatarProps) {
  const initial = label.charAt(0).toUpperCase();
  return (
    <div
      aria-hidden="true"
      className="rounded-full bg-foreground text-foreground-inverse font-sans font-semibold flex items-center justify-center shrink-0"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.44) }}
    >
      {initial}
    </div>
  );
}
