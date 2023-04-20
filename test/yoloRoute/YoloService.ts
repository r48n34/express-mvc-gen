import { Knex } from 'knex';
export class YoloService {
    constructor(private knex: Knex) {}
    async getUser(): Promise<object[]> {
        return await this.knex.select('*').from('users');
    }
}
