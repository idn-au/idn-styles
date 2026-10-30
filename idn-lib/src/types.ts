export interface NavigationItem {
    title: string;
    path: string;
    stem?: string;
    button?: boolean;
    active?: boolean;
    children?: NavigationItem[];
    [key: string]: any;
}
