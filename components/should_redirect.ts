export class ShouldRedirect {
    redirPath: string | null;

    constructor(redirPath: string | null | undefined = undefined) {
        if (redirPath === undefined) this.redirPath = localStorage.getItem("redir");
        else this.redirPath = redirPath;
    }

    hasRedir(): boolean {
        return !!this.redirPath;
    }
    sync(): void {
        if (this.redirPath) localStorage.setItem("redir", this.redirPath);
        else localStorage.removeItem("redir");
    }

    redirectRegardless(): void {
        if (this.hasRedir()) window.location.href = window.location.protocol + "//" + window.location.host + this.redirPath!;
        else window.location.href = window.location.protocol + "//" + window.location.host;
    }
}
