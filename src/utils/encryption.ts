import * as CryptoJS from 'crypto-js';
import { createCipheriv as encryptCipheriv, createDecipheriv as decryptDecipheriv, randomBytes } from 'crypto';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

const result = dotenv.config();
const SECRET = '8080808080808080';
const encryptionType = 'aes-128-cbc';
const EtoEncryption = {
	decrypt: (req: Request, res: Response, next: NextFunction) => {
		try{

		const { Data } = req.body;
		const key = CryptoJS.enc.Utf8.parse(SECRET);
		const iv = CryptoJS.enc.Utf8.parse(SECRET);
		const decrypted = CryptoJS.AES.decrypt(Data, key, {
			keySize: 128 / 8,
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7,
		});
		req.body = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
		next();
	}catch(err){
		let error = {
			message:'Invalid Encryption Sent in Request Body',
			data:null,
			status:400
		}
		res.send(error);
	}

	},
	encrypt: (req: Request, res: Response, next: NextFunction) => {
		const encryptedData = EtoEncryption.encryptCustom(JSON.stringify(req.body));
		const jsString = JSON.stringify({ Data: encryptedData });
	    res.send(jsString);
	},

	encryptData: (string: any) => {
		const encryptedData = EtoEncryption.encryptCustom(JSON.stringify(string));
		const jsString = JSON.stringify({ Data: encryptedData });
	    return jsString;
	},

	encryptCustom: (text: string) => {
		const SECRET: any = process.env.ENCRYPTION_SECRET;
		const key = CryptoJS.enc.Utf8.parse(SECRET);
		const iv = CryptoJS.enc.Utf8.parse(SECRET);

		const encryptedlogin = CryptoJS.AES.encrypt(
			CryptoJS.enc.Utf8.parse(text),
			key,
			{
				keySize: 128 / 8,
				iv: iv,
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.Pkcs7,
			}
		);

		return encryptedlogin.toString();
	},
	defaultEncrypt: (req: Request, res: Response, next: NextFunction) => {  
		let plainText = JSON.stringify(req.body), key=SECRET, iv=SECRET
		let cipher = encryptCipheriv(encryptionType, key, iv);  
		let encrypted = cipher.update(plainText);     
		encrypted = Buffer.concat([encrypted, cipher.final()]);       
		return {		  
		  Data: encrypted.toString('base64'), //Buffer to Hex
		};
   },
	defaultDecrypt: (req: Request, res: Response, next: NextFunction) => {
		let encryptedData = req.body.Data;		
		let iv = SECRET, key = SECRET;
		let encryptedText = Buffer.from(encryptedData, 'base64'); //Hex to Buffer    
			
		let decipher = decryptDecipheriv(encryptionType, key, iv);
		let decrypted = decipher.update(encryptedText);
		decrypted = Buffer.concat([decrypted, decipher.final()]);    
		return JSON.parse(decrypted.toString());
	   }
};
export default EtoEncryption;
