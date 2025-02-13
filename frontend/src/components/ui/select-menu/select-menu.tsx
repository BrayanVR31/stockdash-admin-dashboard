import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import classNames from "classnames";
import { Props } from "react-select";
import Select from "react-select";

// Types
type SelectRef = ElementRef<typeof Select>;
type SelectPropsRef = ComponentPropsWithoutRef<typeof Select>;
// Types
export interface Option<ValueType> {
  value: ValueType;
  label: string;
}

const SelectMenu = forwardRef<SelectRef, SelectPropsRef>(function CustomSelect(
  props: Props,
  ref,
) {
  return (
    <Select
      menuPosition="absolute"
      ref={ref}
      {...props}
      unstyled
      classNames={{
        control: ({ isFocused }) =>
          classNames(
            "dark:bg-neutral-700",
            "px-4 py-2",
            "rounded-md",
            "border-2 dark:border-gray-400/85",
            isFocused ? "dark:border-blue-600" : "",
          ),
        menuList: () =>
          classNames(
            "dark:bg-neutral-700 bg-white",
            "rounded-md",
            "mt-3",
            "shadow-md",
            "py-2",
            "mb-3",
          ),
        menu: () => classNames(),
        option: ({ isSelected }) =>
          classNames(
            "px-4 py-2",
            isSelected
              ? "bg-blue-700 hover:bg-blue-700 text-white"
              : "hover:bg-blue-700/25",
          ),
      }}
    />
  );
});

export { SelectMenu };
