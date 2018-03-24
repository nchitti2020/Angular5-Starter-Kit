export class User {
    public userId: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public avatarUrl?: string;
    public creationDate?: string;
    public preferredLang?: string;
    public connected = false;
    public password?: string;
    public classes: Array<any> = [];

    public constructor(data: any = {}) {
        this.userId = data.userId || '';
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.email = data.email || '';
        this.avatarUrl = data.avatarUrl || '';
        this.creationDate = data.creation_date || Date.now();
        this.preferredLang = data.preferredLang || null;
        this.connected = data.connected || false;
        this.password = data.password || '';
        this.classes = data.classes || [];
    }
}

