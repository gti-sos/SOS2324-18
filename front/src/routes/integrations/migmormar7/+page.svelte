<script>
    let buttons = [
        { text: "Uso de BaseballAPI", href: "./migmormar7/BaseballAPI", color: "purple" },
        { text: "Uso de Top100MoviesAPI", href: "./migmormar7/Top100MoviesAPI", color: "blue" },
        { text: "Uso de ExerciseDBAPI", href: "./migmormar7/ExerciseDBAPI", color: "green" },
        { text: "Uso de ChineseFoodDBAPI", href: "./migmormar7/ChineseFoodDBAPI", color: "orange" }
    ];
</script>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        margin: 10px;
        color: white;
        text-decoration: none;
        display: inline-block;
    }

    .purple {
        background-color: purple;
    }

    .blue {
        background-color: blue;
    }

    .green {
        background-color: green;
    }

    .orange {
        background-color: orange;
    }
</style>

<div class="container">
    {#each buttons as button}
        <a href={button.href} class="button {button.color}">
            {button.text}
        </a>
    {/each}
</div>
