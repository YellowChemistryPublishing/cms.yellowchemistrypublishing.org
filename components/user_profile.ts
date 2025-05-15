export class UserProfile {
    loginToken: string | null = null;
    type: string | null = null;

    displayName: string | null = null;
    data: unknown = null;

    constructor(fetch: boolean = false) {
        if (fetch) {
            try {
                const profileSerialized: string | null = localStorage.getItem("profile");
                const profile: UserProfile | null = profileSerialized ? (JSON.parse(profileSerialized) as unknown as UserProfile) : null;
                if (profile?.loginToken && profile.type) {
                    this.loginToken = profile.loginToken;
                    this.type = profile.type;
                }
                if (profile?.displayName && profile.data) {
                    this.displayName = profile.displayName;
                    this.data = profile.data;
                }
            } catch {
                this.clear();
            }
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
            throw Error("User profile is empty, please log in.");
        }

        const res: Response = await fetch("https://api.github.com/user", {
            headers: { Accept: "application/vnd.github+json", Authorization: this.loginToken! }
        });
        const data: { login: string | null; message: string | null } = (await res.json()) as unknown as { login: string | null; message: string | null };
        if (!res.ok) {
            const debugLoginToken: string | null = this.loginToken;
            this.clear();
            this.sync();
            throw Error(
                `Invalid \`this.loginToken\`, please log in again. (\`this.loginToken\` was "${debugLoginToken ?? "null"}", response was ${res.status.toString()}: ${data.message ?? "[empty]"}.)`
            );
        }

        this.type = "gh";
        this.displayName = data.login;
        this.data = data;
    }
}

export function isExpectingRedirect(): boolean {
    return new URLSearchParams(window.location.search).has("code");
}
