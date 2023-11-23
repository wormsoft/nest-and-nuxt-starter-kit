export class ArgumentError extends Error {
    constructor(message: string = 'invalid argument', name?: string, value?: never) {
        if (name && value) {
            super(`${message} (${name}: ${value})`);
            return;
        }

        super(message);
    }
}
