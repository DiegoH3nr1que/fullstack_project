$(document).ready(function() {
    const resultsContainer = $('#results-container');

    $('form').submit(function(event) {
        event.preventDefault();
        const query = $('input[name="q"]').val();

        $.get('/api/search/?q=' + query, function(data) {
            resultsContainer.empty();

            if (data.length) {
                data.forEach(game => {
                    const gameCard = `
                        <div class="game-card">
                            <h2>${game.name}</h2>
                            <img src="${game.background_image}" alt="${game.name}">
                            <button class="review-button" data-game-slug="${game.slug}">Escrever Review</button>
                            <div class="reviews"></div> 
                        </div>
                    `;
                    resultsContainer.append(gameCard);
                });
            } else {
                resultsContainer.html('<p>Nenhum jogo encontrado.</p>');
            }
        });
    });

    // Lidar com o clique no botão "Escrever Review"
    resultsContainer.on('click', '.review-button', function() {
        $(this).siblings('.review-form').toggle(); // Alterna a exibição do formulário
    });

    // Lidar com o envio do formulário de review (AJAX)
    resultsContainer.on('submit', '.review-form form', function(event) {
        event.preventDefault();
        var form = $(this);
        var gameSlug = form.find('input[name="game_slug"]').val();
        var rating = form.find('input[name="rating"]:checked').val();
        var text = form.find('textarea[name="text"]').val();

        $.ajax({
            url: form.attr('action'),
            type: 'POST',
            data: {
                game_slug: gameSlug,
                rating: rating,
                text: text,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            success: function(response) {
                // Adicione o novo review ao card do jogo
                const reviewHtml = `
                    <div class="review">
                        <div class="rating">
                            ${[...Array(5)].map((_, i) => `<i class="fas fa-star ${i < response.rating ? 'checked' : ''}"></i>`).join('')}
                        </div>
                        <p>${response.text}</p>
                    </div>
                `;
                form.closest('.game-card').find('.reviews').append(reviewHtml);
                form.hide(); // Ocultar o formulário após o envio
            },
            error: function(xhr, status, error) {
                // Lidar com erros (opcional)
                console.error(error);
            }
        });
    });
});
