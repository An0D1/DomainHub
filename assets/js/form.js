/**
 * @file Обработка формы обратной связи на сайте DomainHub
 * @author Студент группы ИС-34
 * @version 1.0.0
 * @see https://e.mail.ru/ - используется для отправки через Mail.ru
 */

/**
 * Объект с данными формы
 * @typedef {Object} FormData
 * @property {string} name - Имя пользователя
 * @property {string} email - Email пользователя
 * @property {string} message - Текст сообщения
 */

/**
 * Обработчик отправки формы обратной связи
 * Перехватывает стандартное поведение формы, собирает данные
 * и открывает Mail.ru с заполненными полями письма
 * 
 * @param {Event} e - Событие отправки формы
 * @this {HTMLFormElement} - Форма, на которой сработало событие
 * @returns {void} Ничего не возвращает, только выполняет действия
 */
document.getElementById('contactForm').addEventListener('submit', function (e) {
    // Предотвращаем стандартную отправку формы (перезагрузку страницы)
    e.preventDefault();
    
    // Получаем ссылку на форму
    const form = e.target;

    /**
     * Собираем данные из полей формы
     * @type {FormData}
     */
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
    };

    /**
     * Формируем тему письма
     * @type {string}
     */
    const subject = `Сообщение от ${formData.name}`;

    /**
     * Формируем тело письма с подписью
     * @type {string}
     */
    const body = `${formData.message}\n\n---\nОтправитель: ${formData.name}\nEmail: ${formData.email}`;

    /**
     * Пытаемся открыть Mail.ru с предзаполненными полями
     * Если не получится, ловим ошибку в catch
     */
    try {
        /**
         * URL для отправки через Mail.ru
         * @type {string}
         */
        const mailruUrl = `https://e.mail.ru/compose/?to=sashamogil@bk.ru&subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(body)}`;
        
        // Открываем Mail.ru в новой вкладке
        window.open(mailruUrl, '_blank');

        /**
         * Закомментированный fallback-вариант через mailto:
         * Используется, если Mail.ru недоступен
         * @see mailto: - стандартный протокол для почтовых клиентов
         */
        // setTimeout(() => {
        //   const mailtoUrl = `mailto:sashamogil@bk.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        //   window.location.href = mailtoUrl;
        // }, 200);

        // Очищаем форму после успешной отправки
        form.reset();
    } catch (error) {
        /**
         * Обработка ошибки при открытии почты
         * @param {Error} error - Объект ошибки
         */
        console.error('Ошибка отправки формы:', error);
        
        // Здесь можно добавить показ уведомления пользователю
        // showToast('Ошибка при открытии почты');
    }
});
