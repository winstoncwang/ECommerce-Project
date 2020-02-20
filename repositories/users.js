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
		const users = await this.getAll();
		//array.find()
		return users.find((user) => user.id === id);
	}

	randomID () {
		return crypto.randomBytes(5).toString('hex'); //we are not using callbacks, hence this is not async
	}
}

const test = async () => {
	const repo = new UsersRepository('users.json');
	const user = await repo.getOne('ffac6d61a5');
	console.log(user);
};

test();
