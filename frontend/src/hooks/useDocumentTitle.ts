import { useEffect, useRef } from "react";

type Config = {
  separator?: string;
  restoreOnMount?: boolean;
};

const useDocumentTitle = (title: string, options?: Config) => {
  const { separator = "|", restoreOnMount = false } = options || {};
  const defaultTitle = useRef<string>(null);
  useEffect(() => {
    if (!defaultTitle.current) defaultTitle.current = document.title;
    const baseTitle = defaultTitle.current.split(separator)?.[0];
    document.title = `${baseTitle} ${separator} ${title}`;
    return () => {
      if (restoreOnMount) {
        document.title = defaultTitle.current!;
      }
    };
  }, [title, restoreOnMount, separator]);
};

export default useDocumentTitle;
