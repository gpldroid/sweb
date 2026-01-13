// dami-config.js - إعدادات DAMI X-PRO
const DAMI_CONFIG = {
    // معلومات السيرفر الرئيسية
    API_SERVER: {
        BASE_URL: "http://ottpro.iptvpro2.com:8789",
        USERNAME: "Oujakr12",
        PASSWORD: "87593226",
        TIMEOUT: 10000
    },
    
    // إعدادات النظام
    SYSTEM: {
        APP_NAME: "DAMI X-PRO",
        VERSION: "2.0.0",
        DEVELOPER: "عماد الدين لمراني",
        SUPPORT_WHATSAPP: "+212783539816"
    },
    
    // إعدادات العرض
    DISPLAY: {
        ITEMS_PER_PAGE: 42,
        SEARCH_LIMIT: 60,
        LOAD_MORE_INCREMENT: 30,
        DEFAULT_CATEGORY: "all",
        SHOW_LOADING_DELAY: 300
    },
    
    // إعدادات الكاش
    CACHE: {
        ENABLED: true,
        DURATION: 3600000, // ساعة واحدة
        CLEAR_ON_EXIT: false
    },
    
    // إعدادات المشغل
    PLAYER: {
        AUTO_PLAY: true,
        DEFAULT_QUALITY: 720,
        QUALITIES: [1080, 720, 480, 360],
        ENABLE_SUBTITLES: true,
        DEFAULT_SPEED: 1.0
    },
    
    // إعدادات الواجهة
    UI: {
        THEME_COLOR: "#d4af37",
        DEFAULT_LANG: "ar",
        ENABLE_ANIMATIONS: true,
        SHOW_FLOATING_BUTTONS: true,
        SHOW_DOWNLOAD_SECTION: true
    },
    
    // إعدادات الأمان
    SECURITY: {
        BLOCK_CHROME: false,
        ENABLE_PROXY: false,
        PROXY_URL: "https://corsproxy.io/?",
        ALLOWED_BROWSERS: ["firefox", "safari", "edge", "chrome"],
        VALIDATE_URLS: true
    },
    
    // روابط مهمة
    LINKS: {
        WHATSAPP: "https://wa.me/212783539816",
        TELEGRAM: "",
        WEBSITE: "",
        PLAYSTORE: ""
    },
    
    // إعدادات التحديث
    UPDATES: {
        CHECK_FOR_UPDATES: true,
        UPDATE_INTERVAL: 86400000, // 24 ساعة
        NOTIFY_USERS: true
    },
    
    // إعدادات البحث
    SEARCH: {
        MIN_CHARS: 2,
        DEBOUNCE_TIME: 300,
        SEARCH_IN_DESCRIPTION: false,
        FUZZY_SEARCH: true
    }
};

// فئة لإدارة الإعدادات
class ConfigManager {
    constructor() {
        this.config = DAMI_CONFIG;
        this.loadUserSettings();
    }
    
    loadUserSettings() {
        const saved = localStorage.getItem('dami_user_settings');
        if (saved) {
            try {
                this.userSettings = JSON.parse(saved);
                this.mergeSettings();
            } catch (e) {
                console.warn('Failed to load user settings:', e);
                this.userSettings = {};
            }
        } else {
            this.userSettings = {};
        }
    }
    
    saveUserSettings() {
        localStorage.setItem('dami_user_settings', JSON.stringify(this.userSettings));
    }
    
    mergeSettings() {
        // دمج الإعدادات المحفوظة مع الإعدادات الافتراضية
        for (const key in this.userSettings) {
            if (key in this.config) {
                this.config[key] = this.userSettings[key];
            }
        }
    }
    
    updateUserSetting(category, key, value) {
        if (!this.userSettings[category]) {
            this.userSettings[category] = {};
        }
        this.userSettings[category][key] = value;
        this.saveUserSettings();
        this.mergeSettings();
    }
    
    getApiUrl(action, params = {}) {
        const url = new URL(`${this.config.API_SERVER.BASE_URL}/player_api.php`);
        url.searchParams.append('username', this.config.API_SERVER.USERNAME);
        url.searchParams.append('password', this.config.API_SERVER.PASSWORD);
        url.searchParams.append('action', action);
        
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
        
        return url.toString();
    }
    
    getStreamUrl(type, streamId, extension = "m3u8") {
        return `${this.config.API_SERVER.BASE_URL}/${type}/${this.config.API_SERVER.USERNAME}/${this.config.API_SERVER.PASSWORD}/${streamId}.${extension}`;
    }
    
    getProxyUrl(url) {
        if (this.config.SECURITY.ENABLE_PROXY) {
            return `${this.config.SECURITY.PROXY_URL}${encodeURIComponent(url)}`;
        }
        return url;
    }
}

// تصدير الكلاس والإعدادات
const configManager = new ConfigManager();
const CONFIG = configManager.config;
