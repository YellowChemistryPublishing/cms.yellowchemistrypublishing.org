export class UserProfile {
    vendor: string | null = null;
    vendorToken: string | null = null;
    vendorData: unknown = null; // Data the authentication vendor has on you, i.e. GitHub.
    data: unknown = null; // Data we have on you.
    readonly magicSchema: number;

    constructor(loadLocal: boolean = false) {
        this.magicSchema = 1;
        if (loadLocal) {
            try {
                const profileSerialized: string | null = localStorage.getItem("profile");
                const profile: UserProfile | null = profileSerialized ? (JSON.parse(profileSerialized) as unknown as UserProfile) : null;
                if (profile?.magicSchema === this.magicSchema) {
                    if (profile.vendorToken && profile.vendor) {
                        this.vendorToken = profile.vendorToken;
                        this.vendor = profile.vendor;
                    }
                    if (profile.vendorData && profile.data) {
                        this.vendorData = profile.vendorData;
                        this.data = profile.data;
                    }
                }
            } catch {
                this.clear();
            }
        }
    }

    empty(): boolean {
        return !this.vendorToken || !this.vendor;
    }
    resolved(): boolean {
        return !!this.vendorToken && !!this.vendor && !!this.vendorData && !!this.data;
    }
    clear(): void {
        this.vendorToken = null;
        this.vendor = null;
        this.vendorData = null;
        this.data = null;
    }
    sync(): void {
        if (this.empty()) localStorage.removeItem("profile");
        else localStorage.setItem("profile", JSON.stringify(this));
    }

    async fetchAssignUserData(): Promise<void> {
        if (this.empty()) {
            throw Error("User profile is empty, please log in.");
        }

        const res: Response = await fetch(`https://api.yellowchemistrypublishing.org/iam?fvd=${this.vendor!}`, {
            headers: { Authorization: this.vendorToken! }
        });
        const data: { login: string | null; message: string | null } = (await res.json()) as unknown as { login: string | null; message: string | null };
        if (!res.ok) {
            const debugLoginToken: string | null = this.vendorToken;
            this.clear();
            this.sync();
            throw Error(
                `Invalid \`this.vendorToken\`, please log in again. (\`this.vendorToken\` was "${debugLoginToken ?? "null"}", response was ${res.status.toString()}: ${data.message ?? "[empty]"}.)`
            );
        }

        const profile: UserProfile = (await res.json()) as UserProfile;
        this.vendorData = profile.vendorData;
        this.data = profile.data;
        if (this.magicSchema != profile.magicSchema) {
            this.clear();
            this.sync();
            throw Error("Wrong user data schema, you should log in again.");
        }
    }
}

export function isExpectingRedirect(): boolean {
    return new URLSearchParams(window.location.search).has("code");
}
