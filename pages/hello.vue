<template>
    <h1>
        Hello world!
    </h1>
    <ul>
        <li v-for="item in items">
            {{ item }}
        </li>
    </ul>
</template>

<script type="ts" setup>
const items = [
    'hello',
    'yes',
    'whassup'
]
</script>

<style>
h1 {
    color: red;
}
</style>