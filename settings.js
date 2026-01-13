// settings.js - إدارة الإعدادات مع التخزين المحلي
class SettingsManager {
    constructor() {
        this.defaultConfig = {
            server: {
                base: "http://ottpro.iptvpro2.com:8789",
                user: "Oujakr12",
                pass: "87593226"
            },
            proxyEnabled: true,
            maxItems: 50,
            theme: "gold"
        };
        
        this.loadSettings();
    }
    
    loadSettings() {
        const saved = localStorage.getItem('damiXSettings');
        if (saved) {
            this.config = { ...this.defaultConfig, ...JSON.parse(saved) };
        } else {
            this.config = this.defaultConfig;
        }
        return this.config;
    }
    
    saveSettings(newSettings) {
        this.config = { ...this.config, ...newSettings };
        localStorage.setItem('damiXSettings', JSON.stringify(this.config));
        return this.config;
    }
    
    getApiUrl(action, categoryId = null) {
        let url = `${this.config.server.base}/player_api.php?username=${this.config.server.user}&password=${this.config.server.pass}&action=${action}`;
        if (categoryId && categoryId !== 'all') {
            url += `&category_id=${categoryId}`;
        }
        return url;
    }
    
    updateServerInfo(host, port, user, pass) {
        return this.saveSettings({
            server: {
                base: `http://${host}:${port}`,
                user: user,
                pass: pass
            }
        });
    }
}

// إنشاء نسخة عامة للمدير
const settingsManager = new SettingsManager();
