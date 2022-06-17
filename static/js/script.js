let fileData = document.getElementById('simpleFile');
let fileSubmit = document.getElementById('submit');

fileSubmit.onclick = async (e) => {
	e.preventDefault();

	let data = new FormData();
	data.append('photo', fileData.files[0]);

	await fetch(
		'https://file-upload-api-leapfrog.herokuapp.com/fileHandle/upload',
		{
			method: 'POST',

			body: data,
		}
	);

	location.reload();
};

window.onload = async () => {
	let root = document.getElementById('root');
	root.style.display = 'flex';
	root.style.flexWrap = 'wrap';

	try {
		let val = await (
			await fetch(
				'https://file-upload-api-leapfrog.herokuapp.com/fileHandle/data'
			)
		).json();

		for (let i in val) {
			let path = await (
				await fetch(
					`https://file-upload-api-leapfrog.herokuapp.com/fileHandle/file/${val[i]}`
				)
			).json();

			let img = document.createElement('img');
			img.style.width = '25%';
			img.src = `http://${path.path}`;
			img.style.padding = '2%';

			root.appendChild(img);
		}
	} catch (e) {
		root.innerHTML = e;
	}
};
