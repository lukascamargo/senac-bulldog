import crypto from 'crypto';


export async function encryptPassword(password: string) {
    return crypto.createHmac('sha256', 'senha').update(password).digest('hex');
}