document.addEventListener("DOMContentLoaded", () => {

    const players = document.querySelectorAll(".video-card");

    function formatTime(seconds) {
        if (!Number.isFinite(seconds)) return "0:00";

        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);

        return `${mins}:${secs.toString().padStart(2, "0")}`;
    }

    function pauseOtherVideos(currentVideo) {
        document.querySelectorAll(".portfolio-video").forEach(video => {
            if (video !== currentVideo && !video.paused) {
                video.pause();
            }
        });
    }

    players.forEach(player => {

        const video = player.querySelector(".portfolio-video");
        const centerButton = player.querySelector(".video-center");
        const playButton = player.querySelector(".video-toggle");
        const muteButton = player.querySelector(".video-mute");
        const fullscreenButton = player.querySelector(".video-fullscreen");

        const progress = player.querySelector(".video-progress");
        const progressFill = player.querySelector(".video-progress-fill");
        const time = player.querySelector(".video-time");

        if (!video) return;

        /*
         * Начальное состояние
         */
        video.muted = true;
        video.playsInline = true;

        function updatePlayButton() {
            const playing = !video.paused && !video.ended;

            player.classList.toggle("is-playing", playing);

            if (playButton) {
                playButton.textContent = playing ? "Ⅱ" : "▶";
            }

            if (centerButton) {
                const icon = centerButton.querySelector("span");

                if (icon) {
                    icon.textContent = playing ? "Ⅱ" : "▶";
                }
            }
        }

        function updateMuteButton() {
            if (!muteButton) return;

            muteButton.textContent =
                video.muted || video.volume === 0
                    ? "🔇"
                    : "🔊";
        }

        function updateProgress() {

            if (!video.duration || !Number.isFinite(video.duration)) {
                if (time) {
                    time.textContent = "0:00 / 0:00";
                }

                return;
            }

            const percent =
                (video.currentTime / video.duration) * 100;

            if (progressFill) {
                progressFill.style.width = percent + "%";
            }

            if (time) {
                time.textContent =
                    `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
            }
        }

        async function togglePlayback() {

            if (video.paused) {

                pauseOtherVideos(video);

                try {
                    await video.play();
                } catch (error) {
                    console.error("Ошибка воспроизведения:", error);
                }

            } else {

                video.pause();
            }
        }

        /*
         * PLAY / PAUSE
         */
        playButton?.addEventListener("click", event => {
            event.stopPropagation();
            togglePlayback();
        });

        centerButton?.addEventListener("click", event => {
            event.stopPropagation();
            togglePlayback();
        });

        /*
         * Клик прямо по видео
         */
        video.addEventListener("click", togglePlayback);

        /*
         * MUTE
         */
        muteButton?.addEventListener("click", event => {

            event.stopPropagation();

            video.muted = !video.muted;

            /*
             * Иногда браузер держит volume = 0.
             */
            if (!video.muted && video.volume === 0) {
                video.volume = 1;
            }

            updateMuteButton();
        });

        /*
         * PROGRESS BAR
         */
        progress?.addEventListener("click", event => {

            event.stopPropagation();

            if (!video.duration) return;

            const rect = progress.getBoundingClientRect();

            const position =
                (event.clientX - rect.left) /
                rect.width;

            video.currentTime =
                Math.max(0, Math.min(1, position)) *
                video.duration;
        });

        /*
         * FULLSCREEN
         */
        fullscreenButton?.addEventListener("click", async event => {

            event.stopPropagation();

            try {

                /*
                 * Выход из fullscreen
                 */
                if (document.fullscreenElement) {

                    await document.exitFullscreen();
                    return;
                }

                /*
                 * Chrome / Edge / Firefox
                 */
                if (player.requestFullscreen) {

                    await player.requestFullscreen();
                    return;
                }

                /*
                 * Safari
                 */
                if (player.webkitRequestFullscreen) {

                    player.webkitRequestFullscreen();
                    return;
                }

                /*
                 * iPhone Safari
                 */
                if (video.webkitEnterFullscreen) {

                    video.webkitEnterFullscreen();
                }

            } catch (error) {

                console.error(
                    "Fullscreen error:",
                    error
                );

            }

        });

        /*
         * СОБЫТИЯ VIDEO
         */

        video.addEventListener("play", updatePlayButton);

        video.addEventListener("pause", updatePlayButton);

        video.addEventListener("ended", updatePlayButton);

        video.addEventListener("timeupdate", updateProgress);

        video.addEventListener("durationchange", updateProgress);

        video.addEventListener("loadedmetadata", () => {

            updateProgress();

            /*
             * Если файл реально загрузился —
             * скрываем заглушку SHOWREEL.
             */
            player.classList.add("has-video");

        });

        /*
         * Очень полезно для поиска проблем.
         */
        video.addEventListener("error", () => {

            const error = video.error;

            console.error(
                "Не удалось загрузить видео:",
                video.currentSrc,
                error
            );

        });

        updatePlayButton();
        updateMuteButton();
        updateProgress();

    });


    /*
     * Плавная навигация
     */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const selector =
                link.getAttribute("href");

            if (!selector || selector === "#") {
                return;
            }

            const target =
                document.querySelector(selector);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        });

    });

	});