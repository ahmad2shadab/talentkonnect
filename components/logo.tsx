import Link from 'next/link';

interface LogoProps {
  size?: 'small' | 'default' | 'large';
  variant?: 'default' | 'light' | 'dark';
}

export function Logo({ size = 'default', variant = 'default' }: LogoProps) {
  const sizeClasses = {
    small: 'text-lg',
    default: 'text-2xl',
    large: 'text-4xl',
  };

  const iconSize = {
    small: 'h-6',
    default: 'h-8',
    large: 'h-10',
  };

  // Color variants for different backgrounds
  const colorClasses = {
    default: {
      talent: 'text-primary-blue',
      konnect: 'text-accent-orange',
    },
    light: {
      talent: 'text-primary-blue',
      konnect: 'text-accent-orange',
    },
    dark: {
      talent: 'text-white',
      konnect: 'text-accent-orange',
    },
  };

  const colors = colorClasses[variant];

  return (
    <Link href="/" className="flex items-center">
      <div className="flex items-center">
        <LogoIcon
          className={`${iconSize[size]} w-auto mr-2`}
          variant={variant}
        />
        <div className={`font-bold ${sizeClasses[size]}`}>
          <span className={colors.talent}>talent</span>
          <span className={colors.konnect}>konnect</span>
        </div>
      </div>
    </Link>
  );
}

function LogoIcon({
  className,
  variant = 'default',
}: {
  className?: string;
  variant?: 'default' | 'light' | 'dark';
}) {
  const primaryColor = variant === 'dark' ? '#FFFFFF' : '#1D3557';
  const accentColor = '#E76F51';

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8 4L16 12L24 4L28 8L20 16L28 24L24 28L16 20L8 28L4 24L12 16L4 8L8 4Z"
        fill={primaryColor}
      />
      <path d="M16 12L24 4L28 8L20 16L16 12Z" fill={accentColor} />
      <path d="M16 20L8 28L4 24L12 16L16 20Z" fill={accentColor} />
    </svg>
  );
}
