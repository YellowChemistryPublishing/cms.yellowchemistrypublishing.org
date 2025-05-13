export class UserProfile {
    loginToken: string | null = null;
    type: string | null = null;

    displayName: string | null = null;
    data: object | null = null;

    constructor() {
        const profileSerialized = localStorage.getItem("profile");
        const profile = profileSerialized ? JSON.parse(profileSerialized) : null;
        if (profile?.loginToken && profile?.type) {
            this.loginToken = profile.loginToken;
            this.type = profile.type;
        }
        if (profile?.displayName && profile?.data) {
            this.displayName = profile.displayName;
            this.data = profile.data;
        }
    }

    empty(): boolean {
        return !this.loginToken || !this.type;
    }
    resolved(): boolean {
        return !!this.loginToken && !!this.type && !!this.displayName && !!this.data;
    }
    clear(): void {
        this.loginToken = null;
        this.type = null;
        this.displayName = null;
        this.data = null;
    }
    sync(): void {
        if (this.empty()) localStorage.removeItem("profile");
        else localStorage.setItem("profile", JSON.stringify({ loginToken: this.loginToken, type: this.type, displayName: this.displayName, data: this.data }));
    }

    async fetchAssignUserData(): Promise<void> {
        if (this.empty()) {
            await Promise.reject("User profile is empty, please log in.");
        }

        const res = await fetch("https://api.github.com/user", {
            headers: { Accept: "application/vnd.github+json", Authorization: this.loginToken! }
        });
        const data = await res.json();
        if (!res.ok) {
            const debugLoginToken = this.loginToken;
            this.clear();
            this.sync();
            await Promise.reject(
                `Invalid \`this.loginToken\`, please log in again. (\`this.loginToken\` was "${debugLoginToken}", response was ${res.status}: ${data.message ?? "[empty]"}.)`
            );
        }

        this.type = "gh";
        this.displayName = data.login;
        this.data = data;
    }
}

export function isExpectingRedirect(): boolean {
    return new URLSearchParams(window.location.href).has("code");
}
