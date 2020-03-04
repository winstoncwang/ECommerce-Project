const fs = require('fs');
const crypto = require('crypto');
const util = require('util');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository {
	constructor (filename) {
		if (!filename) {
			throw new Error('Creating a repository requires a filename');
		}

		this.filename = filename;
		//async function cannot be used inside contructor
		//fs throws error
		try {
			fs.accessSync(this.filename);
		} catch (err) {
			fs.writeFileSync(this.filename, '[]');
		}
	}

	//shows all users
	async getAll () {
		//open the file called this.filename
		//read its content
		//parse json data
		//return json data
		return JSON.parse(
			await fs.promises.readFile(this.filename, {
				encoding : 'utf8'
			})
		);
	}

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
		const hashSupplied = await scrypt(supplied, salt, 64);

		return hashed === hashSupplied; //remember hashed includes hash+random salt. so dont use saved.
	}

	//write all to data store
	async writeAll (allRecords) {
		await fs.promises.writeFile(
			this.filename,
			JSON.stringify(allRecords, null, 2) // format with null for custom formater, 2 for indentation
		);
	}

	//getOne(id)
	async getOne (id) {
		//read users.json
		const allRecords = await this.getAll();
		//array.find()
		return allRecords.find((record) => record.id === id);
	}

	//delete(id)
	async delete (id) {
		//read users.json
		const allRecords = await this.getAll();
		//delete record
		const filteredRecords = allRecords.filter((record) => record.id !== id);

		await this.writeAll(filteredRecords);
	}

	//update (id,attrs)
	async update (id, attrs) {
		//read in all users
		const allRecords = await this.getAll();
		//find user with id
		const record = allRecords.find((record) => record.id === id);
		// if not find notify
		if (!record) {
			throw new Error(`Record with id of ${id} not found.`);
		}

		//update attrs
		Object.assign(record, attrs); //since we are mutating the record object, we are essentially changing allRecords, so we dont have to add new object, we can push original array of object.

		//write all
		await this.writeAll(allRecords);
	}

	//getOneBy()
	/* 
	Returns the object that satisfies the filter strictly checked for both key and value pair.
	As long as the key-value is equal, return user. No of filter is inaffective.
	@param {Object} key value pair for email etc
	@returns {Object} return user object
	*/

	async getOneBy (filters) {
		const allRecords = await this.getAll();
		for (let user of allRecords) {
			let found = true;

			for (let key in filters) {
				if (user[key] !== filters[key]) {
					found = false;
				}
			}
			if (found) {
				return user;
			}
		}
	}

	randomID () {
		return crypto.randomBytes(5).toString('hex'); //we are not using callbacks, hence this is not async
	}
}

module.exports = new UsersRepository('users.json');
