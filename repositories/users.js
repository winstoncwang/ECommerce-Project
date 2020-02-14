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
		const fileData = await fs.promises.readFile(this.filename, {
			encoding : 'utf8'
		});
		//read its content
		//parse json data
		const data = JSON.parse(fileData);
		//return json data
		return data;
	}
}

const test = async () => {
	const repo = new UsersRepository('users.json');
	const users = await repo.getAll();
	console.log(users);
};

test();
