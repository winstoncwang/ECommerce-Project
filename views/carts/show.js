const layout = require('../layout');

module.exports = ({ items }) => {
	const renderedItem = items
		.map((item) => {
			return `
    <div>${item.product.title} - ${item.product.price}</div>
    `;
		})
		.join('');

	return layout({
		content : `
        <div>${renderedItem}</div>
        `
	});
};
