<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { navigate } from "svelte-navigator";
    import { getStrongDetails, getVerse } from "../api/bible";
    import { book, chapter, originTranslation, translation1, detailStrong } from "../stores";

    const dispatch = createEventDispatcher();

    let response: Promise<Object>;
    let wordGrammar: string;
    let wordGrammarUnsure = false;

    $: if ($detailStrong.strongNr > 0) {
        response = getStrongDetails(
            $translation1,
            $book < 39 ? "hebrew" : "greek",
            $detailStrong.strongNr
        );
        getVerse($originTranslation, $book, $chapter, $detailStrong.verseNr).then(verse => {
            verse['chunks'].forEach(chunk => {
                if (chunk['strong'] && chunk['strong']['number'] === $detailStrong.strongNr) {
                    let grammar = chunk['strong']['grammar'];
                    if (wordGrammar && grammar !== wordGrammar) {
                        wordGrammarUnsure = true;
                    }
                    if (!wordGrammar) wordGrammar = grammar;
                }
            });
        });
    }

    const getVariants = (variants: Array<Object>) => {
        return variants.sort((o1, o2) => o2["count"] - o1["count"]);
    }

    const closeButtonClicked = () => {
        dispatch("close", {});
    }
    const showAllOccurences = () => {
        if ($book < 39) {
            navigate(`/strongs/hebrew/${$detailStrong.strongNr}`);
        } else {
            navigate(`/strongs/greek/${$detailStrong.strongNr}`);
        }
        $detailStrong.strongNr = -1;
    }
    const getGrammarDescDe = (grammar: string): string => {
        if (grammar.startsWith("n-")) return "Substantiv";
        else if (grammar.startsWith("a-")) return "Adjektiv";
        else if (grammar.startsWith("t-")) return "Artikel";
        else if (grammar.startsWith("v-")) return getVerbDescDe(grammar);
        return "---";
    }
    const verbMap = {
        'v-p': 'Präsens',
        'v-i': 'Imperfekt',
        'v-f': 'Futur 1',
        'v-a': 'Aorist',
        'v-r': 'Perfekt',
        'v-l': 'Plusquamperfekt',
        'v-x': '',
        'v-2f': 'Futur 2',
        'v-2a': 'Aorist 2',
        'v-2r': 'Perfekt 2',
        'v-2l': 'Plusquamperfekt 2',
    };
    const voiceMap = {
        'a': 'Aktiv',
        'm': 'Medium',
        'p': 'Passiv',
        'e': 'Medium oder Passiv',
        'd': 'Deponens Medium',
        'o': 'Deponens Passiv',
        'n': 'Deponens Medium oder Passiv',
        'q': 'Unpersönliches Aktiv',
        'x': ''
    };
    const modeMap = {
        'i': 'Indikativ',
        's': 'Sub-/Konjunktiv',
        'o': 'Optativ',
        'm': 'Imperativ',
        'n': 'Infinitiv',
        'p': 'Partizip',
        'r': 'Imperativer Partizip'
    };
    const getOr = (obj: object, keys: string[], defaultVal: string = "---"): string => {
        for (var key in keys) {
            if (keys[key] in obj) return obj[keys[key]];
        }
        return defaultVal;
    }
    const getVerbDescDe = (grammar: string): string => {
        let first3 = grammar.substring(0, 3);
        let first4 = grammar.substring(0, 4);
        let idx = grammar.startsWith("v-2") ? 4 : 3;
        return `Verb, ${getOr(verbMap, [first3, first4])}, ${getOr(voiceMap, [grammar[idx]])}, ${getOr(modeMap, [grammar[idx+1]])}`;
    }
</script>

<div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Details for {$book <= 39 ? "hebrew" : "greek"} strong #{$detailStrong.strongNr}
          </p>
          <button class="delete" aria-label="close" on:click={closeButtonClicked}></button>
        </header>
        <section class="modal-card-body">
            {#await response then details}
                {#if wordGrammar && wordGrammarUnsure}
                    <h4 class="title is-4">Grammar: {wordGrammar} (unsure)</h4>
                {:else if wordGrammar}
                    <h4 class="title is-4">Grammar: {wordGrammar}</h4>
                {/if}
                <p class="mb-4">{getGrammarDescDe(wordGrammar)}</p>

                <h4 class="title is-4">Translation variants:</h4>
                <div class="ml-2">
                    <ul>
                        {#each getVariants(details["variants"]) as variant}
                            <li>{variant["variant"]}: {variant["count"]}</li>
                        {/each}
                    </ul>
                </div>
            {/await}
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" on:click={showAllOccurences}>Show all occurences</button>
          <button class="button" on:click={closeButtonClicked}>Close</button>
        </footer>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
</div>