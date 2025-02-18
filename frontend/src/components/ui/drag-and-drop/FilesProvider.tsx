import { createContext, ReactNode, useState, useContext } from "react";

interface AttachFile {
  _id: string;
  path: string;
  size: number;
}

interface FilesProviderCtx {
  attachedFiles: AttachFile[] | null;
  setAttachedFiles: (files: AttachFile[]) => void;
  isMulti?: boolean;
}

const initialFilesState: FilesProviderCtx = {
  attachedFiles: null,
  setAttachedFiles: () => null,
};

const FilesContext = createContext<FilesProviderCtx>(initialFilesState);

interface Props {
  children: ReactNode;
  isMulti?: boolean;
}

const FilesProvider = ({ children, isMulti = false }: Props) => {
  const [attachedFiles, setAttachedFiles] = useState<AttachFile[] | null>(null);
  const value: FilesProviderCtx = {
    attachedFiles,
    setAttachedFiles,
    isMulti,
  };

  return (
    <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
  );
};

const useFiles = () => {
  return useContext(FilesContext);
};

export { FilesProvider, useFiles };
