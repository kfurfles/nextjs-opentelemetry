import { Button, ButtonProps, Group } from '@mantine/core';
import { GoogleIcon } from '@client/ui/assets/svg/GoogleIcon';

export function GoogleButton(props: { onClick: () => void } & ButtonProps) {
  return <Button leftIcon={<GoogleIcon />} variant="default" color="gray" {...props} />;
}
