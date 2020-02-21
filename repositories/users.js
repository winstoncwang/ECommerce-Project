const fs = require('fs');
const crypto = require('crypto');

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

	//create new users and push to currentRecords
	async create (attrs) {
		//read existing json file
		const currentRecords = await this.getAll();
		attrs.id = this.randomID();
		currentRecords.push(attrs);

		await this.writeAll(currentRecords);
	}

	//write all to data store
	async writeAll (currentRecords) {
		await fs.promises.writeFile(
			this.filename,
			JSON.stringify(currentRecords, null, 2) // format with null for custom formater, 2 for indentation
		);
	}

	//getOne(id)
	async getOne (id) {
		//read users.json
		const currentRecords = await this.getAll();
		//array.find()
		return currentRecords.find((record) => record.id === id);
	}

	//delete(id)
	async delete (id) {
		//read users.json
		const currentRecords = await this.getAll();
		//delete record
		const filteredRecords = currentRecords.filter(
			(record) => record.id !== id
		);

		await this.writeAll(filteredRecords);
	}

	//update (id,attrs)
	async update (id, attrs) {
		//read in all users
		const currentRecords = await this.getAll();
		//find user with id
		const record = currentRecords.find((record) => record.id === id);
		// if not find notify
		if (!record) {
			throw new Error(`Record with id of ${id} not found.`);
		}

		//update attrs
		Object.assign(record, attrs); //since we are mutating the record object, we are essentially changing currentRecords, so we dont have to add new object, we can push original array of object.

		//write all
		await this.writeAll(currentRecords);
	}

	randomID () {
		return crypto.randomBytes(5).toString('hex'); //we are not using callbacks, hence this is not async
	}
}

const test = async () => {
	const repo = new UsersRepository('users.json');
	await repo.update('5cb71a8d53', { password: 'asdu' });
};

test();
