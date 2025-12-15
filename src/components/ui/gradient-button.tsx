import { Button, ButtonProps } from './button';
import { cn } from './utils';

export function GradientButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={cn(
        "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600",
        !props.size && "w-full",
        className
      )}
      {...props}
    />
  );
}

