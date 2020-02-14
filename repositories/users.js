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
		return (fileData = JSON.parse(
			await fs.promises.readFile(this.filename, {
				encoding : 'utf8'
			})
		));
	}
}

const test = async () => {
	const repo = new UsersRepository('users.json');
	const users = await repo.getAll();
	console.log(users);
};

test();
