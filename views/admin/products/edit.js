const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors, product }) => {
	return layout({
		content : `
    <form method="POST" enctype="multipart/form-data">
        <input type="text" value="${product.title}" name="title"/>
        ${getError(errors, 'title')}
        <input type="text" value="${product.price}" name="price"/>
        ${getError(errors, 'price')}
        <input type="file" name="image" value="${product.image}"/>
        <button>Submit</button>
    </form>
    `
	});
};
