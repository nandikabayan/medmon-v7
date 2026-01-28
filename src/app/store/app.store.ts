import cookie from "js-cookie";
import { defineStore } from "pinia";

export const stateManagement = defineStore("medmon-management", {
    state: () => ({
        is_loading: false,
        access_token: cookie.get("access_token") || "",
        refresh_token: cookie.get("refresh_token") || "",
        user: cookie.get("user") 
            ? JSON.parse(cookie.get("user")) 
            : null,
        project: cookie.get("project")
            ? JSON.parse(cookie.get("project"))
            : null,
        project_feature: cookie.get("project_feature")
            ? JSON.parse(cookie.get("project_feature"))
            : [],
        filter_header: cookie.get("filter_header") 
            ? JSON.parse(cookie.get("filter_header")) 
            : {},
        enum_option: cookie.get("enum_option") 
            ? JSON.parse(cookie.get("enum_option"))
            : {},
        content_keyword: localStorage.getItem("content_keyword")
            ? JSON.parse(localStorage.getItem("content_keyword"))
            : [],
        version_apps: cookie.get("version_apps") || "",
        theme: cookie.get("current_theme") || "dark",
        language: cookie.get("language") || 'id',
        tour_guide: [],
    }),
    actions: {
        loadingHandler(value: boolean) {
            this.$state.is_loading = value;
        },
        tokenHandler(access_token: string, refresh_token: string) {
            cookie.set("access_token", access_token);
            cookie.set("refresh_token", refresh_token);
            this.$state.access_token = access_token;
            this.$state.refresh_token = refresh_token;
        },
        setStoreCookie(key: string, value: string[]) {
        },
        setStoreLocalStorage(key: string, value: string[]) {
        },
        logoutHandler() {
            window.location.href = "/login";
        },
    },
    getters: {
        getIsLoading: (state) => state.is_loading,
        getAccessToken: (state) => state.access_token,
        getRefreshToken: (state) => state.refresh_token,
        getUser: (state) => state.user || {},
        getProject: (state) => state.project || null,
        getFeatureProject: (state) => state.project_feature || [],
        getFilterHeader: (state) => state.filter_header || [],
        getEnumOption: (state) => state.enum_option || [],
        getContentKeyword: (state) => state.content_keyword || [],
        getVersionApps: (state) => state.version_apps || [],
        getTheme: (state) => state.theme || [],
        getLanguage: (state) => state.language || "ID",
    },
});
