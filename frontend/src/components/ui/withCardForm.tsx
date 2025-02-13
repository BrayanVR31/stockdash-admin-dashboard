import { ComponentType } from "react";

type WithStyleProps = {
  className?: string;
};

const withCardForm = <Props extends WithStyleProps = WithStyleProps>(
  Component: ComponentType<Props>
) => {
  return (props: Omit<Props, keyof WithStyleProps>) => {
    const styles: WithStyleProps = {
      className:
        "grid gap-x-4 gap-y-4 grid-cols-product grid-rows-product auto-rows-product grid-flow-row",
    };
    return <Component {...styles} {...(props as Props)} />;
  };
};

export default withCardForm;
