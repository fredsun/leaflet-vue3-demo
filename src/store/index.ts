import { defineStore,createPinia } from "pinia";
import { GlobalState, ThemeConfigProps } from "./interface/index"
import { DEFAULT_PRIMARY_COLOR } from "@/config/config";
//配置全局状态 类似vuex/eventbus
export const useGlobalStore = defineStore(
    'global', {
    state: (): GlobalState => ({
        token:"",
        userInfo:"",
        //组件大小
        assemblySize: "default",
        //语言
        language: "zh",
        //主题配置
        themeConfig: {
            //是否全屏
            maximize: false,
            layout: "vertical",
            //默认主题色
            primary: DEFAULT_PRIMARY_COLOR,
            isDark: false,
            //是否折叠
            isCollapse: false,
            footer: false,
            tabsIcon: false
        }
    }),
    getters: {
        
    },
    actions: {
      setThemeConfig(themeConfig: ThemeConfigProps){
        this.themeConfig = themeConfig;
      }
    }
});

const pinia = createPinia();
pinia.use()