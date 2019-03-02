export class User {
    constructor(
        public nome: string,
        public email: string,
        public rua: string,
        public cep: string,
        public numero: number,
        public complemento: string,
        public bairro: string,
        public cidade: string, 
        public estado: string
    ) {}
}