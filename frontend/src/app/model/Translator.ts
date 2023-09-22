export class Translator {
    id!: number;
    address!: {
        city: string;
        id: number;
        postalCode: number;
        state: string;
        street: string;
    };
    age!: number;
    cin!: number;
    description!: number;
    gender!: string;
    image!: string;
    phone!: number;
    price!: number;
    scheduleAppointment!: Object;
    user!: {
        email: string;
        id: number;
        userName: string;
        profile: boolean;
    };

}
