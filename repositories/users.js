const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
	//create new users and push to allRecords
	async create (attrs) {
		//create salt
		const salt = crypto.randomBytes(8).toString('hex');
		//encrypt password with salt
		const buffer = await scrypt(attrs.password, salt, 64);

		//read existing json file
		const allRecords = await this.getAll();
		attrs.id = this.randomID();
		//push hash+salt password
		const hashedRecord = {
			...attrs,
			password : `${buffer.toString('hex')}.${salt}` //this overwrites the password
		};
		allRecords.push(hashedRecord);

		await this.writeAll(allRecords);

		return hashedRecord; //attrs only include plain password version. So changed from return attrs
	}

	//compare the passwords
	/* @param {Object} saved - saved password hash.salt format from database
	@param {Object} supplied - password from user client
	@return {Boolean} depending on the check result */
	async comparePassword (saved, supplied) {
		//define hash/salt
		const [ hashed, salt ] = saved.split('.');
		const hashSuppliedBuff = await scrypt(supplied, salt, 64); //returns buffer
		return hashed === hashSuppliedBuff.toString('hex'); //remember hashed includes hash+random salt. so dont use saved.
	}
}

module.exports = new UsersRepository('users.json');
