export interface GlobalState {
    token: string,
    userInfo: any;
    assemblySize: AssemblySizeType;
    language: string;
    themeConfig: ThemeConfigProps;
}


export type AssemblySizeType = "default" | "small" | "large";

export interface ThemeConfigProps {
    maximize: boolean;
    layout: LayoutType;
    primary: string;
    isDark: boolean;
    isCollapse: boolean;
    footer: boolean;
    tabsIcon: boolean;

}

export type LayoutType = "vertical" | "classis" | "transverse" | "columns";

export interface TabsSate {
    tabsMenuList: TabsMenuProps[];
}

export interface TabsMenuProps {
    icon: string;
    title: string;
    path: string;
    name: string;
    close: boolean;
}