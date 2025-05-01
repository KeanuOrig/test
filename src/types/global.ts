export type MessageProps = {
    message?: string | number | null;
}

export type SearchBarProps = {
    onSearch?: (term: string) => void;
    searchTerm?: string;
};


export type AtomButtonProps = {
    text: string;
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    color?: 'blue' | 'red' | 'green' | 'white';
};

export type AtomButtonLoadingProps = {
    onClick: () => void;
    isLoading: boolean;
    children: React.ReactNode;
}

export type LinkProps = {
    to: string;
    label: string;
};

export type AtomCheckboxProps = {
    id: string;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
};

export type AtomTextAreaProps = {
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
};

export type CheckboxOption = {
    id: string;
    label: string;
    checked: boolean;
};
  
export type MoleculeCheckboxGroupProps = {
    options: CheckboxOption[];
    onChange: (id: string, checked: boolean) => void;
};