document.getElementById('contactForm').addEventListener('submit', function (e) {
	e.preventDefault();
	const form = e.target;

	const formData = {
		name: document.getElementById('name').value,
		email: document.getElementById('email').value,
		message: document.getElementById('message').value,
	};

	const subject = `Сообщение от ${formData.name}`;
	const body = `${formData.message}\n\n---\nОтправитель: ${formData.name}\nEmail: ${formData.email}`;

	try {
		const mailruUrl = `https://e.mail.ru/compose/?to=sashamogil@bk.ru&subject=${encodeURIComponent(
			subject
		)}&body=${encodeURIComponent(body)}`;
		window.open(mailruUrl, '_blank');

		// setTimeout(() => {
		// 	const mailtoUrl = `mailto:sashamogil@bk.ru?subject=${encodeURIComponent(
		// 		subject
		// 	)}&body=${encodeURIComponent(body)}`;
		// 	window.location.href = mailtoUrl;
		// }, 200);  ------------------------------------------------на случай если mail не работает, можно раскомментить и будет через альтер версии проходить

		form.reset();
	} catch (error) {
		form.classList.remove('form-loading');
		form.classList.add('form-error');
		showToast('Ошибка при открытии почты');
		console.error('Ошибка отправки формы:', error);

		setTimeout(() => {
			form.classList.remove('form-error');
		}, 3000);
	}
});
