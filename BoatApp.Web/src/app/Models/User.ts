export class User {
    constructor(public login: string,
        public firstName: string,
        public lastName: string,
        public roles: string[],
        public token: string,

    ) { }
    
    public HasRole(role: string):boolean {
        return this.roles.includes(role);
    }
}