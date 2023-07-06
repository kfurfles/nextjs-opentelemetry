import { Button, ButtonProps } from "@mantine/core";
import { traceSpan } from "@/client/library/opentelemetry/telemetry";

export type UIButtonProps = { 
	onClick: () => void,
	attributes?: Record<string, any>
	variant: 'red' | 'blue',
} & Omit<ButtonProps, 'variant'>

export function UIeButton(props: UIButtonProps) {
	const { onClick, attributes, variant: color, ...rest} = props
	
	const onClickButton = () => {
		traceSpan("button-click", attributes)
		onClick()
	}
  return (
    <Button
      variant="default"
      color={color}
			onClick={onClickButton}
      {...rest}
    />
  );
}
