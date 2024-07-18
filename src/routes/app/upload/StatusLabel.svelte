

<script lang="ts">
	import { PredictionStatus } from "$lib/enums";
    export let predictionStatus: PredictionStatus
</script>


<span>
    {#if predictionStatus === PredictionStatus.IN_PROGRESS}
        <span class="text-yellow-500 animate-pulse">Pending</span>
    {:else if predictionStatus === PredictionStatus.COMPLETED}
        <span class="text-green-300">Completed</span>
    {:else if predictionStatus === PredictionStatus.FAILED}
        <span class="text-red-400">Failed</span>
    {/if}
</span>