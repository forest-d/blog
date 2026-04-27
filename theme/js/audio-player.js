document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.audio-player').forEach(function (player) {
        const audio = player.querySelector('audio');
        const btn = player.querySelector('.audio-player-btn');
        const fill = player.querySelector('.audio-player-progress-fill');
        const bar = player.querySelector('.audio-player-progress');
        const time = player.querySelector('.audio-player-time');

        function fmt(s) {
            if (isNaN(s)) return '0:00';
            const m = Math.floor(s / 60);
            const sec = Math.floor(s % 60);
            return m + ':' + (sec < 10 ? '0' : '') + sec;
        }

        btn.addEventListener('click', function () {
            if (audio.paused) {
                audio.play();
                btn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                audio.pause();
                btn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        audio.addEventListener('timeupdate', function () {
            const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
            fill.style.width = pct + '%';
            time.textContent = fmt(audio.currentTime) + ' / ' + fmt(audio.duration);
        });

        audio.addEventListener('ended', function () {
            btn.innerHTML = '<i class="fas fa-play"></i>';
            fill.style.width = '0%';
            audio.currentTime = 0;
        });

        bar.addEventListener('click', function (e) {
            if (!audio.duration) return;
            const rect = bar.getBoundingClientRect();
            audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
        });
    });
});
