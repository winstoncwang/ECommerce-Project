const fs = require('fs');

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

	async create (attrs) {
		//read existing json file
		const currentRecords = await this.getAll();
		currentRecords.push(attrs);
		await fs.promises.writeFile(
			this.filename,
			JSON.stringify(currentRecords)
		);
	}
}

const test = async () => {
	const repo = new UsersRepository('users.json');
	await repo.create({
		FirstName  : 'bob',
		SecondName : 'dilly',
		UserName   : 'bobod',
		Password   : 'password'
	});
	const users = await repo.getAll();
	console.log(users);
};

test();
