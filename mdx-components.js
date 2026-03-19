import DocFooter from "./app/components/DocFooter";
import { useMDXComponents as getThemeMDXComponents } from "nextra-theme-docs";

export function useMDXComponents(components) {
  const themeComponents = getThemeMDXComponents(components);
  const ThemeWrapper = themeComponents.wrapper;

  return {
    ...themeComponents,
    wrapper(props) {
      const { bottomContent, ...rest } = props;

      return (
        <ThemeWrapper
          {...rest}
          bottomContent={
            <>
              {bottomContent}
              <DocFooter />
            </>
          }
        />
      );
    },
  };
}
