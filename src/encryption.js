import * as CryptoJS from 'crypto-js';
import { createCipheriv as encryptCipheriv, createDecipheriv as decryptDecipheriv, randomBytes } from 'crypto';
import * as dotenv from 'dotenv';


const result = dotenv.config();
const SECRET = '8080808080808080';
const encryptionType = 'aes-128-cbc';
const EtoEncryption = {
	defaultEncrypt: (req, res, next) => {  
		let plainText = JSON.stringify(req.body), key=SECRET, iv=SECRET
		let cipher = encryptCipheriv(encryptionType, key, iv);  
		let encrypted = cipher.update(plainText);     
		encrypted = Buffer.concat([encrypted, cipher.final()]);       
		return {		  
		  Data: encrypted.toString('base64'), //Buffer to Hex
		};
   },

	
	defaultDecrypt: (req, res, next) => {
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
