import { Avatar } from '@/app/components/avatar/index';
import { User, Bot, Shield } from 'lucide-react';

// ─── Default ──────────────────────────────────────────────────────────────────
// Shows the three avatar states: image, initials fallback, icon fallback

export function AvatarDefault() {
  return (
    <div className="flex items-center gap-4">
      {/* With image */}
      <Avatar.Root className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-border">
        <Avatar.Image
          src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
          className="h-full w-full object-cover"
        />
        <Avatar.Fallback
          delay={300}
          className="flex h-full w-full items-center justify-center bg-muted text-xs font-semibold uppercase text-muted-foreground"
        >
          LT
        </Avatar.Fallback>
      </Avatar.Root>

      {/* Initials fallback */}
      <Avatar.Root className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-border">
        <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-primary/10 text-xs font-semibold uppercase text-primary">
          AB
        </Avatar.Fallback>
      </Avatar.Root>

      {/* Icon fallback */}
      <Avatar.Root className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-border">
        <Avatar.Fallback className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
          <User className="size-5" />
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}

// ─── Sizes ────────────────────────────────────────────────────────────────────
// Avatar at different sizes, inspired by GNOME contacts list hierarchy

export function AvatarSizes() {
  const sizes = [
    { cls: 'h-7 w-7', text: 'text-[10px]', icon: 'size-3.5', initials: 'JD' },
    { cls: 'h-9 w-9', text: 'text-xs',     icon: 'size-4',   initials: 'JD' },
    { cls: 'h-11 w-11', text: 'text-sm',   icon: 'size-5',   initials: 'JD' },
    { cls: 'h-14 w-14', text: 'text-base', icon: 'size-6',   initials: 'JD' },
    { cls: 'h-20 w-20', text: 'text-xl',   icon: 'size-8',   initials: 'JD' },
  ];

  return (
    <div className="flex items-center gap-4">
      {sizes.map(({ cls, text, icon, initials }, i) => (
        <Avatar.Root
          key={i}
          className={`relative flex shrink-0 overflow-hidden rounded-full ring-2 ring-border ${cls}`}
        >
          <Avatar.Image
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&dpr=2&q=80"
            className="h-full w-full object-cover"
          />
          <Avatar.Fallback
            delay={300}
            className={`flex h-full w-full items-center justify-center bg-primary/10 font-semibold uppercase text-primary ${text}`}
          >
            {initials}
          </Avatar.Fallback>
        </Avatar.Root>
      ))}
    </div>
  );
}

// ─── Group / Stack ────────────────────────────────────────────────────────────
// Overlapping avatar stack inspired by GNOME shared folder / collaborators UI

const GROUP_USERS = [
  {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&dpr=2&q=80',
    initials: 'SA',
    bg: 'bg-[oklch(0.88_0.08_35)]',
    text: 'text-[oklch(0.45_0.15_35)]',
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&dpr=2&q=80',
    initials: 'MK',
    bg: 'bg-[oklch(0.88_0.06_250)]',
    text: 'text-[oklch(0.4_0.12_250)]',
  },
  {
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&dpr=2&q=80',
    initials: 'EL',
    bg: 'bg-[oklch(0.88_0.07_150)]',
    text: 'text-[oklch(0.4_0.12_150)]',
  },
  {
    src: '',
    initials: 'RB',
    bg: 'bg-[oklch(0.88_0.07_330)]',
    text: 'text-[oklch(0.4_0.12_330)]',
  },
];

export function AvatarGroup() {
  return (
    <div className="flex flex-col gap-3">
      {/* Stack */}
      <div className="flex items-center">
        <div className="flex -space-x-2.5">
          {GROUP_USERS.map(({ src, initials, bg, text }, i) => (
            <Avatar.Root
              key={i}
              className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-card"
              style={{ zIndex: GROUP_USERS.length - i }}
            >
              <Avatar.Image src={src} className="h-full w-full object-cover" />
              <Avatar.Fallback
                delay={300}
                className={`flex h-full w-full items-center justify-center text-xs font-semibold uppercase ${bg} ${text}`}
              >
                {initials}
              </Avatar.Fallback>
            </Avatar.Root>
          ))}
          {/* Overflow badge */}
          <span
            className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted ring-2 ring-card text-xs font-semibold text-muted-foreground"
            style={{ zIndex: 0 }}
          >
            +8
          </span>
        </div>
        <span className="ml-3 text-sm text-muted-foreground">12 members</span>
      </div>

      {/* List with meta — GNOME Contacts row style */}
      <div className="flex flex-col divide-y divide-border rounded-xl border border-border bg-card overflow-hidden">
        {GROUP_USERS.slice(0, 3).map(({ src, initials, bg, text }, i) => {
          const names = ['Sara A.', 'Marco K.', 'Elena L.'];
          const roles = ['Owner', 'Editor', 'Viewer'];
          const RoleIcon = i === 0 ? Shield : i === 1 ? Bot : User;
          return (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5">
              <Avatar.Root className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
                <Avatar.Image src={src} className="h-full w-full object-cover" />
                <Avatar.Fallback
                  delay={300}
                  className={`flex h-full w-full items-center justify-center text-[10px] font-semibold uppercase ${bg} ${text}`}
                >
                  {initials}
                </Avatar.Fallback>
              </Avatar.Root>
              <span className="flex-1 text-sm font-medium text-foreground">{names[i]}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                <RoleIcon className="size-3 shrink-0" />
                {roles[i]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}