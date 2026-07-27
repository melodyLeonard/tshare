export interface ReceiveProps {
  code: string;
  onChangeCode: (value: string) => void;
  onConnect: () => void;
  onClose: () => void;
  connecting: boolean;
}
