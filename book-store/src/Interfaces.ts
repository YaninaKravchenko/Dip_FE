export interface ITitleProps {
    variant: 'h1' | 'h2' | 'span';
    children: React.ReactNode;
    Component?: 'h1' | 'h2' | 'span';
}

export interface IUserInfoProps {
    name?: string;
    userName?: string;
    id: string;
    email?: string;
    children?: string;
}

export interface ISearchFieldProps {
  isOpen: boolean;
  onClick: () => void;
}

export interface ISignUpPageProps {
  isRegistered: boolean;
  setIsRegistered: (value: boolean) => void;
}