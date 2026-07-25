<script lang="ts">
    import { onMount } from "svelte";
    import confetti from "canvas-confetti";
    import poemData from "$lib/poem.json";

    interface PoemStanza {
        id: string;
        stanzaNumber: number;
        text: string;
        note?: string;
    }

    interface RawStanzaInput {
        text: string;
        note?: string;
    }

    // Helper function: Auto-generate stanzaNumber and ID from JSON input
    function buildStanzasFromJSON(
        input: (RawStanzaInput | string)[],
    ): PoemStanza[] {
        return input.map((item, index) => {
            const num = index + 1;
            const textStr = typeof item === "string" ? item : item.text;
            const noteStr =
                typeof item === "object" && item.note
                    ? item.note
                    : index === input.length - 1
                      ? "The End"
                      : `Verse ${num}`;

            return {
                id: `stanza-${num}`,
                stanzaNumber: num,
                text: textStr,
                note: noteStr,
            };
        });
    }

    // Svelte 5 Runes State (Populated directly from poem.json)
    let poemStanzas = $state<PoemStanza[]>(buildStanzasFromJSON(poemData));
    let currentIndex = $state<number>(0);
    let animatingCardIndex = $state<number | null>(null);
    let animationDirection = $state<"left" | "right" | "up" | "down">("left");

    // Celebration & Canvas Fireworks
    let isFinished = $state<boolean>(false);
    let canvasRef: HTMLCanvasElement | null = $state(null);

    // Touch tracking for mobile swipe
    let touchStartX = 0;
    let touchStartY = 0;

    // Derived state
    let totalStanzas = $derived(poemStanzas.length);
    let progressPercentage = $derived(
        totalStanzas > 0
            ? Math.min(
                  100,
                  Math.round(((currentIndex + 1) / totalStanzas) * 100),
              )
            : 0,
    );

    // Trigger Fireworks & Confetti Blast
    function triggerFireworksCelebration() {
        isFinished = true;

        const count = 220;
        const defaults = { origin: { y: 0.7 } };

        function fire(particleRatio: number, opts: confetti.Options) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio),
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
            colors: ["#ffffff", "#aaaaaa", "#666666"],
        });
        fire(0.2, { spread: 60, colors: ["#ffffff", "#888888"] });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
            colors: ["#ffffff", "#ffffff"],
        });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });

        if (canvasRef) {
            launchCustomFireworks(canvasRef);
        }
    }

    function launchCustomFireworks(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        interface FireworkParticle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            alpha: number;
            size: number;
        }

        let particles: FireworkParticle[] = [];

        function createExplosion(x: number, y: number) {
            const particleCount = 50 + Math.floor(Math.random() * 30);
            for (let i = 0; i < particleCount; i++) {
                const angle =
                    (Math.PI * 2 * i) / particleCount +
                    (Math.random() * 0.4 - 0.2);
                const speed = 2 + Math.random() * 6.5;
                particles.push({
                    x,
                    y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    alpha: 1,
                    size: 2 + Math.random() * 3,
                });
            }
        }

        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const x = Math.random() * (canvas.width - 100) + 50;
                const y =
                    Math.random() * (canvas.height * 0.5) +
                    canvas.height * 0.15;
                createExplosion(x, y);
            }, i * 260);
        }

        let frames = 0;
        function render() {
            ctx!.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.05;
                p.alpha -= 0.015;

                if (p.alpha <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx!.save();
                ctx!.globalAlpha = p.alpha;
                ctx!.fillStyle = "#ffffff";
                ctx!.beginPath();
                ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx!.fill();
                ctx!.restore();
            }

            frames++;
            if (particles.length > 0 || frames < 120) {
                requestAnimationFrame(render);
            }
        }

        render();
    }

    // Advance Deck to Next Card
    function nextCard(dir: "left" | "right" | "up" | "down" = "left") {
        if (animatingCardIndex !== null) return;

        if (currentIndex >= totalStanzas - 1) {
            triggerFireworksCelebration();
            return;
        }

        animationDirection = dir;
        animatingCardIndex = currentIndex;

        setTimeout(() => {
            currentIndex++;
            animatingCardIndex = null;

            if (currentIndex === totalStanzas - 1) {
                setTimeout(() => {
                    triggerFireworksCelebration();
                }, 300);
            }
        }, 250);
    }

    // Return to Previous Card
    function prevCard() {
        if (animatingCardIndex !== null || currentIndex <= 0) return;
        currentIndex--;
        isFinished = false;
    }

    // Load custom JSON array dynamically
    export function loadJSONPoem(jsonArray: (RawStanzaInput | string)[]) {
        poemStanzas = buildStanzasFromJSON(jsonArray);
        currentIndex = 0;
        isFinished = false;
    }

    // Touch handlers for mobile swipe in all 4 directions
    function handleTouchStart(e: TouchEvent) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }

    function handleTouchEnd(e: TouchEvent) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        // Horizontal swipe dominates
        if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX < 0) {
                nextCard("left");
            } else {
                nextCard("right");
            }
        }
        // Vertical swipe dominates
        else if (Math.abs(diffY) > 35) {
            if (diffY < 0) {
                nextCard("up");
            } else {
                nextCard("down");
            }
        }
    }

    // Keyboard shortcut handling
    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === " " || e.key === "ArrowRight") {
            e.preventDefault();
            nextCard("right");
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            nextCard("down");
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            nextCard("left");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            nextCard("up");
        }
    }
</script>

<svelte:window onkeydown={handleKeyDown} />

<!-- Fireworks Canvas Overlay -->
<canvas bind:this={canvasRef} class="fixed inset-0 pointer-events-none z-50"
></canvas>

