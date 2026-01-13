// config.js - ملف إعدادات الاتصال
const ServerConfig = {
    // معلومات الاتصال بالسيرفر Xtream
    API: {
        base: "http://ottpro.iptvpro2.com:8789",
        user: "Oujakr12",
        pass: "87593226"
    },
    
    // إعدادات المشغل
    Player: {
        autoplay: true,
        controls: true,
        quality: {
            default: 720,
            options: [360, 480, 720, 1080]
        }
    },
    
    // إعدادات الواجهة
    UI: {
        appName: "DAMI X-PRO",
        themeColor: "#d4af37",
        maxItemsPerPage: 50,
        logoUrl: "https://via.placeholder.com/150"
    },
    
    // إعدادات الأمان
    Security: {
        blockChrome: true,
        allowedBrowsers: ["firefox", "safari", "edge"],
        proxyEnabled: true,
        proxyUrl: "https://api.allorigins.win/get?url="
    }
};

// يمكنك أيضًا استخدام هذا النمط إذا أردت ديناميكية أكثر
class IPTVConfig {
    constructor() {
        this.server = {
            host: "ottpro.iptvpro2.com",
            port: 8789,
            username: "Oujakr12",
            password: "87593226",
            protocol: "http"
        };
        
        this.endpoints = {
            player_api: "/player_api.php",
            live: "/live",
            movie: "/movie",
            series: "/series"
        };
    }
    
    getBaseUrl() {
        return `${this.server.protocol}://${this.server.host}:${this.server.port}`;
    }
    
    getApiUrl(action) {
        return `${this.getBaseUrl()}/player_api.php?username=${this.server.username}&password=${this.server.password}&action=${action}`;
    }
    
    getStreamUrl(type, streamId, extension = "m3u8") {
        return `${this.getBaseUrl()}/${type}/${this.server.username}/${this.server.password}/${streamId}.${extension}`;
    }
}

// تصدير الإعدادات للاستخدام
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ServerConfig, IPTVConfig };
}
