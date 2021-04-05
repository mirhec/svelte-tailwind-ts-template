<script lang="ts">
    import { getTranslations, getOriginTranslations } from '../api/bible';
    import { translation, chapter, book, originTranslation } from '../stores';
    import Chapter from './Chapter.svelte';
    import TranslationChooser from './TranslationChooser.svelte';
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