<!-- Strict Fullscreen No-Scroll Mobile Container -->
<div
    class="h-screen h-[100dvh] max-h-[100dvh] w-full bg-black text-white flex flex-col justify-between items-center select-none overflow-hidden font-sans p-3 border-box"
>
    <!-- Stage / Card Stack Container -->
    <main
        class="w-full max-w-[340px] sm:max-w-sm flex-1 flex flex-col justify-center items-center min-h-0 z-10 py-1"
    >
        <!-- Progress Header -->
        <div
            class="w-full mb-1 flex items-center justify-between text-xs font-mono"
        >
            <span class="font-bold tracking-wider text-zinc-400"
                >Cartas pra Lô :)</span
            >
            <span
                class="font-bold tracking-widest bg-zinc-900 px-2.5 py-0.5 rounded-full border border-zinc-800 text-white"
            >
                {String(currentIndex + 1).padStart(2, "0")} / {String(
                    totalStanzas,
                ).padStart(2, "0")}
            </span>
        </div>

        <!-- Progress Bar Line -->
        <div
            class="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden mb-2 border border-zinc-800"
        >
            <div
                class="h-full bg-white transition-all duration-300"
                style="width: {progressPercentage}%;"
            ></div>
        </div>

        <!-- CARD DECK STACK WRAPPER -->
        <div
            class="w-full flex-1 max-h-[400px] min-h-[280px] relative cursor-pointer touch-none"
            onclick={() => nextCard("left")}
            onkeydown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    nextCard("left");
                }
            }}
            ontouchstart={handleTouchStart}
            ontouchend={handleTouchEnd}
            role="button"
            tabindex="0"
            aria-label="Tap or swipe card to advance deck"
        >
            {#each poemStanzas as stanza, idx (stanza.id)}
                {#if idx >= currentIndex && idx <= currentIndex + 2}
                    {@const offset = idx - currentIndex}
                    {@const isTop = offset === 0}
                    {@const isAnimating = animatingCardIndex === idx}

                    <!-- All Cards Have Identical Size (No Size Scaling). Solid White Cards -->
                    <div
                        class="absolute inset-0 w-full h-full rounded-[2.25rem] p-5 sm:p-6 flex flex-col justify-between border-4 border-black bg-white text-black shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] select-text transition-transform duration-250 ease-out"
                        style="
							z-index: {30 - offset * 10};
							transform: {isAnimating
                            ? animationDirection === 'left'
                                ? 'translateX(-140%) rotate(-20deg)'
                                : animationDirection === 'right'
                                  ? 'translateX(140%) rotate(20deg)'
                                  : animationDirection === 'down'
                                    ? 'translateY(140%) rotate(15deg)'
                                    : 'translateY(-140%) rotate(-15deg)'
                            : `translateY(${offset * 12}px) rotate(${offset === 1 ? 1 : offset === 2 ? -1 : 0}deg)`};
						"
                    >
                        <!-- Card Top Header -->
                        <div
                            class="flex items-center justify-between border-b-2 border-black/15 pb-2"
                        >
                            <div class="flex items-center gap-2">
                                <span
                                    class="text-xs font-mono font-black tracking-wider text-black"
                                >
                                    {stanza.note ||
                                        `STANZA #${stanza.stanzaNumber}`}
                                </span>
                            </div>

                            <div
                                class="text-xs font-mono font-black tracking-widest text-black"
                            >
                                #{String(stanza.stanzaNumber).padStart(2, "0")}
                            </div>
                        </div>

                        <!-- Card Body Text (Larger Font, Uniform Size) -->
                        <div
                            class="my-auto py-1 flex flex-col justify-center items-center text-left"
                        >
                            <p
                                class="font-sans font-extrabold tracking-tight text-lg sm:text-xl md:text-2xl leading-relaxed whitespace-pre-line text-black"
                            >
                                {stanza.text}
                            </p>
                        </div>

                        <!-- Card Bottom Footer -->
                        <div
                            class="flex items-center justify-between border-t-2 border-black/15 pt-2 text-xs font-mono font-black text-black"
                        >
                            <span></span>
                            <span>
                                {isTop && idx === totalStanzas - 1
                                    ? ":)"
                                    : "arraste / clique ➔"}
                            </span>
                        </div>
                    </div>
                {/if}
            {/each}
        </div>
    </main>

    <!-- Bottom Control Bar -->
    <footer class="w-full max-w-[340px] sm:max-w-sm pb-1 pt-1 z-20 flex-none">
        <div class="grid grid-cols-5 gap-2">
            <!-- Prev Card -->
            <button
                onclick={prevCard}
                disabled={currentIndex === 0}
                class="col-span-1 py-3 rounded-2xl border-2 border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800 font-mono font-bold text-sm transition-all active:scale-95 flex items-center justify-center disabled:opacity-30 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]"
                aria-label="Previous card in deck"
            >
                ◀
            </button>

            <!-- Primary Next Button -->
            <button
                onclick={() => nextCard("left")}
                class="col-span-3 py-3 rounded-2xl border-3 border-black bg-white text-black font-heading font-black text-xs sm:text-sm uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
            >
                {#if currentIndex < totalStanzas - 1}
                    <span>Próximo</span>
                    <span class="text-xs font-mono">➔</span>
                {:else}
                    <span>🎉</span>
                {/if}
            </button>

            <!-- Next Card -->
            <button
                onclick={() => nextCard("left")}
                class="col-span-1 py-3 rounded-2xl border-2 border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800 font-mono font-bold text-sm transition-all active:scale-95 flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]"
                aria-label="Next card in deck"
            >
                ▶
            </button>
        </div>
    </footer>
</div>
