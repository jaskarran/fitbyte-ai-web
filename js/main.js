document.addEventListener('DOMContentLoaded', function() {
    // Star rating functionality
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('rating-value');
    const reviewForm = document.querySelector('.review-form');
    const thankYouMessage = document.querySelector('.thank-you-message');

    // Initialize stars
    if (stars.length > 0) {
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.getAttribute('data-rating');
                ratingInput.value = rating;
                
                // Update star display
                stars.forEach(s => {
                    s.classList.toggle('active', s.getAttribute('data-rating') <= rating);
                });
            });
        });
    }

    // Form submission
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For now, we'll just show the thank you message
            reviewForm.style.display = 'none';
            if (thankYouMessage) {
                thankYouMessage.style.display = 'block';
            }
            
            // Reset form
            this.reset();
            if (stars.length > 0) {
                stars.forEach(star => star.classList.remove('active'));
            }
            if (ratingInput) {
                ratingInput.value = '0';
            }
            
            // Scroll to thank you message
            if (thankYouMessage) {
                thankYouMessage.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
