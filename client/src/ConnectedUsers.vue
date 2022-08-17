<template>
	<div>
        <div class="username">
            <h1>Connected Users</h1>

            <ul>
                <li v-for="user in connectedUsers" :key="user.id">
                    {{ user.username }}
                </li>
            </ul>

        </div>
    </div>
</template>

<script></script>

<style scoped></style>
