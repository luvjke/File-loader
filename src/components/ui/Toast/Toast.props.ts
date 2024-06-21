export interface ToastProps {
  toastList: ToastListProps[];
  setToastList: React.Dispatch<React.SetStateAction<ToastListProps[]>>;
}

export interface ToastListProps {
  id: number;
  title: string;
  description: string;
  backgroundColor: string;
}
