document.addEventListener('DOMContentLoaded', () => {
	const home = document.querySelector('body');
	const input = document.querySelector('input');
	const savedTheme = localStorage.getItem('theme') || 'light';
	const aboutPs = document.querySelectorAll('.aboutPs');
	const posts = document.querySelectorAll('.post__article');
	const aboutLis = document.querySelectorAll('.aboutLis');
	const createTitle = document.querySelector('.create__title');
	const infoArticleText = document.querySelector('.article');
	const delArticleText = document.querySelector('.delArticle');
	const burgerBtn = document.querySelector('.burger__btn');
	const burgerList = document.querySelector('.burger__list');

	let isOpenMenu = false;

	burgerBtn.addEventListener('click', () => {
		burgerList.style.display = isOpenMenu ? 'none' : 'block';
		isOpenMenu = !isOpenMenu;
	});

	const applyTheme = (theme) => {
		const isDark = theme === 'dark';
		home.style.background = isDark ? '#333' : '#eee';
		const color = isDark ? 'white' : 'black';
		if (createTitle) {
			createTitle.style.color = isDark ? 'white' : 'black';
		}
		if (infoArticleText) {
			infoArticleText.style.color = isDark ? 'white' : 'black';
		}
		if (delArticleText) {
			delArticleText.style.color = isDark ? 'white' : 'black';
		}

		[...posts, ...aboutPs, ...aboutLis].forEach((el) => {
			el.style.color = color;
		});
		input.checked = isDark;
	};

	applyTheme(savedTheme);

	input.addEventListener('click', () => {
		const newTheme = input.checked ? 'dark' : 'light';
		localStorage.setItem('theme', newTheme);
		applyTheme(newTheme);
	});
});
