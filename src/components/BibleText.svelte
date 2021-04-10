<script lang="ts">
    import { getTranslations, getOriginTranslations } from '../api/bible';
    import { translation, book, chapter, originTranslation } from '../stores';
    import { useParams } from "svelte-navigator";

    import Chapter from './Chapter.svelte';
    import TranslationChooser from './TranslationChooser.svelte';
    import { to_number } from 'svelte/internal';

    const params = useParams();

    $: if ('book' in $params && 'chapter' in $params) {
        $book = to_number($params['book']);
        $chapter = to_number($params['chapter']);
    }
</script>

<div class="grid grid-cols-8 gap-10 mt-10">
    <div/>
    <div class="max-w-prose col-span-6 md:col-span-3 break-words">
        <TranslationChooser class="mb-5" translations={getTranslations()} bind:selected={$translation} />
        <Chapter translation={$translation} book={$book} chapter={$chapter} />
    </div>
    <div class="max-w-prose hidden md:block md:col-span-3">
        <TranslationChooser class="mb-5" translations={getOriginTranslations()}/>
        <Chapter translation={$originTranslation} book={$book} chapter={$chapter} />
    </div>
    <div/>
</div>