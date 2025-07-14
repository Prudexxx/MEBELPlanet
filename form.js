   document.addEventListener('DOMContentLoaded', function() {
                // Обработка бокового меню
                const contactBtn = document.getElementById('contact-btn');
                const telegramBtn = document.getElementById('telegram-btn');
                const whatsappBtn = document.getElementById('whatsapp-btn');
                const vkBtn = document.getElementById('vk-btn');
                
                const contactForm = document.getElementById('contact-form');
                const telegramButton = document.getElementById('telegram-button');
                const whatsappButton = document.getElementById('whatsapp-button');
                const vkButton = document.getElementById('vk-button');
                
                // Показываем элементы при наведении
                contactBtn.addEventListener('click', function() {
                    if (contactForm.classList.contains('active')) {
                        contactForm.classList.remove('active');
                    } else {
                        hideAllPanels();
                        contactForm.classList.add('active');
                    }
                });

                telegramBtn.addEventListener('click', function() {
                    if (telegramButton.classList.contains('active')) {
                        telegramButton.classList.remove('active');
                    } else {
                        hideAllPanels();
                        telegramButton.classList.add('active');
                    }
                });

                whatsappBtn.addEventListener('click', function() {
                    if (whatsappButton.classList.contains('active')) {
                        whatsappButton.classList.remove('active');
                    } else {
                        hideAllPanels();
                        whatsappButton.classList.add('active');
                    }
                });

                vkBtn.addEventListener('click', function() {
                    if (vkButton.classList.contains('active')) {
                        vkButton.classList.remove('active');
                    } else {
                        hideAllPanels();
                        vkButton.classList.add('active');
                    }
                });
                
                // Скрываем при уходе курсора
                [contactForm, telegramButton, whatsappButton, vkButton].forEach(element => {
                    element.addEventListener('mouseleave', function() {
                        setTimeout(() => {
                            if (!isHoveringAnyButton()) {
                                hideAllPanels();
                            }
                        }, 300);
                    });
                });
                
                // Отправка формы
                const notification = document.getElementById('notification');
                
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const name = document.getElementById('user-name').value.trim();
                    const phone = document.getElementById('user-phone').value.trim();
                    const message = document.getElementById('user-message').value.trim();
                    const privacy = document.getElementById('privacy').checked;
                    
                    if (!name || !phone || !privacy) {
                        alert('Пожалуйста, заполните все обязательные поля и согласитесь с политикой конфиденциальности');
                        return;
                    }
                    
                    // Здесь нужно указать ваш Telegram бот токен и chat_id
                    const telegramBotToken = 'YOUR_BOT_TOKEN';
                    const chatId = 'YOUR_CHAT_ID';
                    const text = `Новая заявка:\nИмя: ${name}\nТелефон: ${phone}\nСообщение: ${message || 'Не указано'}`;
                    
                    // Отправка в Telegram
                    axios.post(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
                        chat_id: chatId,
                        text: text
                    })
                    .then(response => {
                        // Показываем уведомление
                        notification.classList.add('active');
                        
                        // Очищаем форму
                        contactForm.reset();
                        
                        // Скрываем уведомление через 3 секунды
                        setTimeout(() => {
                            notification.classList.remove('active');
                            hideAllPanels();
                        }, 3000);
                    })
                    .catch(error => {
                        console.error('Ошибка отправки формы:', error);
                        alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
                    });
                });
                
                // Вспомогательные функции
                function hideAllPanels() {
                    contactForm.classList.remove('active');
                    telegramButton.classList.remove('active');
                    whatsappButton.classList.remove('active');
                    vkButton.classList.remove('active');
                }
                
                function isHoveringAnyButton() {
                    return contactBtn.matches(':hover') || 
                        telegramBtn.matches(':hover') || 
                        whatsappBtn.matches(':hover') || 
                        vkBtn.matches(':hover');
                }

                // Анимация звёздного фона
                const stars = document.querySelector('.stars-bg');
                let rotation = 0;
                
                function animateStars() {
                    rotation += 0.1;
                    stars.style.transform = `rotate(${rotation}deg)`;
                    requestAnimationFrame(animateStars);
                }
                
                animateStars();
            });
